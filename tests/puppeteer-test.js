const puppeteer = require('puppeteer');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 30000;

// Console colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Test results
let passedTests = 0;
let failedTests = 0;
const testResults = [];

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function runTest(testName, testFn) {
  log(`\nRunning: ${testName}`, colors.blue);
  const startTime = Date.now();
  
  try {
    await testFn();
    const duration = Date.now() - startTime;
    log(`✓ PASSED (${duration}ms)`, colors.green);
    passedTests++;
    testResults.push({ name: testName, status: 'passed', duration });
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`✗ FAILED (${duration}ms)`, colors.red);
    log(`  Error: ${error.message}`, colors.red);
    failedTests++;
    testResults.push({ 
      name: testName, 
      status: 'failed', 
      duration, 
      error: error.message 
    });
  }
}

// Main test function
async function runTests() {
  log('\n🚀 Starting Todo Manager Browser Tests\n', colors.yellow);
  
  let browser;
  let page;
  let consoleErrors = [];
  
  try {
    // Launch browser with specific args for WSL
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });
    
    page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });
    
    // Test 1: Page loads without errors
    await runTest('Should load the page without errors', async () => {
      consoleErrors = [];
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
      
      // Check main heading
      const heading = await page.$eval('h1', el => el.textContent);
      if (heading !== 'Todo Manager') {
        throw new Error(`Expected heading "Todo Manager", got "${heading}"`);
      }
      
      // Check subtitle
      const subtitle = await page.$eval('p', el => el.textContent);
      if (!subtitle.includes('효율적인 할 일 관리')) {
        throw new Error('Subtitle not found');
      }
      
      // Check form elements
      const inputExists = await page.$('input[placeholder="할 일을 입력하세요..."]');
      if (!inputExists) {
        throw new Error('Todo input field not found');
      }
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
      }
    });
    
    // Test 2: Add a new todo
    await runTest('Should add a new todo', async () => {
      consoleErrors = [];
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
      
      const todoTitle = 'Test Todo Item';
      const todoDescription = 'This is a test description';
      
      // Fill in the form
      await page.type('input[placeholder="할 일을 입력하세요..."]', todoTitle);
      await page.type('textarea[placeholder="설명 (선택사항)"]', todoDescription);
      
      // Click the submit button
      await page.click('button[type="submit"]');
      
      // Wait for the todo to appear
      await page.waitForFunction(
        text => document.body.textContent.includes(text),
        { timeout: 5000 },
        todoTitle
      );
      
      // Verify the todo appears
      const todoExists = await page.evaluate((title) => {
        return document.body.textContent.includes(title);
      }, todoTitle);
      
      if (!todoExists) {
        throw new Error('Todo was not added');
      }
      
      // Verify form is cleared
      const inputValue = await page.$eval('input[placeholder="할 일을 입력하세요..."]', el => el.value);
      if (inputValue !== '') {
        throw new Error('Input field was not cleared');
      }
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
      }
    });
    
    // Test 3: Toggle a todo
    await runTest('Should toggle a todo', async () => {
      consoleErrors = [];
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
      
      const todoTitle = 'Todo to Toggle';
      
      // Add a todo first
      await page.type('input[placeholder="할 일을 입력하세요..."]', todoTitle);
      await page.click('button[type="submit"]');
      
      // Wait for todo to appear
      await page.waitForFunction(
        text => document.body.textContent.includes(text),
        { timeout: 5000 },
        todoTitle
      );
      
      // Find and click the checkbox
      const checkbox = await page.$('input[type="checkbox"]');
      if (!checkbox) {
        throw new Error('Checkbox not found');
      }
      
      // Check initial state
      const initialChecked = await page.$eval('input[type="checkbox"]', el => el.checked);
      if (initialChecked) {
        throw new Error('Checkbox should not be checked initially');
      }
      
      // Toggle the checkbox
      await checkbox.click();
      await page.waitForTimeout(100); // Small delay for state update
      
      // Verify it's checked
      const isChecked = await page.$eval('input[type="checkbox"]', el => el.checked);
      if (!isChecked) {
        throw new Error('Checkbox should be checked after clicking');
      }
      
      // Verify line-through style
      const hasLineThrough = await page.evaluate(() => {
        const h3 = document.querySelector('h3');
        return h3 && h3.classList.toString().includes('line-through');
      });
      
      if (!hasLineThrough) {
        throw new Error('Todo title should have line-through style when completed');
      }
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
      }
    });
    
    // Test 4: Delete a todo
    await runTest('Should delete a todo', async () => {
      consoleErrors = [];
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
      
      const todoTitle = 'Todo to Delete';
      
      // Add a todo first
      await page.type('input[placeholder="할 일을 입력하세요..."]', todoTitle);
      await page.click('button[type="submit"]');
      
      // Wait for todo to appear
      await page.waitForFunction(
        text => document.body.textContent.includes(text),
        { timeout: 5000 },
        todoTitle
      );
      
      // Find the delete button (button with SVG)
      const deleteButton = await page.$('button:has(svg)');
      if (!deleteButton) {
        throw new Error('Delete button not found');
      }
      
      // Click delete button
      await deleteButton.click();
      await page.waitForTimeout(100); // Small delay for state update
      
      // Verify todo is removed
      const todoStillExists = await page.evaluate((title) => {
        return document.body.textContent.includes(title);
      }, todoTitle);
      
      if (todoStillExists) {
        throw new Error('Todo was not deleted');
      }
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
      }
    });
    
    // Test 5: Handle empty todo submission
    await runTest('Should not add empty todos', async () => {
      consoleErrors = [];
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
      
      // Try to submit empty form
      const submitButton = await page.$('button[type="submit"]');
      await submitButton.click();
      
      // Check that no todo was added (check if there are any checkboxes)
      const checkboxes = await page.$$('input[type="checkbox"]');
      if (checkboxes.length > 0) {
        throw new Error('Empty todo should not be added');
      }
      
      // Try with spaces only
      await page.type('input[placeholder="할 일을 입력하세요..."]', '   ');
      await submitButton.click();
      await page.waitForTimeout(100);
      
      // Check again
      const checkboxesAfterSpaces = await page.$$('input[type="checkbox"]');
      if (checkboxesAfterSpaces.length > 0) {
        throw new Error('Todo with only spaces should not be added');
      }
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
      }
    });
    
  } catch (error) {
    log(`\n❌ Test suite error: ${error.message}`, colors.red);
    failedTests++;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Print summary
  log('\n' + '='.repeat(50), colors.yellow);
  log('TEST SUMMARY', colors.yellow);
  log('='.repeat(50), colors.yellow);
  log(`Total tests: ${passedTests + failedTests}`);
  log(`Passed: ${passedTests}`, colors.green);
  log(`Failed: ${failedTests}`, colors.red);
  
  // Print detailed results
  if (testResults.length > 0) {
    log('\nDetailed Results:', colors.blue);
    testResults.forEach(result => {
      const statusColor = result.status === 'passed' ? colors.green : colors.red;
      const statusIcon = result.status === 'passed' ? '✓' : '✗';
      log(`  ${statusIcon} ${result.name} (${result.duration}ms)`, statusColor);
      if (result.error) {
        log(`    Error: ${result.error}`, colors.red);
      }
    });
  }
  
  // Exit with appropriate code
  process.exit(failedTests > 0 ? 1 : 0);
}

// Check if dev server is running
async function checkDevServer() {
  const http = require('http');
  
  return new Promise((resolve) => {
    http.get(BASE_URL, (res) => {
      resolve(true);
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Main execution
(async () => {
  const isDevServerRunning = await checkDevServer();
  
  if (!isDevServerRunning) {
    log('⚠️  Dev server is not running!', colors.yellow);
    log('Please start the dev server with: npm run dev', colors.yellow);
    log('Then run the tests again.', colors.yellow);
    process.exit(1);
  }
  
  await runTests();
})();
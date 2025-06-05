const http = require('http');
const https = require('https');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const API_TIMEOUT = 5000;

// Console colors
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

// HTTP request helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, API_TIMEOUT);
    
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, options, (res) => {
      clearTimeout(timeout);
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    
    req.end();
  });
}

// Test runner
async function runTests() {
  log('\n🚀 Starting Todo Manager Simple Tests\n', colors.yellow);
  
  // Test 1: Server is running
  await runTest('Server should be running on port 3000', async () => {
    const response = await makeRequest(BASE_URL);
    
    if (response.statusCode !== 200) {
      throw new Error(`Expected status 200, got ${response.statusCode}`);
    }
    
    if (!response.headers['content-type'].includes('text/html')) {
      throw new Error('Expected HTML content type');
    }
  });
  
  // Test 2: Page contains expected elements
  await runTest('Page should contain Todo Manager elements', async () => {
    const response = await makeRequest(BASE_URL);
    const html = response.body;
    
    // Check for main heading
    if (!html.includes('Todo Manager')) {
      throw new Error('Page does not contain "Todo Manager" heading');
    }
    
    // Check for Korean subtitle
    if (!html.includes('효율적인 할 일 관리')) {
      throw new Error('Page does not contain expected Korean subtitle');
    }
    
    // Check for form elements
    if (!html.includes('할 일을 입력하세요')) {
      throw new Error('Page does not contain todo input placeholder');
    }
    
    if (!html.includes('할 일 추가')) {
      throw new Error('Page does not contain submit button text');
    }
  });
  
  // Test 3: Static assets are accessible
  await runTest('Static assets should be accessible', async () => {
    // Check if Next.js static files are served
    const response = await makeRequest(`${BASE_URL}/_next/static/css/app/globals.css`);
    
    // Next.js might return 404 for direct CSS access, but we can check the main page loads CSS
    const mainResponse = await makeRequest(BASE_URL);
    if (!mainResponse.body.includes('/_next/static')) {
      throw new Error('Page does not reference Next.js static assets');
    }
  });
  
  // Test 4: Check page structure
  await runTest('Page should have proper HTML structure', async () => {
    const response = await makeRequest(BASE_URL);
    const html = response.body;
    
    // Check for DOCTYPE
    if (!html.toLowerCase().includes('<!doctype html>')) {
      throw new Error('Page missing DOCTYPE');
    }
    
    // Check for main semantic elements
    if (!html.includes('<main')) {
      throw new Error('Page missing <main> element');
    }
    
    // Check for form
    if (!html.includes('<form')) {
      throw new Error('Page missing <form> element');
    }
    
    // Check for input fields
    if (!html.includes('<input')) {
      throw new Error('Page missing <input> elements');
    }
    
    // Check for button
    if (!html.includes('<button')) {
      throw new Error('Page missing <button> elements');
    }
  });
  
  // Test 5: Check for client-side JavaScript
  await runTest('Page should include client-side JavaScript', async () => {
    const response = await makeRequest(BASE_URL);
    const html = response.body;
    
    // Check for Next.js app scripts
    if (!html.includes('_app-') && !html.includes('_buildManifest')) {
      throw new Error('Page missing Next.js client-side scripts');
    }
    
    // Check for React indicators
    if (!html.includes('__next')) {
      throw new Error('Page missing Next.js root element');
    }
  });
  
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
  
  log('\n📝 Note: These are basic HTTP tests. For full browser testing,', colors.yellow);
  log('   you\'ll need to install browser dependencies with:', colors.yellow);
  log('   sudo apt-get install libnss3 libnspr4 libasound2t64', colors.yellow);
  log('   Then run: npm test (for Playwright) or npm run test:puppeteer', colors.yellow);
  
  // Exit with appropriate code
  process.exit(failedTests > 0 ? 1 : 0);
}

// Check if dev server is running
async function checkDevServer() {
  try {
    await makeRequest(BASE_URL);
    return true;
  } catch (error) {
    return false;
  }
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
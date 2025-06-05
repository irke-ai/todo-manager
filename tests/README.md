# Todo Manager Browser Testing

This project includes multiple browser testing solutions to accommodate different environments and requirements.

## Testing Solutions

### 1. Playwright Tests (Recommended for full environments)
- **File**: `tests/todo-manager.spec.ts`
- **Config**: `playwright.config.ts` and `playwright.config.headless.ts`
- **Run**: `npm test` or `npm run test:headless`
- **Features**: 
  - Full browser automation
  - Visual regression testing
  - Multiple browser support
  - Video and screenshot capture on failure
  - Detailed test reports

### 2. Puppeteer Tests (Alternative browser testing)
- **File**: `tests/puppeteer-test.js`
- **Run**: `npm run test:puppeteer`
- **Features**:
  - Lightweight browser automation
  - Console error capture
  - Chromium-only testing
  - Good for CI/CD environments

### 3. Simple HTTP Tests (WSL-friendly)
- **File**: `tests/simple-test.js`
- **Run**: `npm run test:simple`
- **Features**:
  - No browser dependencies required
  - Basic HTTP request testing
  - Verifies server is running
  - Checks HTML structure
  - Works in any environment

## Setup Instructions

### For WSL Users

1. **Option 1: Use Simple Tests (No dependencies)**
   ```bash
   npm run dev  # Start the dev server
   npm run test:simple  # Run simple HTTP tests
   ```

2. **Option 2: Install Browser Dependencies**
   ```bash
   # Install required libraries for browser testing
   sudo apt-get update
   sudo apt-get install -y \
     libnss3 \
     libnspr4 \
     libatk1.0-0 \
     libatk-bridge2.0-0 \
     libcups2 \
     libdrm2 \
     libxkbcommon0 \
     libatspi2.0-0 \
     libxcomposite1 \
     libxdamage1 \
     libxfixes3 \
     libxrandr2 \
     libgbm1 \
     libxss1 \
     libasound2t64
   
   # Then run Playwright or Puppeteer tests
   npm test  # or npm run test:puppeteer
   ```

### For Regular Environments

```bash
# Install Playwright browsers
npx playwright install

# Run tests
npm test
```

## Test Coverage

The test suite covers:

1. **Page Loading**
   - Verifies the page loads without errors
   - Checks for console errors
   - Validates main UI elements are present

2. **Adding Todos**
   - Tests todo creation with title and description
   - Verifies form clearing after submission
   - Validates todo appears in the list

3. **Toggling Todos**
   - Tests checkbox functionality
   - Verifies visual feedback (line-through style)
   - Checks state persistence

4. **Deleting Todos**
   - Tests delete button functionality
   - Verifies todo removal from list

5. **Edge Cases**
   - Empty todo submission
   - Multiple todo management
   - Form validation

## Running Tests in Different Modes

```bash
# Run all Playwright tests
npm test

# Run Playwright tests in headed mode (see browser)
npm run test:headed

# Run Playwright tests with UI mode (interactive)
npm run test:ui

# Run Playwright tests in headless mode (WSL-optimized)
npm run test:headless

# Run Puppeteer tests
npm run test:puppeteer

# Run simple HTTP tests (no browser needed)
npm run test:simple

# View Playwright test report
npm run test:report
```

## Continuous Integration

For CI/CD pipelines, use:

```yaml
# GitHub Actions example
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npm test
```

## Troubleshooting

### WSL Issues
- If browser tests fail in WSL, use `npm run test:simple` for basic testing
- Install missing dependencies with the apt-get command above
- Consider using headless mode: `npm run test:headless`

### Port Conflicts
- Ensure port 3000 is available
- The dev server must be running: `npm run dev`

### Console Errors
- Tests capture and report console errors
- Check browser console for debugging information
- Review test artifacts in `test-results/` directory
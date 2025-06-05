import { test, expect, Page } from '@playwright/test';

// Helper function to capture console errors
async function setupConsoleErrorCapture(page: Page) {
  const consoleErrors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });
  
  return consoleErrors;
}

test.describe('Todo Manager Application', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('should load the page without errors', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: 'Todo Manager' })).toBeVisible();
    
    // Check if the subtitle is visible
    await expect(page.getByText('효율적인 할 일 관리를 시작하세요')).toBeVisible();
    
    // Check if the form is visible
    await expect(page.getByRole('textbox', { name: /할 일을 입력하세요/ })).toBeVisible();
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should add a new todo', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    const todoTitle = 'Test Todo Item';
    const todoDescription = 'This is a test description';
    
    // Fill in the todo form
    await page.getByPlaceholder('할 일을 입력하세요...').fill(todoTitle);
    await page.getByPlaceholder('설명 (선택사항)').fill(todoDescription);
    
    // Submit the form
    await page.getByRole('button', { name: '할 일 추가' }).click();
    
    // Wait for the todo to appear
    await expect(page.getByText(todoTitle)).toBeVisible();
    await expect(page.getByText(todoDescription)).toBeVisible();
    
    // Verify the form is cleared
    await expect(page.getByPlaceholder('할 일을 입력하세요...')).toHaveValue('');
    await expect(page.getByPlaceholder('설명 (선택사항)')).toHaveValue('');
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should toggle a todo', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    const todoTitle = 'Todo to Toggle';
    
    // Add a todo first
    await page.getByPlaceholder('할 일을 입력하세요...').fill(todoTitle);
    await page.getByRole('button', { name: '할 일 추가' }).click();
    
    // Wait for the todo to appear
    await expect(page.getByText(todoTitle)).toBeVisible();
    
    // Find the checkbox for this todo
    const todoItem = page.locator('div').filter({ hasText: todoTitle }).first();
    const checkbox = todoItem.getByRole('checkbox');
    
    // Verify the checkbox is not checked initially
    await expect(checkbox).not.toBeChecked();
    
    // Toggle the todo
    await checkbox.click();
    
    // Verify the checkbox is now checked
    await expect(checkbox).toBeChecked();
    
    // Verify the title has line-through style (completed state)
    const titleElement = todoItem.getByRole('heading', { level: 3 });
    await expect(titleElement).toHaveClass(/line-through/);
    
    // Toggle back
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await expect(titleElement).not.toHaveClass(/line-through/);
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should delete a todo', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    const todoTitle = 'Todo to Delete';
    
    // Add a todo first
    await page.getByPlaceholder('할 일을 입력하세요...').fill(todoTitle);
    await page.getByRole('button', { name: '할 일 추가' }).click();
    
    // Wait for the todo to appear
    await expect(page.getByText(todoTitle)).toBeVisible();
    
    // Find the delete button (X button) for this todo
    const todoItem = page.locator('div').filter({ hasText: todoTitle }).first();
    const deleteButton = todoItem.locator('button').filter({ has: page.locator('svg') });
    
    // Click the delete button
    await deleteButton.click();
    
    // Verify the todo is removed
    await expect(page.getByText(todoTitle)).not.toBeVisible();
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should handle multiple todos', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    const todos = [
      { title: 'First Todo', description: 'First description' },
      { title: 'Second Todo', description: 'Second description' },
      { title: 'Third Todo', description: 'Third description' }
    ];
    
    // Add multiple todos
    for (const todo of todos) {
      await page.getByPlaceholder('할 일을 입력하세요...').fill(todo.title);
      await page.getByPlaceholder('설명 (선택사항)').fill(todo.description);
      await page.getByRole('button', { name: '할 일 추가' }).click();
      
      // Wait for each todo to appear
      await expect(page.getByText(todo.title)).toBeVisible();
    }
    
    // Verify all todos are present
    for (const todo of todos) {
      await expect(page.getByText(todo.title)).toBeVisible();
      await expect(page.getByText(todo.description)).toBeVisible();
    }
    
    // Toggle the second todo
    const secondTodoItem = page.locator('div').filter({ hasText: 'Second Todo' }).first();
    await secondTodoItem.getByRole('checkbox').click();
    
    // Verify only the second todo is checked
    await expect(secondTodoItem.getByRole('checkbox')).toBeChecked();
    await expect(page.locator('div').filter({ hasText: 'First Todo' }).first().getByRole('checkbox')).not.toBeChecked();
    await expect(page.locator('div').filter({ hasText: 'Third Todo' }).first().getByRole('checkbox')).not.toBeChecked();
    
    // Delete the first todo
    const firstTodoItem = page.locator('div').filter({ hasText: 'First Todo' }).first();
    await firstTodoItem.locator('button').filter({ has: page.locator('svg') }).click();
    
    // Verify the first todo is gone but others remain
    await expect(page.getByText('First Todo')).not.toBeVisible();
    await expect(page.getByText('Second Todo')).toBeVisible();
    await expect(page.getByText('Third Todo')).toBeVisible();
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('should not add empty todos', async ({ page }) => {
    const consoleErrors = await setupConsoleErrorCapture(page);
    
    // Try to submit an empty form
    await page.getByRole('button', { name: '할 일 추가' }).click();
    
    // Check that no todo was added (the form should have HTML5 validation)
    // The input field should show validation message
    const inputField = page.getByPlaceholder('할 일을 입력하세요...');
    
    // Check if the input is still empty and focused (indicating validation failed)
    await expect(inputField).toHaveValue('');
    
    // Try with only spaces
    await inputField.fill('   ');
    await page.getByRole('button', { name: '할 일 추가' }).click();
    
    // The form should clear but no todo should be added
    await expect(inputField).toHaveValue('');
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });
});
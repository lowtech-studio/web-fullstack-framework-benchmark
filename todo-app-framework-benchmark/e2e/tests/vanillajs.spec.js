// @ts-check
import { test, expect } from '@playwright/test';

test('list todos', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ToDo App/);
});

test('create and delete todo', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // create todo
  await page.locator('#create-todo-field').fill('test');
  await page.locator('#create-todo-button').click();

  // expect test todo to be visible
  await expect(page.locator('#delete-todo-link-test')).toBeVisible();

  // delete todo
  await page.locator('#delete-todo-link-test').click();
});
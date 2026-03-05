const scenario = async (page) => {
    await page.goto('http://localhost:3000/');
    await page.locator('#create-todo-field').fill('test');
    await page.locator('#create-todo-button').click();
    await page.scrollToElement('#delete-todo-link-test');
    await page.locator('#delete-todo-link-test').click();
};

module.exports = scenario;
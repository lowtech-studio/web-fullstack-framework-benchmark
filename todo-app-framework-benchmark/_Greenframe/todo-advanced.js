const scenario = async (page) => {
    await page.goto('http://localhost:3000', { timeout: 300000 });

    for (let i = 1; i <= 10; i++) {
        await page.locator('#create-todo-field').fill(`test${i}`);
        await page.locator('#create-todo-button').click();
        await page.waitForSelector(`#delete-todo-link-test${i}`, { timeout: 300000 });
        await page.locator(`#delete-todo-link-test${i}`).click();

    }
};

module.exports = scenario;

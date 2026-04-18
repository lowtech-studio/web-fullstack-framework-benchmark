const scenario = async (page) => {
    await page.goto('http://localhost:3000/');

    for (let i = 1; i <= 100; i++) {
        await page.locator('#create-todo-field').fill(`test${i}`);
        await page.locator('#create-todo-button').click();
    }

    for (let i = 1; i <= 100; i++) {
        await page.waitForSelector(`#delete-todo-link-test${i}`);
        await page.locator(`#delete-todo-link-test${i}`).click();
    }
};

module.exports = scenario;
const { test:test1 } = require('../utils/fixtures.js');
const qaTestData = JSON.parse(JSON.stringify(require('../test-data/qa/testData.json')));
const regTestData = JSON.parse(JSON.stringify(require('../test-data/reg/testData.json')));


test1.describe('E2E Test Suite', () => {
    let testData = qaTestData;
    if (process.env.ENV == 'reg') {
        testData = regTestData;
    }
    test1.describe.configure({mode:'serial'});
    test1('test',async ({ loginPage }) => {
        await loginPage.GotoLoginPage(process.env.WEB_URL);
        await loginPage.Login(process.env.USERNAME, process.env.PASSWORD);
    });

    test1('Validate Total Balance', async ({ dashboardPage }) => {
        await dashboardPage.AssertTotalBalance(testData.financialDetails.totalBalance);
    });

    test1('Validate Credit Available', async ({ dashboardPage }) => {
        await dashboardPage.AssertCreditAvailable(testData.financialDetails.creditAvailable);
    });

    test1('Validate Due Today', async ({ dashboardPage }) => {
        await dashboardPage.AssertDueToday(testData.financialDetails.dueToday);
    });

    test1('after',async ({ page }) => {
        await page.close();
    });
    
});
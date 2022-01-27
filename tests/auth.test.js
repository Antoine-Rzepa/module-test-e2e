const timeout = 15000;
const util = require('util')

// Test des fonctionnalités d'authentification
describe("Auth features", () => {

    let page;

    test('login and logout', async () => {

        console.log(util.inspect(process.env.TESTED_WEBSITE))
        console.log(util.inspect(process.env.TEST_PASSWORD))
        console.log(util.inspect(process.env.TESTED_WEBSITE))
        await page.waitForSelector('#login_button_container');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);

        await Promise.all([
            page.waitForNavigation(),
            page.click('[name="login-button"]'),
        ]);

        //await page.click('[name="login-button"]')
        //await page.waitForSelector('div.app_logo');
        await page.screenshot({path: './tests/img/when_logged.png'});

        const html_login = await page.$eval('body', e => e.innerHTML);
        expect(html_login).toContain("<a class=\"shopping_cart_link\"></a>");

        await page.click('div.bm-burger-button'),
        await page.waitForSelector('div.bm-menu-wrap'),
        await page.waitFor(1000);
        
        await Promise.all([
            page.waitForNavigation(),
            page.click('#logout_sidebar_link'), 
        ]);
      
        expect(page.url()).toEqual(process.env.TESTED_WEBSITE)

    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {

        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()

    }, timeout)

});

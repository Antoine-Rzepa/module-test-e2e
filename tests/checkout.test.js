const timeout = 15000;

// Test des fonctionnalités de prise de commande
describe("Checkout process", () => {

    let page;

    test('checkout button', async () => {

        await Promise.all([
            page.waitForNavigation(),
            await page.click('#checkout'),
        ]);
        
        expect(page.url()).toEqual("https://www.saucedemo.com/checkout-step-one.html")
        

    }, timeout);

    test('Infos perso + continue button', async () => {

        await page.waitForSelector('div.checkout_info');
        await page.type('#first-name', "Bob");
        await page.type('#last-name', "Lebricoleur");
        await page.type('#postal-code', "74000");
        
        await Promise.all([
            page.waitForNavigation(),
            page.click('#continue'),
        ]);

        expect(page.url()).toEqual("https://www.saucedemo.com/checkout-step-two.html")

    }, timeout);

    test('verifie product and finish button', async () => {

        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("<div class=\"inventory_item_name\">Sauce Labs Bike Light</div>");
        
        await Promise.all([
            page.waitForNavigation(),
            page.click('#finish'),
        ]);

        expect(page.url()).toEqual("https://www.saucedemo.com/checkout-complete.html")

    }, timeout);

    test('button back home', async () => {

        
        await Promise.all([
            page.waitForNavigation(),
            page.click('#back-to-products'),
        ]);

        expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html")

    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage();
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#login_button_container');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);

        await Promise.all([
            page.waitForNavigation(),
            page.click('[name="login-button"]'),
        ]);

        await page.click('#add-to-cart-sauce-labs-bike-light');

        await Promise.all([
            page.waitForNavigation(),
            page.click('a.shopping_cart_link'),
        ]);
        
    }, timeout)

});

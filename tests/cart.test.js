const timeout = 15000;

// Test des fonctionnalités de gestion du panier
describe("Cart features", () => {
    
    let page;

    test('add to cart', async () => {
        
        await page.click('#add-to-cart-sauce-labs-bike-light');
        
        await page.waitFor(1000);

        const html_add = await page.$eval('body', e => e.innerHTML);
        expect(html_add).toContain("<span class=\"shopping_cart_badge\">1</span>");

    }, timeout);

    test('remove item from product page', async () =>{

        await page.click('#remove-sauce-labs-bike-light');
        
        await page.waitFor(1000);
        
        const html_remove = await page.$eval('body', e => e.innerHTML);
        expect(html_remove).toContain("<a class=\"shopping_cart_link\"></a>");

    })

    test('Navigate cart', async () =>{

        //this is for the next test (remove item from cart page)
        await page.click('#add-to-cart-sauce-labs-bike-light');

        await Promise.all([
            page.waitForNavigation(),
            page.click('a.shopping_cart_link'),
        ]);
        
        expect(page.url()).toEqual("https://www.saucedemo.com/cart.html")
        
    })

    test('remove item from cart page', async () =>{

        const html_before = await page.$eval('body', e => e.innerHTML);
        expect(html_before).toContain("<div class=\"inventory_item_price\">$9.99</div>");

        await page.click('#remove-sauce-labs-bike-light');

        const html_after = await page.$eval('body', e => e.innerHTML);
        expect(html_after).toContain("<div class=\"removed_cart_item\"></div>");
        
    })

    test('back to product page from cart', async () =>{

        await Promise.all([
            page.waitForNavigation(),
            page.click('#continue-shopping'),
        ]);
        
        expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html")
        
    })

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

    }, timeout)

});

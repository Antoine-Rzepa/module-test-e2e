const timeout = 15000;

// Test d'accès au site
describe("Tests basiques", () => {

    let page;

    // vérification du chargement de la page de connexion
    test('login screen access', async () => {

        // charger la page de connexion
        await page.goto(process.env.TESTED_WEBSITE);

        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');

        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        await page.screenshot({path: './tests/img/login_screen.png'});
        expect(html).toContain("<input type=\"submit\" class=\"submit-button btn_action\" data-test=\"login-button\" id=\"login-button\" name=\"login-button\" value=\"Login\">")

    }, timeout);

    // cette fonction est lancée avant chaque test de cette série de tests
    beforeAll(async () => {

        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
        
    }, timeout)

});

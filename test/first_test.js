/*
    Name - Prakhar Gahlot
    Assignment for LambdaTest
    Execute NodeJS Automation Tests on LambdaTest Distributed Selenium Grid 
*/

const { By,Key, Util } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
require('dotenv').config();
describe('first test, chrome',async function(){

    it('chrome test', async function(){

        
// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY = process.env.LT_ACCESS_KEY
// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';


    // Setup Input capabilities

    const capability = {
        "browserName": "Chrome",
        "browserVersion": "114.0",
        "LT:Options": {
            
            "geoLocation": "IN",
            "video": true,
            "platformName": "Windows 10",
            "network": true,
            "timezone": "Kolkata",
            "build": "assignment",
            "project": "test2",
            "name": "test3",
            "w3c": true,
            "plugin": "node_js-node_js"
        }
    }
    // URL: https://{username}:{accessToken}@beta-hub.lambdatest.com/wd/hub
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    // Setup and build selenium driver object
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capability)
        .build();

    try{
        // Navigate to the URL, find search box and input the query.
        const product = 'iphone 13';
        await driver.get('https://www.amazon.in');
        searchbox = (await driver).findElement(By.id('twotabsearchtextbox')).sendKeys(product, Key.RETURN);
        await driver.sleep(5000);
        Models = (await driver).findElements(By.xpath('//div[contains(@class, "s-result-item s-asin")]'))        // find divs of results
        await driver.sleep(5000);
        var models = await Models
        var smodels = models.slice(0,5)

        var result = "(Chrome) Results related to product query: \n\n"
        

        for (let i = 0; i < smodels.length;i++){
            var name_model = await smodels[i].findElement(By.xpath('.//span[@class="a-size-medium a-color-base a-text-normal"]')).getText()
            var price_model = await smodels[i].findElement(By.className('a-price-whole')).getText()
            var currency_symbol = await smodels[i].findElement(By.className('a-price-symbol')).getText()

            var model_details = currency_symbol + price_model + '\t-\t' + name_model + '\n'
            result = result + model_details
            
            

        }
        console.log(result)

        
        
    } catch (err) {
        console.log("test failed with reason " + err);
        await driver.executeScript('lambda-status=failed');
    } finally {
        await driver.quit();
    };



    });

});




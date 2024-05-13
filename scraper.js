// https://www.npmjs.com/package/nightmare
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After 
// https://chatgpt.com/c/6795a669-f91c-41f0-a482-7c6b357a70c7 >> Chat logs with ChatGPT

import Nightmare from 'nightmare';

// One function to search based on 5 different sites.
export async function scrapePrice(URL, value) {
    try {
        const nightmare = Nightmare({ waitTimeout: 25000 });
        //Amazon link - Works fine.
        if (URL == "https://www.amazon.com/Sobro-SOCTB300-Refrigerator-Bluetooth-Speakers/dp/B07S85JTZD") { 
            const priceString = await nightmare.goto(URL)
                .wait('#corePrice_feature_div')
                .evaluate(() => document.getElementById("corePrice_feature_div").firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerHTML)
                .end();

            const priceNumber = parseFloat(priceString.replace('$','').replace(',','')); 

            // If price reduced, send green. If price is the same, send gray. If price increases, send red. All must send the price + a color.
            if(priceNumber < value) {
                return { Price: priceNumber, Color: "Green", Message: "On sale! :D"};
            }
            else if (priceNumber == value) {
                return { Price: priceNumber, Color: "Gray", Message: "Same price."};
            }
            else {
                return { Price: priceNumber, Color: "Red", Message: "Price went up :("};
            }  
        }
        //Wayfair link - Can give 429 error code with not many requests, but code has proven to work before.
        else if (URL == "https://www.wayfair.com/furniture/pdp/sobro-smart-coffee-table-sobr1001.html?piid%5B0%5D=26336002") { 
            const priceString = await nightmare.goto(URL)
                .wait('.SFPrice')
                .evaluate(() => document.querySelector('.SFPrice').firstElementChild.firstElementChild.innerHTML)
                .end();
                    
            const priceNumber = parseFloat(priceString.replace('$','').replace(',',''));

            if(priceNumber < value) {
                return { Price: priceNumber, Color: "Green", Message: "On sale! :D"};
            }
            else if (priceNumber == value) {
                return { Price: priceNumber, Color: "Gray", Message: "Same price."};
            }
            else {
                return { Price: priceNumber, Color: "Red", Message: "Price went up :("};
            }  
        }
        //Sobro link - Works fine.
        else if (URL == "https://sobrodesign.com/products/sobro-coffee-table") { 
            const priceString = await nightmare.goto(URL)
                .wait('.regular-price')
                .evaluate(() => document.querySelector('.regular-price').innerHTML)
                .end();

            const priceNumber = parseFloat(priceString.replace('$','').replace(',',''));

            if (priceNumber < value) {
                return { Price: priceNumber, Color: "Green", Message: "On sale! :D"};
            }
            else if (priceNumber == value) {
                return { Price: priceNumber, Color: "Gray", Message: "Same price."};
            }
            else {
                return { Price: priceNumber, Color: "Red", Message: "Price went up :("};
            } 
        }
        //wellbots link - Works fine.
        else if (URL == "https://www.wellbots.com/products/sobro-smart-coffee-table") {
            const priceString = await nightmare.goto(URL)
                .wait('.money')
                .evaluate(() => document.querySelector('.price').querySelector('.money').innerHTML)
                .end();
        
            const priceNumber = parseFloat(priceString.replace('$','').replace(',',''));

            if(priceNumber < value) {
                return { Price: priceNumber, Color: "Green", Message: "On sale! :D"};
            }
            else if (priceNumber == value) {
                return { Price: priceNumber, Color: "Gray", Message: "Same price."};
            }
            else {
                return { Price: priceNumber, Color: "Red", Message: "Price went up :("};
            }  
        }
        //Macy's link - Brings 403 error with .goto() method. Code should work + abide by the robots.txt, but for some reason still unable to scrape page.
        else if (URL == "https://www.macys.com/shop/featured/sobro%20coffee%20table/Pageindex/1?cm_kws_ls=sobro%20coffee%20table") {
            const priceString = await nightmare.goto(URL)
                .wait(3000)
                .evaluate(() => document.querySelector('.discount').lastChild.textContent)
                .end();

            const priceNumber = parseFloat(priceString.replace('$','').replace(',',''));

            if(priceNumber < value) {
                return { Price: priceNumber, Color: "Green", Message: "On sale! :D"};
            }
            else if (priceNumber == value) {
                return { Price: priceNumber, Color: "Gray", Message: "Same price."};
            }
            else {
                return { Price: priceNumber, Color: "Red", Message: "Price went up :("};
            } 
        }

        else {
            return { Message: "No link recognized."}
        }
    }
    catch (error) {
        console.log("An error occured executing the code.");
    }
}

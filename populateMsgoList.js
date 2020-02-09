var URL = require('url').URL;

const axios = require('axios');
const cheerio = require('cheerio');

const orderUrl = 'https://sites.google.com/view/msgo-en/mobile-suit-list/order';
const rebelUrl = 'https://sites.google.com/view/msgo-en/mobile-suit-list/rebellion';

const gundamSelector = '.hJDwNd-AhqUyc-ibL1re.purZT-AhqUyc-ibL1re.pSzOP-AhqUyc-ibL1re.JNdkSc.yYI8W';

let $;

const fetchOrder = async () => {
    const result = await axios.get(orderUrl);
    return cheerio.load(result.data);
};

const fetchRebel = async () => {
    const result = await axios.get(rebelUrl);
    return cheerio.load(result.data);
};

const findGundam = () => {    
    $(gundamSelector).each((index, element) => {
        let name = $('.zfr3Q', element).text();
        let urlStr = $('a', element).attr('href');
        let key = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        if (urlStr) {
            urlObj = new URL(urlStr);
            urlStr = decodeURI(urlObj.searchParams.get('q'));
            urlStr = urlStr.replace(' ', '%20');
    
            console.log(urlStr);
        
            global.msgoList.push({key: key, url: urlStr});

            name = name.replace(/(\w)([([])/g, "$1 $2");
            name = name.replace(/([0-9])(?!(st)|(nd)|(rd)|(th)|[0-9]|\s)/g, "$1 $2");

            global.trueNames[key] = name;

            console.log(`Got ${name} and added to dictionary as: ${key}!`);
        } else {
            console.log(`Found ${name}, but URL not available - not added to dictionary.`);
        }
    });
}

module.exports = async function(){
    $ = await fetchOrder();
    findGundam();
    $ = await fetchRebel();
    findGundam();
}

const axios = require('axios');
const cheerio = require('cheerio');

const orderUrl = 'https://sites.google.com/view/msgo-en/mobile-suit-list/order';
const rebelUrl = 'https://sites.google.com/view/msgo-en/mobile-suit-list/rebellion';

const gundamSelector = '.hJDwNd-AhqUyc-ibL1re.purZT-AhqUyc-ibL1re.pSzOP-AhqUyc-ibL1re.JNdkSc.yYI8W';

const fetchOrder = async () => {
    const result = await axios.get(orderUrl);
    return cheerio.load(result.data);
};

const fetchRebel = async () => {
    const result = await axios.get(rebelUrl);
    return cheerio.load(result.data);
};

module.exports = async function(){
    let $ = await fetchOrder();
    
    $(gundamSelector).each((index, element) => {
        let name = $('.zfr3Q', element).text();
        let url = $('a', element).attr('href');
        let key = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        console.log(`Got ${name} and added to dictionary as: ${key}!`);
    
        global.msgoDict[key] = url;
        global.trueNames[key] = name;
    });

    $ = await fetchRebel();
    
    $(gundamSelector).each((index, element) => {
        let name = $('.zfr3Q', element).text();
        let url = $('a', element).attr('href');
        let key = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        console.log(`Got ${name} and added to dictionary as: ${key}!`);
    
        global.msgoDict[key] = url;
        global.trueNames[key] = name;
    });
}
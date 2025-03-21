import axios from "axios";
import * as cheerio from "cheerio";

async function scapeWebPage(url = ''){
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);

    const pageHead = $('head').html();
    const pageBody = $('body').html();

    const internalLinks = [];
    const externalLinks = [];

    $('a').each((_, element) => {
        const link = $(element).attr('href');
        if(link === '/') return;
        if(link.startsWith('http') || link.startsWith('https')){
            externalLinks.push(link);
        }else{
            internalLinks.push(link);
        }
    });

    return {
        head: pageHead, 
        body: pageBody, 
        internalLinks, 
        externalLinks
    };
}

scapeWebPage('https://piyushgarg.dev')
    .then(console.log)
    .catch(console.error);
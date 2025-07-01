// HTML

import axios from 'axios';
import * as cheerio from 'cheerio';



const fetchfromPartnerB = async(country)=>{
    const firstHTML = `
    <div class="visa-info">
    <ul>
    <li>Passport</li>
    <li>Booking </li>
    </ul
    </div>
    `

    const $ = cheerio.load(firstHTML);
    const documents = [];

    $('li').each((_,li)=>{
        documents.push($(li).text())
    });

    return{
        visa_required: true,
        documents
    }
}

export default fetchfromPartnerB;
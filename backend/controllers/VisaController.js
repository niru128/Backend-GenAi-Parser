import connectMySQL from "../db/mysql.js";
import Visa from "../models/VisaModel.js";
import fetchfromPartnerA from "../services/PartnerA.js";
import fetchfromPartnerB from "../services/PartnerB.js";
import normalized from "../utils/normalise.js";


export const postVisaRequirements = async (req, res) => {

    console.log('Received request to post visa requirements:', req.body);

    const { country, passport, travel_dates, purpose } = req.body;
    try {

        const partnerDataA = await fetchfromPartnerA(country, passport, travel_dates, purpose);
        const partnerDataB = await fetchfromPartnerB(country);

        //normalise the data

        const normalizeA = normalized(partnerDataA);
        const normalizeB = normalized(partnerDataB);

        //storing in Mongo

        await Visa.create({
            country,
            passport,
            travel_dates,
            purpose,
            source: 'parnterA',
            normalized: normalizeA,
        })

        await Visa.create({
            country,
            passport,
            travel_dates,
            purpose,
            source: 'parnterB',
            normalized: normalizeB,
        })

        //store in mysql

        const mysql = await connectMySQL();

        await mysql.execute(
            'CREATE TABLE IF NOT EXISTS visa_requirements (id INT AUTO_INCREMENT PRIMARY KEY, country VARCHAR(255), passport VARCHAR(255), travel_start DATE, travel_end DATE, purpose VARCHAR(255), visa_required BOOLEAN, documents TEXT, source VARCHAR(255), fetched_at DATETIME)'
        )

        const insertVisa = async (source, normalized) => {
            await mysql.execute(
                'INSERT INTO visa_requirements (country, passport, travel_start, travel_end, purpose, visa_required, documents, source, fetched_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    country, passport, travel_dates[0], travel_dates[1], purpose,
                    normalized.visa_required, JSON.stringify(normalized.documents),
                    source, new Date()
                ]
            );
        }

        await insertVisa('PartnerA', normalizeA);
        await insertVisa('PartnerB', normalizeB);

        res.status(201).json({ message: 'Visa requirements saved to both MongoDB and MySQL' });


    } catch (error) {
        console.error('Error in postVisarequirements:', error);
    }
}

export const getVisaRequirements = async (req, res)=>{
    const {country} = req.params;
    try{

        const visas = await Visa.find({
            country : country.toLowerCase()
        })

        if(!visas || visas.length === 0){
            return res.status(404).json({error: 'No visa requirements found for this country'});
        }   
        res.json(visas);

    }catch(err){
        console.error('Error in getVisaRequirements:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
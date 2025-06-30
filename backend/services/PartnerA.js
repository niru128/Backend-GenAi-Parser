const fetchfromPartnerA =async(country , passport , travel_dates , purpose)=>{

    return {
        visa_required: true,
        documents: ['passport','photo' , 'flight_ticket']

    }
}

export default fetchfromPartnerA;
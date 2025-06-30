import mongoose, { mongo } from "mongoose";

const visaSchema = new mongoose.Schema({
    country : {
        type : String,
        required: true,
    },
    passport : {
        type : String,
        required: true,
    },
    travel_dates : [Date],
    purpose : {
        type : String,
        required : true
    },
    source : {
        type : String,
        required : true
    },
    normalized : {
        visa_required : Boolean,
        documents : [String]
    },
    fetched_at  : {
        type : Date,
        default: Date.now
    }
})

const Visa = mongoose.model('VisaRequirement', visaSchema);
export default Visa;    
const normalized = (data)=>{
    return {
        visa_required : data.visa_required ?? true,
        documents : data.documents ?? ['passport']
    };
};

export default normalized;
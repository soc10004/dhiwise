
function buildMakePincode ({
  insertPincodeValidator,updatePincodeValidator
}){
  return function makePincode (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertPincodeValidator':
      isValid = insertPincodeValidator(data);
      break;

    case 'updatePincodeValidator':
      isValid = updatePincodeValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Pincode entity. ${isValid.error}`
      });
    }
      
    return {
      pincode:data.pincode,
      cityId:data.cityId,
      stateId:data.stateId,
      countryId:data.countryId,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakePincode;


function buildMakeCountry ({
  insertCountryValidator,updateCountryValidator
}){
  return function makeCountry (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertCountryValidator':
      isValid = insertCountryValidator(data);
      break;

    case 'updateCountryValidator':
      isValid = updateCountryValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Country entity. ${isValid.error}`
      });
    }
      
    return {
      countryName:data.countryName,
      phoneCode:data.phoneCode,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeCountry;

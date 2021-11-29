
function buildMakeCity ({
  insertCityValidator,updateCityValidator
}){
  return function makeCity (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertCityValidator':
      isValid = insertCityValidator(data);
      break;

    case 'updateCityValidator':
      isValid = updateCityValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in City entity. ${isValid.error}`
      });
    }
      
    return {
      cityName:data.cityName,
      stateId:data.stateId,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeCity;

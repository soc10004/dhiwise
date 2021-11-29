
function buildMakeState ({
  insertStateValidator,updateStateValidator
}){
  return function makeState (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertStateValidator':
      isValid = insertStateValidator(data);
      break;

    case 'updateStateValidator':
      isValid = updateStateValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in State entity. ${isValid.error}`
      });
    }
      
    return {
      stateName:data.stateName,
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
module.exports =  buildMakeState;


function buildMakeCategory ({
  insertCategoryValidator,updateCategoryValidator
}){
  return function makeCategory (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertCategoryValidator':
      isValid = insertCategoryValidator(data);
      break;

    case 'updateCategoryValidator':
      isValid = updateCategoryValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Category entity. ${isValid.error}`
      });
    }
      
    return {
      name:data.name,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      parentCategoryId:data.parentCategoryId,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeCategory;

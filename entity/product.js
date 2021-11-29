
function buildMakeProduct ({
  insertProductValidator,updateProductValidator
}){
  return function makeProduct (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertProductValidator':
      isValid = insertProductValidator(data);
      break;

    case 'updateProductValidator':
      isValid = updateProductValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Product entity. ${isValid.error}`
      });
    }
      
    return {
      name:data.name,
      price:data.price,
      sellerId:data.sellerId,
      brand:data.brand,
      category:data.category,
      subCategory:data.subCategory,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeProduct;

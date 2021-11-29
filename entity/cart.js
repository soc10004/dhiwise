
function buildMakeCart ({
  insertCartValidator,updateCartValidator
}){
  return function makeCart (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertCartValidator':
      isValid = insertCartValidator(data);
      break;

    case 'updateCartValidator':
      isValid = updateCartValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Cart entity. ${isValid.error}`
      });
    }
      
    return {
      customerId:data.customerId,
      isVisible:data.isVisible,
      cartItems:data.cartItems,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeCart;

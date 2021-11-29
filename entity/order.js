
function buildMakeOrder ({
  insertOrderValidator,updateOrderValidator
}){
  return function makeOrder (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertOrderValidator':
      isValid = insertOrderValidator(data);
      break;

    case 'updateOrderValidator':
      isValid = updateOrderValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Order entity. ${isValid.error}`
      });
    }
      
    return {
      customerId:data.customerId,
      sellerId:data.sellerId,
      orderItems:data.orderItems,
      totalAmount:data.totalAmount,
      status:data.status,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeOrder;


function buildMakeShipping ({
  insertShippingValidator,updateShippingValidator
}){
  return function makeShipping (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertShippingValidator':
      isValid = insertShippingValidator(data);
      break;

    case 'updateShippingValidator':
      isValid = updateShippingValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Shipping entity. ${isValid.error}`
      });
    }
      
    return {
      orderId:data.orderId,
      courierCompany:data.courierCompany,
      deliveryStartDate:data.deliveryStartDate,
      EstimatedDeliveryDate:data.EstimatedDeliveryDate,
      ActualDeliveryDate:data.ActualDeliveryDate,
      isPrepaid:data.isPrepaid,
      isReturned:data.isReturned,
      returningReason:data.returningReason,
      returnPickupDate:data.returnPickupDate,
      isReturnDamaged:data.isReturnDamaged,
      returnRecievedDate:data.returnRecievedDate,
      shippingStatus:data.shippingStatus,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      deliveryAddress:data.deliveryAddress,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeShipping;

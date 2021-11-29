
function buildMakeBanner ({
  insertBannerValidator,updateBannerValidator
}){
  return function makeBanner (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertBannerValidator':
      isValid = insertBannerValidator(data);
      break;

    case 'updateBannerValidator':
      isValid = updateBannerValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Banner entity. ${isValid.error}`
      });
    }
      
    return {
      bannerTitle:data.bannerTitle,
      alternateTitle:data.alternateTitle,
      startDate:data.startDate,
      endDate:data.endDate,
      images:data.images,
      redirectLink:data.redirectLink,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      sellerId:data.sellerId,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeBanner;

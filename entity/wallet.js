
function buildMakeWallet ({
  insertWalletValidator,updateWalletValidator
}){
  return function makeWallet (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertWalletValidator':
      isValid = insertWalletValidator(data);
      break;

    case 'updateWalletValidator':
      isValid = updateWalletValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in Wallet entity. ${isValid.error}`
      });
    }
      
    return {
      userId:data.userId,
      walletAmount:data.walletAmount,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeWallet;

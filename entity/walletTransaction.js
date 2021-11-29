
function buildMakeWalletTransaction ({
  insertWalletTransactionValidator,updateWalletTransactionValidator
}){
  return function makeWalletTransaction (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertWalletTransactionValidator':
      isValid = insertWalletTransactionValidator(data);
      break;

    case 'updateWalletTransactionValidator':
      isValid = updateWalletTransactionValidator(data);  
      break; 
    }
    if (isValid.error){
      throw ({
        name:'ValidationError',
        message:`Invalid data in WalletTransaction entity. ${isValid.error}`
      });
    }
      
    return {
      walletId:data.walletId,
      userId:data.userId,
      forOrder:data.forOrder,
      forWallet:data.forWallet,
      transactionAmount:data.transactionAmount,
      isActive:data.isActive,
      createdAt:data.createdAt,
      updatedAt:data.updatedAt,
      addedBy:data.addedBy,
      updatedBy:data.updatedBy,
      isDeleted:data.isDeleted,
    };
  };
}
module.exports =  buildMakeWalletTransaction;

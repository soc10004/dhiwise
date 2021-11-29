const message = require('../../../utils/messages');

function makeWalletTransactionController ({
  walletTransactionService,makeWalletTransaction
})
{
  const addWalletTransaction = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const walletTransaction = makeWalletTransaction(originalData,'insertWalletTransactionValidator');
      let createdWalletTransaction = await walletTransactionService.createDocument(walletTransaction);
      return message.successResponse(
        { data :  createdWalletTransaction }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllWalletTransaction = async ({
    data, loggedInUser
  }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.query !== undefined) {
        query = { ...data.query };
      }
      if (data.isCountOnly){
        result = await walletTransactionService.countDocument(query);
        if (result) {
          result = { totalRecords: result };  
          return message.successResponse(result);
        } else {
          return message.recordNotFound();
        }
      } else { 
        if (data.options !== undefined) {
          options = { ...data.options };
        }
        result = await walletTransactionService.getAllDocuments(query,options);
      }
      if (result.data){
        return message.successResponse({ data: result });
      } else {
        return message.recordNotFound();
      }
            
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const getWalletTransactionCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await walletTransactionService.countDocument(where);
      result = { totalRecords:result };
      return message.successResponse({ data: result });
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const getWalletTransactionByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await walletTransactionService.getDocumentByAggregation(data);
        if (result && result.length){
          return message.successResponse({ data: result });
        }
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse(); 
    }
  };

  const softDeleteManyWalletTransaction = async (ids, loggedInUser) => {
    try {
      if (ids){
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let data = await walletTransactionService.bulkUpdate(query, updateBody);
        return message.successResponse({ data:data });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkInsertWalletTransaction = async ({
    body, loggedInUser
  }) => {
    try {
      let data = body.data;
      for (let i = 0;i < data.length;i++){
        data[i] = {
          ...data[i],
          addedBy:loggedInUser.id.toString(),
        };
      }
      const walletTransactionEntities = data.map((item)=>makeWalletTransaction(item,'insertWalletTransactionValidator'));
      const results = await walletTransactionService.bulkInsert(walletTransactionEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateWalletTransaction = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const walletTransaction = makeWalletTransaction(data.data,'updateWalletTransactionValidator');
        const filterData = removeEmpty(walletTransaction);
        let query = data.filter;
        const updatedWalletTransactions = await walletTransactionService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedWalletTransactions });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyWalletTransaction = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result = await walletTransactionService.deleteMany(query);
        return message.successResponse({ data:result });
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const softDeleteWalletTransaction = async (id,loggedInUser)=>{
    try {
      if (id){
        const query = { _id:id };
        const updateBody = { isDeleted: true, };
        let updatedWalletTransaction = await walletTransactionService.softDeleteByQuery(query, updateBody);
        return message.successResponse({ data:updatedWalletTransaction });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateWalletTransaction = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        walletTransaction.updatedBy = loggedInUser.id;
        const walletTransaction = makeWalletTransaction(data,'updateWalletTransactionValidator');            
        const filterData = removeEmpty(walletTransaction);
        const query = { _id:id };
        let updatedWalletTransaction = await walletTransactionService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedWalletTransaction){
          return message.successResponse({ data : updatedWalletTransaction });
        }
        else {
          return message.badRequest();
        }
      }
      else {
        return message.badRequest();
      }
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const updateWalletTransaction = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const walletTransaction = makeWalletTransaction(data,'updateWalletTransactionValidator');
        const filterData = removeEmpty(walletTransaction);
        let query = { _id:id };
        let updatedWalletTransaction = await walletTransactionService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedWalletTransaction){
          return message.successResponse({ data : updatedWalletTransaction });
        }
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const getWalletTransactionById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await walletTransactionService.getSingleDocument(query, options);
        if (result){
          return message.successResponse({ data: result });
        }
        return message.recordNotFound();
                 
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteWalletTransaction = async (data,id,loggedInUser) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedWalletTransaction = await walletTransactionService.findOneAndDeleteDocument(query);
        return message.successResponse({ data: deletedWalletTransaction });
                
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const removeEmpty = (obj) => {
    Object.entries(obj).forEach(([key,value])=>{
      if (value === undefined){
        delete obj[key];
      }
    });
    return obj;
  };

  return Object.freeze({
    addWalletTransaction,
    findAllWalletTransaction,
    getWalletTransactionCount,
    getWalletTransactionByAggregate,
    softDeleteManyWalletTransaction,
    bulkInsertWalletTransaction,
    bulkUpdateWalletTransaction,
    deleteManyWalletTransaction,
    softDeleteWalletTransaction,
    partialUpdateWalletTransaction,
    updateWalletTransaction,
    getWalletTransactionById,
    deleteWalletTransaction,
    removeEmpty,
  });
}

module.exports = makeWalletTransactionController;

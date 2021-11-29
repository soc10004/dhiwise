const message = require('../../../utils/messages');

function makeWalletController ({
  walletService,makeWallet
})
{
  const addWallet = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const wallet = makeWallet(originalData,'insertWalletValidator');
      let createdWallet = await walletService.createDocument(wallet);
      return message.successResponse(
        { data :  createdWallet }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllWallet = async ({
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
        result = await walletService.countDocument(query);
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
        result = await walletService.getAllDocuments(query,options);
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

  const getWalletCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await walletService.countDocument(where);
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

  const getWalletByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await walletService.getDocumentByAggregation(data);
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

  const softDeleteManyWallet = async (ids, loggedInUser) => {
    try {
      if (ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let result = await deleteDependentService.softDeleteWallet(query, updateBody);
        return message.successResponse({ data:result });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkInsertWallet = async ({
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
      const walletEntities = data.map((item)=>makeWallet(item,'insertWalletValidator'));
      const results = await walletService.bulkInsert(walletEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateWallet = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const wallet = makeWallet(data.data,'updateWalletValidator');
        const filterData = removeEmpty(wallet);
        let query = data.filter;
        const updatedWallets = await walletService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedWallets });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyWallet = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countWallet(query);
        } else {
          result = await deleteDependentService.deleteWallet(query);
        }
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

  const softDeleteWallet = async (id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      const query = { _id:id };
      const updateBody = { isDeleted: true, };
      let result = await deleteDependentService.softDeleteWallet(query, updateBody);
      return message.successResponse({ data:result });
            
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateWallet = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        wallet.updatedBy = loggedInUser.id;
        const wallet = makeWallet(data,'updateWalletValidator');            
        const filterData = removeEmpty(wallet);
        const query = { _id:id };
        let updatedWallet = await walletService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedWallet){
          return message.successResponse({ data : updatedWallet });
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

  const updateWallet = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const wallet = makeWallet(data,'updateWalletValidator');
        const filterData = removeEmpty(wallet);
        let query = { _id:id };
        let updatedWallet = await walletService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedWallet){
          return message.successResponse({ data : updatedWallet });
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

  const getWalletById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await walletService.getSingleDocument(query, options);
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

  const deleteWallet = async (data,id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let query = { _id:id };
      if (data.isWarning) {
        let all = await deleteDependentService.countWallet(query);
        return message.successResponse({ data:all });
      } else {
        let result = await deleteDependentService.deleteWallet(query);
        if (result){
          return message.successResponse({ data:result });
                    
        }
      }
      return message.badRequest();
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message:error.message });
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
    addWallet,
    findAllWallet,
    getWalletCount,
    getWalletByAggregate,
    softDeleteManyWallet,
    bulkInsertWallet,
    bulkUpdateWallet,
    deleteManyWallet,
    softDeleteWallet,
    partialUpdateWallet,
    updateWallet,
    getWalletById,
    deleteWallet,
    removeEmpty,
  });
}

module.exports = makeWalletController;

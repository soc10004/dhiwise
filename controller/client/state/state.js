const message = require('../../../utils/messages');

function makeStateController ({
  stateService,makeState
})
{
  const addState = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const state = makeState(originalData,'insertStateValidator');
      let createdState = await stateService.createDocument(state);
      return message.successResponse(
        { data :  createdState }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllState = async ({
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
        result = await stateService.countDocument(query);
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
        result = await stateService.getAllDocuments(query,options);
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

  const getStateCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await stateService.countDocument(where);
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

  const getStateByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await stateService.getDocumentByAggregation(data);
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

  const softDeleteManyState = async (ids, loggedInUser) => {
    try {
      if (ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let result = await deleteDependentService.softDeleteState(query, updateBody);
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

  const bulkInsertState = async ({
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
      const stateEntities = data.map((item)=>makeState(item,'insertStateValidator'));
      const results = await stateService.bulkInsert(stateEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateState = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const state = makeState(data.data,'updateStateValidator');
        const filterData = removeEmpty(state);
        let query = data.filter;
        const updatedStates = await stateService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedStates });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyState = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countState(query);
        } else {
          result = await deleteDependentService.deleteState(query);
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

  const softDeleteState = async (id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      const query = { _id:id };
      const updateBody = { isDeleted: true, };
      let result = await deleteDependentService.softDeleteState(query, updateBody);
      return message.successResponse({ data:result });
            
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateState = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        state.updatedBy = loggedInUser.id;
        const state = makeState(data,'updateStateValidator');            
        const filterData = removeEmpty(state);
        const query = { _id:id };
        let updatedState = await stateService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedState){
          return message.successResponse({ data : updatedState });
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

  const updateState = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const state = makeState(data,'updateStateValidator');
        const filterData = removeEmpty(state);
        let query = { _id:id };
        let updatedState = await stateService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedState){
          return message.successResponse({ data : updatedState });
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

  const getStateById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await stateService.getSingleDocument(query, options);
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

  const deleteState = async (data,id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let query = { _id:id };
      if (data.isWarning) {
        let all = await deleteDependentService.countState(query);
        return message.successResponse({ data:all });
      } else {
        let result = await deleteDependentService.deleteState(query);
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
    addState,
    findAllState,
    getStateCount,
    getStateByAggregate,
    softDeleteManyState,
    bulkInsertState,
    bulkUpdateState,
    deleteManyState,
    softDeleteState,
    partialUpdateState,
    updateState,
    getStateById,
    deleteState,
    removeEmpty,
  });
}

module.exports = makeStateController;

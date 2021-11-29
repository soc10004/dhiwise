const message = require('../../../utils/messages');

function makePincodeController ({
  pincodeService,makePincode
})
{
  const addPincode = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const pincode = makePincode(originalData,'insertPincodeValidator');
      let createdPincode = await pincodeService.createDocument(pincode);
      return message.successResponse(
        { data :  createdPincode }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllPincode = async ({
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
        result = await pincodeService.countDocument(query);
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
        result = await pincodeService.getAllDocuments(query,options);
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

  const getPincodeCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await pincodeService.countDocument(where);
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

  const getPincodeByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await pincodeService.getDocumentByAggregation(data);
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

  const softDeleteManyPincode = async (ids, loggedInUser) => {
    try {
      if (ids){
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let data = await pincodeService.bulkUpdate(query, updateBody);
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

  const bulkInsertPincode = async ({
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
      const pincodeEntities = data.map((item)=>makePincode(item,'insertPincodeValidator'));
      const results = await pincodeService.bulkInsert(pincodeEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdatePincode = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const pincode = makePincode(data.data,'updatePincodeValidator');
        const filterData = removeEmpty(pincode);
        let query = data.filter;
        const updatedPincodes = await pincodeService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedPincodes });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyPincode = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result = await pincodeService.deleteMany(query);
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

  const softDeletePincode = async (id,loggedInUser)=>{
    try {
      if (id){
        const query = { _id:id };
        const updateBody = { isDeleted: true, };
        let updatedPincode = await pincodeService.softDeleteByQuery(query, updateBody);
        return message.successResponse({ data:updatedPincode });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdatePincode = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        pincode.updatedBy = loggedInUser.id;
        const pincode = makePincode(data,'updatePincodeValidator');            
        const filterData = removeEmpty(pincode);
        const query = { _id:id };
        let updatedPincode = await pincodeService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedPincode){
          return message.successResponse({ data : updatedPincode });
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

  const updatePincode = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const pincode = makePincode(data,'updatePincodeValidator');
        const filterData = removeEmpty(pincode);
        let query = { _id:id };
        let updatedPincode = await pincodeService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedPincode){
          return message.successResponse({ data : updatedPincode });
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

  const getPincodeById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await pincodeService.getSingleDocument(query, options);
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

  const deletePincode = async (data,id,loggedInUser) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedPincode = await pincodeService.findOneAndDeleteDocument(query);
        return message.successResponse({ data: deletedPincode });
                
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
    addPincode,
    findAllPincode,
    getPincodeCount,
    getPincodeByAggregate,
    softDeleteManyPincode,
    bulkInsertPincode,
    bulkUpdatePincode,
    deleteManyPincode,
    softDeletePincode,
    partialUpdatePincode,
    updatePincode,
    getPincodeById,
    deletePincode,
    removeEmpty,
  });
}

module.exports = makePincodeController;

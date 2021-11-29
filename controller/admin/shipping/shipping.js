const message = require('../../../utils/messages');

function makeShippingController ({
  shippingService,makeShipping
})
{
  const addShipping = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const shipping = makeShipping(originalData,'insertShippingValidator');
      let createdShipping = await shippingService.createDocument(shipping);
      return message.successResponse(
        { data :  createdShipping }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllShipping = async ({
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
        result = await shippingService.countDocument(query);
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
        result = await shippingService.getAllDocuments(query,options);
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

  const getShippingCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await shippingService.countDocument(where);
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

  const getShippingByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await shippingService.getDocumentByAggregation(data);
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

  const softDeleteManyShipping = async (ids, loggedInUser) => {
    try {
      if (ids){
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let data = await shippingService.bulkUpdate(query, updateBody);
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

  const bulkInsertShipping = async ({
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
      const shippingEntities = data.map((item)=>makeShipping(item,'insertShippingValidator'));
      const results = await shippingService.bulkInsert(shippingEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateShipping = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const shipping = makeShipping(data.data,'updateShippingValidator');
        const filterData = removeEmpty(shipping);
        let query = data.filter;
        const updatedShippings = await shippingService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedShippings });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyShipping = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result = await shippingService.deleteMany(query);
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

  const softDeleteShipping = async (id,loggedInUser)=>{
    try {
      if (id){
        const query = { _id:id };
        const updateBody = { isDeleted: true, };
        let updatedShipping = await shippingService.softDeleteByQuery(query, updateBody);
        return message.successResponse({ data:updatedShipping });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateShipping = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        shipping.updatedBy = loggedInUser.id;
        const shipping = makeShipping(data,'updateShippingValidator');            
        const filterData = removeEmpty(shipping);
        const query = { _id:id };
        let updatedShipping = await shippingService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedShipping){
          return message.successResponse({ data : updatedShipping });
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

  const updateShipping = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const shipping = makeShipping(data,'updateShippingValidator');
        const filterData = removeEmpty(shipping);
        let query = { _id:id };
        let updatedShipping = await shippingService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedShipping){
          return message.successResponse({ data : updatedShipping });
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

  const getShippingById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await shippingService.getSingleDocument(query, options);
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

  const deleteShipping = async (data,id,loggedInUser) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedShipping = await shippingService.findOneAndDeleteDocument(query);
        return message.successResponse({ data: deletedShipping });
                
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
    addShipping,
    findAllShipping,
    getShippingCount,
    getShippingByAggregate,
    softDeleteManyShipping,
    bulkInsertShipping,
    bulkUpdateShipping,
    deleteManyShipping,
    softDeleteShipping,
    partialUpdateShipping,
    updateShipping,
    getShippingById,
    deleteShipping,
    removeEmpty,
  });
}

module.exports = makeShippingController;

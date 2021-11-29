const message = require('../../../utils/messages');

function makeCartController ({
  cartService,makeCart
})
{
  const addCart = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const cart = makeCart(originalData,'insertCartValidator');
      let createdCart = await cartService.createDocument(cart);
      return message.successResponse(
        { data :  createdCart }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllCart = async ({
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
        result = await cartService.countDocument(query);
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
        result = await cartService.getAllDocuments(query,options);
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

  const getCartCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await cartService.countDocument(where);
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

  const getCartByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await cartService.getDocumentByAggregation(data);
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

  const softDeleteManyCart = async (ids, loggedInUser) => {
    try {
      if (ids){
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let data = await cartService.bulkUpdate(query, updateBody);
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

  const bulkInsertCart = async ({
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
      const cartEntities = data.map((item)=>makeCart(item,'insertCartValidator'));
      const results = await cartService.bulkInsert(cartEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateCart = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const cart = makeCart(data.data,'updateCartValidator');
        const filterData = removeEmpty(cart);
        let query = data.filter;
        const updatedCarts = await cartService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedCarts });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyCart = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result = await cartService.deleteMany(query);
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

  const softDeleteCart = async (id,loggedInUser)=>{
    try {
      if (id){
        const query = { _id:id };
        const updateBody = { isDeleted: true, };
        let updatedCart = await cartService.softDeleteByQuery(query, updateBody);
        return message.successResponse({ data:updatedCart });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateCart = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        cart.updatedBy = loggedInUser.id;
        const cart = makeCart(data,'updateCartValidator');            
        const filterData = removeEmpty(cart);
        const query = { _id:id };
        let updatedCart = await cartService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCart){
          return message.successResponse({ data : updatedCart });
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

  const updateCart = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const cart = makeCart(data,'updateCartValidator');
        const filterData = removeEmpty(cart);
        let query = { _id:id };
        let updatedCart = await cartService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCart){
          return message.successResponse({ data : updatedCart });
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

  const getCartById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await cartService.getSingleDocument(query, options);
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

  const deleteCart = async (data,id,loggedInUser) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedCart = await cartService.findOneAndDeleteDocument(query);
        return message.successResponse({ data: deletedCart });
                
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
    addCart,
    findAllCart,
    getCartCount,
    getCartByAggregate,
    softDeleteManyCart,
    bulkInsertCart,
    bulkUpdateCart,
    deleteManyCart,
    softDeleteCart,
    partialUpdateCart,
    updateCart,
    getCartById,
    deleteCart,
    removeEmpty,
  });
}

module.exports = makeCartController;

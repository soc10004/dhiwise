const message = require('../../../utils/messages');

function makeCategoryController ({
  categoryService,makeCategory
})
{
  const addCategory = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const category = makeCategory(originalData,'insertCategoryValidator');
      let createdCategory = await categoryService.createDocument(category);
      return message.successResponse(
        { data :  createdCategory }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllCategory = async ({
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
        result = await categoryService.countDocument(query);
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
        result = await categoryService.getAllDocuments(query,options);
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

  const getCategoryCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await categoryService.countDocument(where);
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

  const getCategoryByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await categoryService.getDocumentByAggregation(data);
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

  const softDeleteManyCategory = async (ids, loggedInUser) => {
    try {
      if (ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let result = await deleteDependentService.softDeleteCategory(query, updateBody);
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

  const bulkInsertCategory = async ({
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
      const categoryEntities = data.map((item)=>makeCategory(item,'insertCategoryValidator'));
      const results = await categoryService.bulkInsert(categoryEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateCategory = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const category = makeCategory(data.data,'updateCategoryValidator');
        const filterData = removeEmpty(category);
        let query = data.filter;
        const updatedCategorys = await categoryService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedCategorys });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyCategory = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countCategory(query);
        } else {
          result = await deleteDependentService.deleteCategory(query);
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

  const softDeleteCategory = async (id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      const query = { _id:id };
      const updateBody = { isDeleted: true, };
      let result = await deleteDependentService.softDeleteCategory(query, updateBody);
      return message.successResponse({ data:result });
            
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateCategory = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        category.updatedBy = loggedInUser.id;
        const category = makeCategory(data,'updateCategoryValidator');            
        const filterData = removeEmpty(category);
        const query = { _id:id };
        let updatedCategory = await categoryService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCategory){
          return message.successResponse({ data : updatedCategory });
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

  const updateCategory = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const category = makeCategory(data,'updateCategoryValidator');
        const filterData = removeEmpty(category);
        let query = { _id:id };
        let updatedCategory = await categoryService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCategory){
          return message.successResponse({ data : updatedCategory });
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

  const getCategoryById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await categoryService.getSingleDocument(query, options);
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

  const deleteCategory = async (data,id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let query = { _id:id };
      if (data.isWarning) {
        let all = await deleteDependentService.countCategory(query);
        return message.successResponse({ data:all });
      } else {
        let result = await deleteDependentService.deleteCategory(query);
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
    addCategory,
    findAllCategory,
    getCategoryCount,
    getCategoryByAggregate,
    softDeleteManyCategory,
    bulkInsertCategory,
    bulkUpdateCategory,
    deleteManyCategory,
    softDeleteCategory,
    partialUpdateCategory,
    updateCategory,
    getCategoryById,
    deleteCategory,
    removeEmpty,
  });
}

module.exports = makeCategoryController;

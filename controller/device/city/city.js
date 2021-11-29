const message = require('../../../utils/messages');

function makeCityController ({
  cityService,makeCity
})
{
  const addCity = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const city = makeCity(originalData,'insertCityValidator');
      let createdCity = await cityService.createDocument(city);
      return message.successResponse(
        { data :  createdCity }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllCity = async ({
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
        result = await cityService.countDocument(query);
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
        result = await cityService.getAllDocuments(query,options);
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

  const getCityCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await cityService.countDocument(where);
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

  const getCityByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await cityService.getDocumentByAggregation(data);
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

  const softDeleteManyCity = async (ids, loggedInUser) => {
    try {
      if (ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let result = await deleteDependentService.softDeleteCity(query, updateBody);
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

  const bulkInsertCity = async ({
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
      const cityEntities = data.map((item)=>makeCity(item,'insertCityValidator'));
      const results = await cityService.bulkInsert(cityEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateCity = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const city = makeCity(data.data,'updateCityValidator');
        const filterData = removeEmpty(city);
        let query = data.filter;
        const updatedCitys = await cityService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedCitys });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyCity = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        const deleteDependentService = require('../../../utils/deleteDependent');
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result;
        if (data.isWarning){
          result = await deleteDependentService.countCity(query);
        } else {
          result = await deleteDependentService.deleteCity(query);
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

  const softDeleteCity = async (id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      const query = { _id:id };
      const updateBody = { isDeleted: true, };
      let result = await deleteDependentService.softDeleteCity(query, updateBody);
      return message.successResponse({ data:result });
            
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateCity = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        city.updatedBy = loggedInUser.id;
        const city = makeCity(data,'updateCityValidator');            
        const filterData = removeEmpty(city);
        const query = { _id:id };
        let updatedCity = await cityService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCity){
          return message.successResponse({ data : updatedCity });
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

  const updateCity = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const city = makeCity(data,'updateCityValidator');
        const filterData = removeEmpty(city);
        let query = { _id:id };
        let updatedCity = await cityService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedCity){
          return message.successResponse({ data : updatedCity });
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

  const getCityById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await cityService.getSingleDocument(query, options);
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

  const deleteCity = async (data,id,loggedInUser) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let query = { _id:id };
      if (data.isWarning) {
        let all = await deleteDependentService.countCity(query);
        return message.successResponse({ data:all });
      } else {
        let result = await deleteDependentService.deleteCity(query);
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
    addCity,
    findAllCity,
    getCityCount,
    getCityByAggregate,
    softDeleteManyCity,
    bulkInsertCity,
    bulkUpdateCity,
    deleteManyCity,
    softDeleteCity,
    partialUpdateCity,
    updateCity,
    getCityById,
    deleteCity,
    removeEmpty,
  });
}

module.exports = makeCityController;

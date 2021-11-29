const message = require('../../../utils/messages');

function makeBannerController ({
  bannerService,makeBanner
})
{
  const addBanner = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const banner = makeBanner(originalData,'insertBannerValidator');
      let createdBanner = await bannerService.createDocument(banner);
      return message.successResponse(
        { data :  createdBanner }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllBanner = async ({
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
        result = await bannerService.countDocument(query);
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
        result = await bannerService.getAllDocuments(query,options);
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

  const getBannerCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await bannerService.countDocument(where);
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

  const getBannerByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await bannerService.getDocumentByAggregation(data);
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

  const softDeleteManyBanner = async (ids, loggedInUser) => {
    try {
      if (ids){
        const query = { _id:{ $in:ids } };
        const updateBody = { isDeleted: true, };
        let data = await bannerService.bulkUpdate(query, updateBody);
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

  const bulkInsertBanner = async ({
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
      const bannerEntities = data.map((item)=>makeBanner(item,'insertBannerValidator'));
      const results = await bannerService.bulkInsert(bannerEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateBanner = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const banner = makeBanner(data.data,'updateBannerValidator');
        const filterData = removeEmpty(banner);
        let query = data.filter;
        const updatedBanners = await bannerService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedBanners });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const deleteManyBanner = async (data, loggedInUser) => {
    try {
      if (data && data.ids){
        let ids = data.ids;
        const query = { '_id':{ '$in':ids } };
        let result = await bannerService.deleteMany(query);
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

  const softDeleteBanner = async (id,loggedInUser)=>{
    try {
      if (id){
        const query = { _id:id };
        const updateBody = { isDeleted: true, };
        let updatedBanner = await bannerService.softDeleteByQuery(query, updateBody);
        return message.successResponse({ data:updatedBanner });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message: error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateBanner = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        banner.updatedBy = loggedInUser.id;
        const banner = makeBanner(data,'updateBannerValidator');            
        const filterData = removeEmpty(banner);
        const query = { _id:id };
        let updatedBanner = await bannerService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedBanner){
          return message.successResponse({ data : updatedBanner });
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

  const updateBanner = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const banner = makeBanner(data,'updateBannerValidator');
        const filterData = removeEmpty(banner);
        let query = { _id:id };
        let updatedBanner = await bannerService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedBanner){
          return message.successResponse({ data : updatedBanner });
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

  const getBannerById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await bannerService.getSingleDocument(query, options);
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

  const deleteBanner = async (data,id,loggedInUser) => {
    try {
      if (id){
        const query = { _id:id };
        let deletedBanner = await bannerService.findOneAndDeleteDocument(query);
        return message.successResponse({ data: deletedBanner });
                
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
    addBanner,
    findAllBanner,
    getBannerCount,
    getBannerByAggregate,
    softDeleteManyBanner,
    bulkInsertBanner,
    bulkUpdateBanner,
    deleteManyBanner,
    softDeleteBanner,
    partialUpdateBanner,
    updateBanner,
    getBannerById,
    deleteBanner,
    removeEmpty,
  });
}

module.exports = makeBannerController;

const message = require('../../../utils/messages');

function makeUserController ({
  userService,makeUser
})
{
  const addUser = async ({
    data, loggedInUser
  }) => {
    try {
      let originalData = data;
      originalData.addedBy = loggedInUser.id.toString();
      const user = makeUser(originalData,'insertUserValidator');
      let createdUser = await userService.createDocument(user);
      return message.successResponse(
        { data :  createdUser }
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const findAllUser = async ({
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
        result = await userService.countDocument(query);
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
        result = await userService.getAllDocuments(query,options);
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

  const getUserCount = async (data) => {
    try {
      let where = {};
      if (data && data.where){
        where = data.where;
      }
      let result = await userService.countDocument(where);
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

  const getUserByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await userService.getDocumentByAggregation(data);
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

  const bulkInsertUser = async ({
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
      const userEntities = data.map((item)=>makeUser(item,'insertUserValidator'));
      const results = await userService.bulkInsert(userEntities);
      return message.successResponse({ data:results });
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message : error.message });
      }
      return message.failureResponse();
    }
  };

  const bulkUpdateUser = async (data, loggedInUser) => {
    try {
      if (data.filter && data.data){
        delete data.data['addedBy'];
        delete data.data['updatedBy'];
        data.data.updatedBy = loggedInUser.id;
        const user = makeUser(data.data,'updateUserValidator');
        const filterData = removeEmpty(user);
        let query = data.filter;
        const updatedUsers = await userService.bulkUpdate(query,filterData);
        return message.successResponse({ data:updatedUsers });
      }
      return message.badRequest();
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam({ message :error.message });
      }
      return message.failureResponse();
    }
  };

  const partialUpdateUser = async (data,id, loggedInUser) => {
    try {
      if (id && data){
        delete data['addedBy'];
        delete data['updatedBy'];
        user.updatedBy = loggedInUser.id;
        const user = makeUser(data,'updateUserValidator');            
        const filterData = removeEmpty(user);
        const query = { _id:id };
        let updatedUser = await userService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedUser){
          return message.successResponse({ data : updatedUser });
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

  const updateUser = async (data,id, loggedInUser) =>{
    try {
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = loggedInUser.id;
      if (id && data){
        const user = makeUser(data,'updateUserValidator');
        const filterData = removeEmpty(user);
        let query = { _id:id };
        let updatedUser = await userService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedUser){
          return message.successResponse({ data : updatedUser });
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

  const getUserById = async (query, body = {}) =>{
    try {
      if (query){
        let options = {};
        if (body && body.populate && body.populate.length) options.populate = body.populate;
        if (body && body.select && body.select.length) options.select = body.select;
        let result = await userService.getSingleDocument(query, options);
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

  const removeEmpty = (obj) => {
    Object.entries(obj).forEach(([key,value])=>{
      if (value === undefined){
        delete obj[key];
      }
    });
    return obj;
  };

  return Object.freeze({
    addUser,
    findAllUser,
    getUserCount,
    getUserByAggregate,
    bulkInsertUser,
    bulkUpdateUser,
    partialUpdateUser,
    updateUser,
    getUserById,
    removeEmpty,
  });
}

module.exports = makeUserController;

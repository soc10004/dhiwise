const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/user');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/user/create',(req,res,next)=>{
  req = adaptRequest(req);
  userController.addUser({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/user/list',(req,res,next)=>{
  req = adaptRequest(req);
  userController.findAllUser({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/user/count').post((req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/user/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/user/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  userController.softDeleteManyUser(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/user/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  userController.bulkInsertUser({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/user/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  userController.bulkUpdateUser(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/user/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  userController.deleteManyUser(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/user/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.softDeleteUser(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/user/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.partialUpdateUser(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/user/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.updateUser(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/user/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/user/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/user/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  userController.deleteUser(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
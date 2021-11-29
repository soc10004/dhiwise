const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/client/category');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/client/api/v1/category/create',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.addCategory({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/category/list',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.findAllCategory({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/category/count').post((req,res,next)=>{
  req = adaptRequest(req);
  categoryController.getCategoryCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/category/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  categoryController.getCategoryByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/category/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.softDeleteManyCategory(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/category/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.bulkInsertCategory({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/category/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.bulkUpdateCategory(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/category/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.deleteManyCategory(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/category/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.softDeleteCategory(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/category/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.partialUpdateCategory(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/client/api/v1/category/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.updateCategory(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/client/api/v1/category/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.getCategoryById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/client/api/v1/category/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.getCategoryById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/category/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  categoryController.deleteCategory(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
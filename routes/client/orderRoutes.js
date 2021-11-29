const express = require('express');
const router = express.Router();
const orderController = require('../../controller/client/order');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/client/api/v1/order/create',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.addOrder({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/order/list',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.findAllOrder({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/order/count').post((req,res,next)=>{
  req = adaptRequest(req);
  orderController.getOrderCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/order/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  orderController.getOrderByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/order/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.softDeleteManyOrder(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/order/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.bulkInsertOrder({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/order/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.bulkUpdateOrder(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/order/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.deleteManyOrder(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/order/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.softDeleteOrder(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/order/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.partialUpdateOrder(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/client/api/v1/order/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.updateOrder(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/client/api/v1/order/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.getOrderById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/client/api/v1/order/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.getOrderById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/order/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  orderController.deleteOrder(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const cartController = require('../../controller/device/cart');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/device/api/v1/cart/create',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.addCart({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/cart/list',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.findAllCart({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/cart/count').post((req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/cart/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/cart/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.softDeleteManyCart(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/cart/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.bulkInsertCart({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/cart/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.bulkUpdateCart(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/cart/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.deleteManyCart(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/cart/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.softDeleteCart(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/cart/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.partialUpdateCart(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/device/api/v1/cart/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.updateCart(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/device/api/v1/cart/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/cart/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/cart/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.deleteCart(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
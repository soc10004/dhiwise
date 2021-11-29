const express = require('express');
const router = express.Router();
const cartController = require('../../controller/admin/cart');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/cart/create',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.addCart({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/cart/list',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.findAllCart({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/cart/count').post((req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/cart/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/cart/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.softDeleteManyCart(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/cart/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.bulkInsertCart({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/cart/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.bulkUpdateCart(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/cart/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.deleteManyCart(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/cart/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.softDeleteCart(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/cart/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.partialUpdateCart(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/cart/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.updateCart(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/cart/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/cart/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.getCartById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/cart/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cartController.deleteCart(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
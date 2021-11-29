const express = require('express');
const router = express.Router();
const productController = require('../../controller/admin/product');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/product/create',(req,res,next)=>{
  req = adaptRequest(req);
  productController.addProduct({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/product/list',(req,res,next)=>{
  req = adaptRequest(req);
  productController.findAllProduct({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/product/count').post((req,res,next)=>{
  req = adaptRequest(req);
  productController.getProductCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/product/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  productController.getProductByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/product/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  productController.softDeleteManyProduct(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/product/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  productController.bulkInsertProduct({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/product/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  productController.bulkUpdateProduct(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/product/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  productController.deleteManyProduct(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/product/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.softDeleteProduct(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/product/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.partialUpdateProduct(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/product/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.updateProduct(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/product/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.getProductById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/product/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.getProductById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/product/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  productController.deleteProduct(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
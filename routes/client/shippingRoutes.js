const express = require('express');
const router = express.Router();
const shippingController = require('../../controller/client/shipping');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/client/api/v1/shipping/create',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.addShipping({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/shipping/list',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.findAllShipping({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/shipping/count').post((req,res,next)=>{
  req = adaptRequest(req);
  shippingController.getShippingCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/shipping/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  shippingController.getShippingByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/shipping/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.softDeleteManyShipping(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/shipping/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.bulkInsertShipping({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/shipping/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.bulkUpdateShipping(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/shipping/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.deleteManyShipping(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/shipping/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.softDeleteShipping(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/shipping/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.partialUpdateShipping(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/client/api/v1/shipping/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.updateShipping(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/client/api/v1/shipping/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.getShippingById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/client/api/v1/shipping/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.getShippingById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/shipping/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  shippingController.deleteShipping(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
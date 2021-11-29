const express = require('express');
const router = express.Router();
const pincodeController = require('../../controller/admin/pincode');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/pincode/create',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.addPincode({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/pincode/list',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.findAllPincode({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/pincode/count').post((req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.getPincodeCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/pincode/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.getPincodeByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/pincode/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.softDeleteManyPincode(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/pincode/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.bulkInsertPincode({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/pincode/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.bulkUpdatePincode(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/pincode/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.deleteManyPincode(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/pincode/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.softDeletePincode(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/pincode/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.partialUpdatePincode(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/pincode/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.updatePincode(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/pincode/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.getPincodeById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/pincode/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.getPincodeById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/pincode/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  pincodeController.deletePincode(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
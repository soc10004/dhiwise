const express = require('express');
const router = express.Router();
const walletTransactionController = require('../../controller/device/walletTransaction');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/device/api/v1/wallettransaction/create',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.addWalletTransaction({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/wallettransaction/list',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.findAllWalletTransaction({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/wallettransaction/count').post((req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.getWalletTransactionCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/wallettransaction/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.getWalletTransactionByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallettransaction/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.softDeleteManyWalletTransaction(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/wallettransaction/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.bulkInsertWalletTransaction({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallettransaction/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.bulkUpdateWalletTransaction(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/wallettransaction/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.deleteManyWalletTransaction(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallettransaction/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.softDeleteWalletTransaction(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallettransaction/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.partialUpdateWalletTransaction(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/device/api/v1/wallettransaction/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.updateWalletTransaction(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/device/api/v1/wallettransaction/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.getWalletTransactionById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/wallettransaction/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.getWalletTransactionById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/wallettransaction/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletTransactionController.deleteWalletTransaction(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const walletController = require('../../controller/device/wallet');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/device/api/v1/wallet/create',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.addWallet({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/wallet/list',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.findAllWallet({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/wallet/count').post((req,res,next)=>{
  req = adaptRequest(req);
  walletController.getWalletCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/wallet/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  walletController.getWalletByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallet/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.softDeleteManyWallet(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/wallet/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.bulkInsertWallet({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallet/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.bulkUpdateWallet(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/wallet/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.deleteManyWallet(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallet/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.softDeleteWallet(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/wallet/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.partialUpdateWallet(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/device/api/v1/wallet/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.updateWallet(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/device/api/v1/wallet/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.getWalletById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/wallet/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.getWalletById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/wallet/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  walletController.deleteWallet(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
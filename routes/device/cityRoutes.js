const express = require('express');
const router = express.Router();
const cityController = require('../../controller/device/city');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/device/api/v1/city/create',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.addCity({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/city/list',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.findAllCity({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/city/count').post((req,res,next)=>{
  req = adaptRequest(req);
  cityController.getCityCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/device/api/v1/city/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  cityController.getCityByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/city/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.softDeleteManyCity(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/device/api/v1/city/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.bulkInsertCity({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/city/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.bulkUpdateCity(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/city/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.deleteManyCity(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/city/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.softDeleteCity(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/device/api/v1/city/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.partialUpdateCity(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/device/api/v1/city/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.updateCity(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/device/api/v1/city/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.getCityById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/device/api/v1/city/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.getCityById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/device/api/v1/city/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  cityController.deleteCity(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const countryController = require('../../controller/client/country');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/client/api/v1/country/create',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.addCountry({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/country/list',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.findAllCountry({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/country/count').post((req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/client/api/v1/country/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/country/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.softDeleteManyCountry(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/client/api/v1/country/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.bulkInsertCountry({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/country/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.bulkUpdateCountry(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/country/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.deleteManyCountry(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/country/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.softDeleteCountry(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/client/api/v1/country/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.partialUpdateCountry(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/client/api/v1/country/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.updateCountry(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/client/api/v1/country/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/client/api/v1/country/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/client/api/v1/country/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.deleteCountry(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const countryController = require('../../controller/admin/country');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/country/create',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.addCountry({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/country/list',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.findAllCountry({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/country/count').post((req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/country/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/country/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.softDeleteManyCountry(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/country/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.bulkInsertCountry({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/country/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.bulkUpdateCountry(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/country/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.deleteManyCountry(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/country/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.softDeleteCountry(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/country/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.partialUpdateCountry(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/country/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.updateCountry(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/country/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/country/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.getCountryById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/country/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  countryController.deleteCountry(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
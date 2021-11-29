const express = require('express');
const router = express.Router();
const bannerController = require('../../controller/admin/banner');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/banner/create',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.addBanner({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/banner/list',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.findAllBanner({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/banner/count').post((req,res,next)=>{
  req = adaptRequest(req);
  bannerController.getBannerCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/banner/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  bannerController.getBannerByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/banner/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.softDeleteManyBanner(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/banner/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.bulkInsertBanner({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/banner/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.bulkUpdateBanner(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/banner/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.deleteManyBanner(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/banner/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.softDeleteBanner(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/banner/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.partialUpdateBanner(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/banner/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.updateBanner(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/banner/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.getBannerById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/banner/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.getBannerById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/banner/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  bannerController.deleteBanner(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
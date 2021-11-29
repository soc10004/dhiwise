const express = require('express');
const router = express.Router();
const stateController = require('../../controller/admin/state');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');

router.post('/admin/state/create',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.addState({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/state/list',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.findAllState({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/state/count').post((req,res,next)=>{
  req = adaptRequest(req);
  stateController.getStateCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.route('/admin/state/aggregate').post((req,res,next)=>{
  req = adaptRequest(req);
  stateController.getStateByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/state/softDeleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.softDeleteManyState(req.body.ids
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.post('/admin/state/addBulk',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.bulkInsertState({ body: req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/state/updateBulk',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.bulkUpdateState(req.body
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/state/deleteMany',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.deleteManyState(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/state/softDelete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.softDeleteState(req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.put('/admin/state/partial-update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.partialUpdateState(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.put('/admin/state/update/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.updateState(req.body,req.pathParams.id
  ).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});  

router.get('/admin/state/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.getStateById({ _id: req.pathParams.id }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});
router.post('/admin/state/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.getStateById({ _id: req.pathParams.id }, body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

router.delete('/admin/state/delete/:id',(req,res,next)=>{
  req = adaptRequest(req);
  stateController.deleteState(req.body,req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((error) => {
      sendResponse(res,error);
    });
});

module.exports = router;
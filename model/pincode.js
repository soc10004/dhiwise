function makeModel (mongoose,...dependencies){
    
  if (!mongoose.models.pincode){
    const mongoosePaginate = require('mongoose-paginate-v2');
    const idvalidator = require('mongoose-id-validator');
    const myCustomLabels = {
      totalDocs: 'itemCount',
      docs: 'data',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'pageCount',
      pagingCounter: 'slNo',
      meta: 'paginator',
    };
    mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
    const Schema = mongoose.Schema;
    const schema = new Schema(
      {
        pincode:{ type:String },
        cityId:{
          type:Schema.Types.ObjectId,
          ref:'city'
        },
        stateId:{
          type:Schema.Types.ObjectId,
          ref:'state'
        },
        countryId:{
          type:Schema.Types.ObjectId,
          ref:'country'
        },
        isActive:{ type:Boolean },
        createdAt:{ type:Date },
        updatedAt:{ type:Date },
        addedBy:{
          type:Schema.Types.ObjectId,
          ref:null
        },
        updatedBy:{
          type:Schema.Types.ObjectId,
          ref:null
        },
        isDeleted:{ type:Boolean }
      },
      {
        timestamps: {
          createdAt: 'createdAt',
          updatedAt: 'updatedAt' 
        } 
      }
    );
    
    schema.pre('save', async function (next) {
      this.isDeleted = false;
      this.isActive = true;
      next();
    });

    schema.pre('insertMany', async function (next, docs) {
      if (docs && docs.length){
        for (let index = 0; index < docs.length; index++) {
          const element = docs[index];
          element.isDeleted = false;
          element.isActive = true;
        }
      }
      next();
    });

    schema.method('toJSON', function () {
      const {
        __v, ...object 
      } = this.toObject({ virtuals:true });
      object.id = object._id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    schema.plugin(idvalidator);

    const pincode = mongoose.model('pincode',schema,'pincode');
    return pincode;
  }
  else {
    return mongoose.models.pincode;
  }
}
module.exports = makeModel;
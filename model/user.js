function makeModel (mongoose,...dependencies){
    
  if (!mongoose.models.user){
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
        username:{ type:String },
        password:{ type:String },
        email:{ type:String },
        name:{ type:String },
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
        shippingAddress:[{
          pincode:{ type:String },
          address1:{ type:String },
          address2:{ type:String },
          landmark:{ type:String },
          city:{ type:String },
          isDefault:{ type:Boolean },
          state:{ type:String },
          addressType:{ type:String },
          fullName:{ type:String },
          mobile:{
            type:Number,
            min:10,
            max:10
          },
          addressNo:{ type:Number }
        }],
        wishlist:[{ productId:{ type:String } }],
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

    const user = mongoose.model('user',schema,'user');
    return user;
  }
  else {
    return mongoose.models.user;
  }
}
module.exports = makeModel;
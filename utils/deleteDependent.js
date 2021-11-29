const db = require('mongoose');
let User = require('../model/user')(db);
let Product = require('../model/product')(db);
let Category = require('../model/category')(db);
let Order = require('../model/order')(db);
let Banner = require('../model/banner')(db);
let Cart = require('../model/cart')(db);
let Country = require('../model/country')(db);
let City = require('../model/city')(db);
let Pincode = require('../model/pincode')(db);
let State = require('../model/state')(db);
let Wallet = require('../model/wallet')(db);
let WalletTransaction = require('../model/walletTransaction')(db);
let Shipping = require('../model/shipping')(db);

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const productFilter6432 = { 'sellerId': { '$in': user } };
      const product0357 = await deleteProduct(productFilter6432);
      const bannerFilter2868 = { 'sellerId': { '$in': user } };
      const banner7271 = await deleteBanner(bannerFilter2868);
      const walletFilter9217 = { 'userId': { '$in': user } };
      const wallet5927 = await deleteWallet(walletFilter9217);
      const walletTransactionFilter7843 = { 'userId': { '$in': user } };
      const walletTransaction0641 = await deleteWalletTransaction(walletTransactionFilter7843);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProduct = async (filter) =>{
  try {
    return await Product.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await Category.find(filter, { _id:1 });
    if (category.length){
      category = category.map((obj) => obj._id);
      const productFilter4697 = { 'category': { '$in': category } };
      const product4993 = await deleteProduct(productFilter4697);
      const productFilter9860 = { 'subCategory': { '$in': category } };
      const product7148 = await deleteProduct(productFilter9860);
      const categoryFilter4684 = { 'parentCategoryId': { '$in': category } };
      const category2377 = await deleteCategory(categoryFilter4684);
      return await Category.deleteMany(filter);
    } else {
      return 'No category found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder = async (filter) =>{
  try {
    return await Order.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBanner = async (filter) =>{
  try {
    return await Banner.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCart = async (filter) =>{
  try {
    return await Cart.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCountry = async (filter) =>{
  try {
    let country = await Country.find(filter, { _id:1 });
    if (country.length){
      country = country.map((obj) => obj._id);
      const pincodeFilter8556 = { 'countryId': { '$in': country } };
      const pincode0385 = await deletePincode(pincodeFilter8556);
      const stateFilter3640 = { 'countryId': { '$in': country } };
      const state3998 = await deleteState(stateFilter3640);
      return await Country.deleteMany(filter);
    } else {
      return 'No country found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCity = async (filter) =>{
  try {
    let city = await City.find(filter, { _id:1 });
    if (city.length){
      city = city.map((obj) => obj._id);
      const pincodeFilter8462 = { 'cityId': { '$in': city } };
      const pincode8472 = await deletePincode(pincodeFilter8462);
      return await City.deleteMany(filter);
    } else {
      return 'No city found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePincode = async (filter) =>{
  try {
    return await Pincode.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteState = async (filter) =>{
  try {
    let state = await State.find(filter, { _id:1 });
    if (state.length){
      state = state.map((obj) => obj._id);
      const cityFilter3424 = { 'stateId': { '$in': state } };
      const city4000 = await deleteCity(cityFilter3424);
      const pincodeFilter7778 = { 'stateId': { '$in': state } };
      const pincode4284 = await deletePincode(pincodeFilter7778);
      return await State.deleteMany(filter);
    } else {
      return 'No state found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWallet = async (filter) =>{
  try {
    let wallet = await Wallet.find(filter, { _id:1 });
    if (wallet.length){
      wallet = wallet.map((obj) => obj._id);
      const walletTransactionFilter7277 = { 'walletId': { '$in': wallet } };
      const walletTransaction3530 = await deleteWalletTransaction(walletTransactionFilter7277);
      return await Wallet.deleteMany(filter);
    } else {
      return 'No wallet found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWalletTransaction = async (filter) =>{
  try {
    return await WalletTransaction.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteShipping = async (filter) =>{
  try {
    return await Shipping.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const productFilter = { '$or': [{                    sellerId : { '$in' : user } }] };
      const productCnt =  await Product.countDocuments(productFilter);

      const bannerFilter = { '$or': [{                    sellerId : { '$in' : user } }] };
      const bannerCnt =  await Banner.countDocuments(bannerFilter);

      const walletFilter = { '$or': [{                    userId : { '$in' : user } }] };
      const walletCnt =  await Wallet.countDocuments(walletFilter);

      const walletTransactionFilter = { '$or': [{                    userId : { '$in' : user } }] };
      const walletTransactionCnt =  await WalletTransaction.countDocuments(walletTransactionFilter);
           
      let response = {
        product : productCnt,
        banner : bannerCnt,
        wallet : walletCnt,
        walletTransaction : walletTransactionCnt,
      };
            
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProduct = async (filter) =>{
  try {
    const productCnt =  await Product.countDocuments(filter);
    return { product : productCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await Category.find(filter, { _id:1 });
    if (category.length){
      category = category.map((obj) => obj._id);

      const productFilter = { '$or': [{                    category : { '$in' : category } },{                    subCategory : { '$in' : category } }] };
      const productCnt =  await Product.countDocuments(productFilter);

      const categoryFilter = { '$or': [{                    parentCategoryId : { '$in' : category } }] };
      const categoryCnt =  await Category.countDocuments(categoryFilter);
           
      let response = {
        product : productCnt,
        category : categoryCnt,
      };
            
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
    const orderCnt =  await Order.countDocuments(filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBanner = async (filter) =>{
  try {
    const bannerCnt =  await Banner.countDocuments(filter);
    return { banner : bannerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCart = async (filter) =>{
  try {
    const cartCnt =  await Cart.countDocuments(filter);
    return { cart : cartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCountry = async (filter) =>{
  try {
    let country = await Country.find(filter, { _id:1 });
    if (country.length){
      country = country.map((obj) => obj._id);

      const pincodeFilter = { '$or': [{                    countryId : { '$in' : country } }] };
      const pincodeCnt =  await Pincode.countDocuments(pincodeFilter);

      const stateFilter = { '$or': [{                    countryId : { '$in' : country } }] };
      const stateCnt =  await State.countDocuments(stateFilter);
           
      let response = {
        pincode : pincodeCnt,
        state : stateCnt,
      };
            
      return response;
    } else {
      return {  country : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCity = async (filter) =>{
  try {
    let city = await City.find(filter, { _id:1 });
    if (city.length){
      city = city.map((obj) => obj._id);

      const pincodeFilter = { '$or': [{                    cityId : { '$in' : city } }] };
      const pincodeCnt =  await Pincode.countDocuments(pincodeFilter);
           
      let response = { pincode : pincodeCnt, };
            
      return response;
    } else {
      return {  city : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPincode = async (filter) =>{
  try {
    const pincodeCnt =  await Pincode.countDocuments(filter);
    return { pincode : pincodeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countState = async (filter) =>{
  try {
    let state = await State.find(filter, { _id:1 });
    if (state.length){
      state = state.map((obj) => obj._id);

      const cityFilter = { '$or': [{                    stateId : { '$in' : state } }] };
      const cityCnt =  await City.countDocuments(cityFilter);

      const pincodeFilter = { '$or': [{                    stateId : { '$in' : state } }] };
      const pincodeCnt =  await Pincode.countDocuments(pincodeFilter);
           
      let response = {
        city : cityCnt,
        pincode : pincodeCnt,
      };
            
      return response;
    } else {
      return {  state : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countWallet = async (filter) =>{
  try {
    let wallet = await Wallet.find(filter, { _id:1 });
    if (wallet.length){
      wallet = wallet.map((obj) => obj._id);

      const walletTransactionFilter = { '$or': [{                    walletId : { '$in' : wallet } }] };
      const walletTransactionCnt =  await WalletTransaction.countDocuments(walletTransactionFilter);
           
      let response = { walletTransaction : walletTransactionCnt, };
            
      return response;
    } else {
      return {  wallet : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countWalletTransaction = async (filter) =>{
  try {
    const walletTransactionCnt =  await WalletTransaction.countDocuments(filter);
    return { walletTransaction : walletTransactionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countShipping = async (filter) =>{
  try {
    const shippingCnt =  await Shipping.countDocuments(filter);
    return { shipping : shippingCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const productFilter8569 = { 'sellerId': { '$in': user } };
      const product9664 = await softDeleteProduct(productFilter8569, updateBody);
      const bannerFilter1778 = { 'sellerId': { '$in': user } };
      const banner1028 = await softDeleteBanner(bannerFilter1778, updateBody);
      const walletFilter7227 = { 'userId': { '$in': user } };
      const wallet1747 = await softDeleteWallet(walletFilter7227, updateBody);
      const walletTransactionFilter6048 = { 'userId': { '$in': user } };
      const walletTransaction7010 = await softDeleteWalletTransaction(walletTransactionFilter6048, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProduct = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Product.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let category = await Category.find(filter, { _id:1 });
    if (category.length){
      category = category.map((obj) => obj._id);
      const productFilter5254 = { 'category': { '$in': category } };
      const product1531 = await softDeleteProduct(productFilter5254, updateBody);
      const productFilter7744 = { 'subCategory': { '$in': category } };
      const product1638 = await softDeleteProduct(productFilter7744, updateBody);
      const categoryFilter8139 = { 'parentCategoryId': { '$in': category } };
      const category0950 = await softDeleteCategory(categoryFilter8139, updateBody);
      return await Category.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No category found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Order.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBanner = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Banner.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCart = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Cart.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCountry = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let country = await Country.find(filter, { _id:1 });
    if (country.length){
      country = country.map((obj) => obj._id);
      const pincodeFilter8944 = { 'countryId': { '$in': country } };
      const pincode0146 = await softDeletePincode(pincodeFilter8944, updateBody);
      const stateFilter1822 = { 'countryId': { '$in': country } };
      const state6949 = await softDeleteState(stateFilter1822, updateBody);
      return await Country.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No country found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCity = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let city = await City.find(filter, { _id:1 });
    if (city.length){
      city = city.map((obj) => obj._id);
      const pincodeFilter8393 = { 'cityId': { '$in': city } };
      const pincode6683 = await softDeletePincode(pincodeFilter8393, updateBody);
      return await City.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No city found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePincode = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Pincode.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteState = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let state = await State.find(filter, { _id:1 });
    if (state.length){
      state = state.map((obj) => obj._id);
      const cityFilter7517 = { 'stateId': { '$in': state } };
      const city2544 = await softDeleteCity(cityFilter7517, updateBody);
      const pincodeFilter5332 = { 'stateId': { '$in': state } };
      const pincode2234 = await softDeletePincode(pincodeFilter5332, updateBody);
      return await State.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No state found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWallet = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let wallet = await Wallet.find(filter, { _id:1 });
    if (wallet.length){
      wallet = wallet.map((obj) => obj._id);
      const walletTransactionFilter8266 = { 'walletId': { '$in': wallet } };
      const walletTransaction9335 = await softDeleteWalletTransaction(walletTransactionFilter8266, updateBody);
      return await Wallet.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No wallet found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWalletTransaction = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await WalletTransaction.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteShipping = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Shipping.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteProduct,
  deleteCategory,
  deleteOrder,
  deleteBanner,
  deleteCart,
  deleteCountry,
  deleteCity,
  deletePincode,
  deleteState,
  deleteWallet,
  deleteWalletTransaction,
  deleteShipping,
  countUser,
  countProduct,
  countCategory,
  countOrder,
  countBanner,
  countCart,
  countCountry,
  countCity,
  countPincode,
  countState,
  countWallet,
  countWalletTransaction,
  countShipping,
  softDeleteUser,
  softDeleteProduct,
  softDeleteCategory,
  softDeleteOrder,
  softDeleteBanner,
  softDeleteCart,
  softDeleteCountry,
  softDeleteCity,
  softDeletePincode,
  softDeleteState,
  softDeleteWallet,
  softDeleteWalletTransaction,
  softDeleteShipping,
};

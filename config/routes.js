const express=require('express')
const router=express.Router();
const usersController =require('../app/controllers/usersController')
const productsController=require('../app/controllers/productsController')
const shoppingCartsController=require('../app/controllers/shoppingCartController')
const ordersController=require('../app/controllers/ordersController')
const ordersTrackingController=require('../app/controllers/orderTrackingController')
const featuredProductsController=require('../app/controllers/featuredProductsController')
const {authenticateUser} = require('../app/middelwares/authenticate')

//multer
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    //reject a file
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
  });
  

//user routes
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser,usersController.account)
router.delete('/users/logout', authenticateUser,usersController.logout)

//Products Routes
router.get('/products', authenticateUser,productsController.list)
router.get('/products/:id',authenticateUser, productsController.show)
router.post('/products', authenticateUser,upload.single('image'),productsController.create)
router.put('/products/:id', authenticateUser,upload.single('image'),productsController.update)
router.delete('/products/:id',authenticateUser, productsController.destroy)

//ShoppingCarts Routes
router.get('/carts', authenticateUser,shoppingCartsController.list)
router.get('/carts/:id',authenticateUser, shoppingCartsController.show)
router.post('/carts', authenticateUser,upload.single('image'),shoppingCartsController.create)
router.put('/carts/:id', authenticateUser,upload.single('image'),shoppingCartsController.update)
router.delete('/carts/:id',authenticateUser, shoppingCartsController.destroy)

//Orders Routes
router.get('/orders', authenticateUser,ordersController.list)
router.get('/orders/:id',authenticateUser, ordersController.show)
router.post('/orders', authenticateUser,upload.single('image'),ordersController.create)
router.put('/orders/:id', authenticateUser,upload.single('image'),ordersController.update)
router.delete('/orders/:id',authenticateUser, ordersController.destroy)

//OrdersTracking Routes
router.get('/ordersTracking', authenticateUser,ordersTrackingController.list)
router.get('/ordersTracking/:id',authenticateUser, ordersTrackingController.show)
router.post('/ordersTracking', authenticateUser,upload.single('image'),ordersTrackingController.create)
router.put('/ordersTracking/:id', authenticateUser,upload.single('image'),ordersTrackingController.update)
router.delete('/ordersTracking/:id',authenticateUser, ordersTrackingController.destroy)

//FeaturedProducts Routes
router.get('/ordersTracking', authenticateUser,featuredProductsController.list)
router.get('/ordersTracking/:id',authenticateUser, featuredProductsController.show)
router.post('/ordersTracking', authenticateUser,upload.single('image'),featuredProductsController.create)
router.put('/ordersTracking/:id', authenticateUser,upload.single('image'),featuredProductsController.update)
router.delete('/ordersTracking/:id',authenticateUser, featuredProductsController.destroy)

module.exports=router

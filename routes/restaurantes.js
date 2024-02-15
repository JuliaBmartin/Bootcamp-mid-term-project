var express = require('express');
var router = express.Router();
const restaurantesControllers = require('../controllers/restaurantesControllers');
const uploadImage = require('../middleware/multer');

//Los restaurantes
//localhost:3000/restaurantes
router.get('/', restaurantesControllers.showAllRestaurants);

//abre la pagina con el formulario de registro
//localhost:3000/restaurantes/registro
router.get('/registro', restaurantesControllers.restaurantRegister);

//ruta que recoje los datos del formulario
//localhost:3000/restaurantes/registro
router.post('/registro', uploadImage('restaurantes'), restaurantesControllers.createRestaurant);

//abre la pagina con info de un restaurante determinado con todos sus platos FACIL
//localhost:3000/restaurantes/oneRestaurant/:id
router.get('/oneRestaurant/:id', restaurantesControllers.viewOneRestaurant);

//abre el formulario de edición de un restaurante
//localhost:3000/restaurantes/editarRestaurante
/* router.get('/editarRestaurante/:id', restaurantesControllers.showEditRestaurant); */

//recoge los datos del formulario para guardarlos en la db
router.post('/editarRestaurante/:id', uploadImage('restaurantes'), restaurantesControllers.editRestaurant);

//Resetea la img
router.get('/resetImg/:id', restaurantesControllers.resetImg);

//abre el formulario de login de un restaurante
router.get('/login', restaurantesControllers.viewLogin);

//recoge la info del formulario de login
router.post('/login', restaurantesControllers.login);

//borrado logico
router.get('/deleteRestaurantLogic/:id', restaurantesControllers.delLogicRestaurant);

//borrado completo
router.get('/deleteRestaurant/:id', restaurantesControllers.deleteAll);



module.exports = router;

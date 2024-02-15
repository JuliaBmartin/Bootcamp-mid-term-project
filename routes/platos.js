var express = require('express');
var router = express.Router();
const uploadImage = require('../middleware/multer');
const platosControllers = require('../controllers/platosControllers');
const restaurantesControllers = require('../controllers/restaurantesControllers');

//localhost:3000/
router.get('/', platosControllers.showAllDishes);

//para ver un plato
router.get('/onePlate/:id', platosControllers.showOnePlate);

//abre form de creación de platos
/* router.get('/subirPlato/:id', platosControllers.viewCreateDish); */

//recoge los datos del plato
router.post('/subirPlato/:id', uploadImage("platos"), platosControllers.createDish);

//
router.get('/editarPlato/:id', platosControllers.showEditPlate);

//
router.post('/editarPlato/:id', uploadImage("platos"), platosControllers.editPlate);

//resetear img
router.get('/resetImg/:id', platosControllers.resetImg);

//borrado total de plato
router.get('/deletePlato/:id', platosControllers.totalDelete);

module.exports = router;
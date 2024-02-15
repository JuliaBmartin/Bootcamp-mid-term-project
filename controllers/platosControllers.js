const connection = require('../config/db');

class PlatosControllers {
  showAllDishes = (req, res) => {
    let sql = `SELECT * FROM dish WHERE dish_isdeleted = 0`;
    let sql_restaurant = `SELECT * FROM restaurant WHERE restaurant_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      connection.query(sql_restaurant, (err_restaurant, result_restaurant) => {
        if(err_restaurant) throw err_restaurant;
        res.render('allDishes', {result, result_restaurant});
      })
      
    })
  }


  showOnePlate = (req, res) => {
    let id = req.params.id;

    let sql = `SELECT * FROM dish WHERE dish_isdeleted = 0 AND  dish_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('onePlate', {result});
    })
  }


  //abre el formulario para subir un plato con el id del restaurante
/*   viewCreateDish = (req, res) => {
    let id = req.params.id;
    res.render('formPlate', {restaurant_id:id});
  } */


  //recoge los datos y los guarda en la db
  createDish = (req, res) => {
    let id = req.params.id;
    const {dish_name, price, description} = req.body;
    let sql = `INSERT INTO dish (dish_name, price, description, restaurant_id, dish_img) VALUES ("${dish_name}", ${price}, "${description}", "${id}", "plato.png")`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dish (dish_name, price, description, restaurant_id, dish_img) VALUES ("${dish_name}", ${price}, "${description}", "${id}", "${img}")`;
    }

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/restaurantes/oneRestaurant/${id}`);
    })
  }


  //abre la edición de un restaurante
  showEditPlate = (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} AND dish_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('editFormPlate', {result});
    })
  }


  //recoge y edita los datos de edición para la db
  editPlate = (req, res) => {
    let id = req.params.id;
    const {dish_name, price, description, dish_img} = req.body;
    let sql = `UPDATE dish SET dish_name = "${dish_name}", price = "${price}", description = "${description}" WHERE dish_id = ${id}`;

    if(req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE dish SET dish_name = "${dish_name}", price = "${price}", description = "${description}", dish_img = "${img}" WHERE dish_id = ${id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/platos/onePlate/${id}`)
    })
  }


   //Resetea la img
   resetImg = (req, res) => {
    let id = req.params.id;
    let sql = `UPDATE dish SET dish_img = "plato.png" WHERE dish_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/platos/onePlate/${id}`)
    })
  }


  //borra totalmente un plato
  totalDelete = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM dish WHERE dish_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/restaurantes`)
    })
  }

}

module.exports = new PlatosControllers;
const bcrypt = require("bcrypt");
const connection = require("../config/db");

class RestaurantesControllers {
  //vista de todos los restaurantes
  showAllRestaurants = (req, res) => {
    let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0";

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("allRestaurants", { result });
    });
  };


  //vista del formulario register
  restaurantRegister = (req, res) => {
    res.render("registerForm");
  };


  //recoge los datos del formulario registro y crea un restaurante en la base de datos
  createRestaurant = (req, res) => {
    const {
      restaurant_name,
      style,
      email,
      information,
      phone_number,
      password,
      password2,
    } = req.body;

    //validación para que todos los campos se rellenen
    if (
      restaurant_name === "" ||
      style === "" ||
      email === "" ||
      information === "" ||
      phone_number === "" ||
      password === ""
    ) {
      return res.render("registerForm", {
        message: "Por favor, rellene todos los datos",
      });
    }

    //validación de contraseñas
    if (password !== password2) {
      return res.render("registerForm", {
        message: "Las contraseñas debe coincidir",
      });
    }

    //encriptar contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO restaurant (restaurant_name, style, email, information, phone_number, password, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${information}", "${phone_number}", "${hash}", "user.png")`;

      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (restaurant_name, style, email, information, phone_number, password, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${information}", "${phone_number}", "${hash}", "${img}")`;
      }

      connection.query(sql, (err, result) => {
        //Validación de que el nuevo email no coincida con ninguno ya creado en la bs
        if (err) {
          if (err.errno == 1062) {
            return res.render("registerForm", {
              message: "Este email ya está en uso",
            });
          } else {
            throw err;
          }
        }
        res.redirect('/restaurantes');
      });
    });
  };


  //metodo facil de poco rendimiento para ver un restaurante
  viewOneRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant.restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    let sql_dish = `SELECT * FROM dish WHERE restaurant_id = ${id} AND dish_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      connection.query(sql_dish, (err_dish, result_dish) => {
        if(err_dish) throw err_dish;
        res.render('oneRestaurant', {result, result_dish})
      })
    })
  }


  //abre la edición de un restaurante
  showEditRestaurant = (req, res) => {
    let id = req.params.id
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.render('editFormRestaurant', {result});
    })
  }


  //recoge y edita los datos de edición para la db
  editRestaurant = (req, res) => {
    let id = req.params.id;
    const {restaurant_name, style, information, phone_number, restaurant_img} = req.body;
    let sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", information = "${information}", phone_number = "${phone_number}" WHERE restaurant_id = ${id}`;

    if(req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", information = "${information}", phone_number = "${phone_number}", restaurant_img = "${img}" WHERE restaurant_id = ${id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurantes/oneRestaurant/${id}`)
    })
  }


  //Resetea la img
  resetImg = (req, res) => {
    let id = req.params.id;
    let sql = `UPDATE restaurant SET restaurant_img = "user.png" WHERE restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/restaurantes/oneRestaurant/${id}`)
    })
  }


  //abre el formulario de login de un restaurante
  viewLogin = (req, res) => {
    res.render('formLogin')
  }


  //recoge la info de login
  login = (req, res) => {
    const {email, password} = req.body;

    //confirmar si el restaurante está en la db
    let sql = `SELECT * FROM restaurant WHERE email = "${email}"`;
    
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if(result.length == 1) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (err) throw err;
          if(resultCompare) {
            res.redirect(`/restaurantes/oneRestaurant/${result[0].restaurant_id}`)
          }else{
            res.render('formLogin', {message: 'password incorrecta'})
          }
        })
      }else{
        return res.render('formLogin', {message: 'Este email no está registrado'})
      }
    })
  }


  //borrado logico
  delLogicRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `UPDATE restaurant LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id SET restaurant.restaurant_isdeleted = 1, dish.dish_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect('/restaurantes');
    })
  }


  //borrado completo
  deleteAll = (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM restaurant WHERE restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect('/restaurantes');
    })
  }
}

module.exports = new RestaurantesControllers();

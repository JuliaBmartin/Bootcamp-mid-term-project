const connection = require("../config/db");

class IndexControllers {
  /*   viewHome = (req, res) => {
    res.render('index');
  } */

  viewHome = (req, res) => {
    let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0";

    let sql_dish = "SELECT * FROM dish WHERE dish_isdeleted = 0";

    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.query(sql_dish, (err_dish, result_dish) => {
        if (err_dish) throw err_dish;
        console.log(result)
        console.log(result_dish);
        res.render("index", { result, result_dish });
      });
    });
  };

  viewAbout = (req, res) => {
    res.render("about");
  };

  viewContact = (req, res) => {
    res.render("contacto");
  };
}

module.exports = new IndexControllers();

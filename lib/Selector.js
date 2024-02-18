class Selector {
  constructor() {

  }
  selectAll(input) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${input};`, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  selectCol(table, col) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT ${col} FROM ${table};`, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  
  selectColWhere(table, col, where) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT ${col} FROM ${table} WHERE ${where};`, (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}



module.exports = Selector;
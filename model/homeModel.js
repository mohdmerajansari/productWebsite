const db = require('../Utils/databaseUtil')

module.exports = class Home {
  constructor(proName,proPrice,proLocation,proRating,proPic,id){
    this.proName = proName;
    this.proPrice = proPrice;
    this.proLocation = proLocation;
    this.proRating = proRating;
    this.proPic = proPic;
    this.id = id;
  }
  save(){
    if(this.id){
      return db.execute('UPDATE products SET proName=?, proPrice=?, proLocation=?, proRating=?, proPic=? WHERE id=?',[this.proName, this.proPrice, this.proLocation, this.proRating, this.proPic, this.id]);
    }else{
      return db.execute('INSERT INTO products(proName, proPrice, proLocation, proRating, proPic) VALUES(?,?,?,?,?)',[this.proName, this.proPrice, this.proLocation, this.proRating, this.proPic])
    }
  }
  static fetchAll() {
    
  return db.execute('SELECT * FROM products');

  }
  static findById(proId){
    return db.execute('SELECT * FROM products WHERE id=?',[proId])
  }
  static deleteById(proId){
    return db.execute('DELETE FROM products WHERE id=?',[proId])
  }
}
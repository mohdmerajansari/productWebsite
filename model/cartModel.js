const db = require('../Utils/databaseUtil')

module.exports = class cart {
  constructor(cid){
   
    this.cid = cid;
  }

  static addToCart(id){
   return db.execute('INSERT INTO cart (cid) VALUES(?)',[id])
  }
  
  static fetchAll() {
  return db.execute('select * from products right join cart on products.id=cart.cid');
  }

  
  static removeFromCart(id){
    return db.execute('DELETE FROM cart WHERE cid=?',[id])
  }
}
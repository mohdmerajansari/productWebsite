const db = require('../Utils/databaseUtil')

module.exports = class wishlist {
  constructor(tid){
    this.tid = tid;
   }

  static addToWishlist(id) {
    return db.execute(
      'INSERT INTO  wishlist (wid) VALUES (?)',
      [id]
    );
  }

  static fetchAll() {
    return db.execute('select * from products right join wishlist on products.id=wishlist.wid');
  }

  static deleteFromWishlist(id){
    return db.execute('DELETE FROM wishlist WHERE wid=?',[id])
  }

}
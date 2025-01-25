const express = require('express');
const Home = require('../model/homeModel')
const cart = require('../model/cartModel')
const wishlist = require('../model/wishlistModel');


exports.getHomes = (req, res, next) => {
Home.fetchAll().then(([registeredProducts]) => {
  res.render('../views/index',{registeredProducts : registeredProducts, currentPage : 'home', pageTitle : 'Products Home'})
}).catch(err => {
  console(err)
})

}

exports.getAddProducts = (req, res, next) => {
  res.render('../views/edit-products',{editing : false,currentPage : 'add-product', pageTitle : 'Add products'})
}

exports.postAddProducts = (req, res, next) => {
  const {proName, proPrice, proLocation, proRating, proPic}  = req.body;
  const home = new Home(proName, proPrice, proLocation, proRating, proPic)
  home.save()
  res.render('../views/add-success',{currentPage : 'add-product', pageTitle : 'Add products'})
}

exports.getVendorList = (req, res, next) => {
  Home.fetchAll().then(([registeredProducts]) => {
    res.render('../views/vendor-list',{registeredProducts : registeredProducts, currentPage : 'vendor-list', pageTitle : 'Vendor List'})
  }).catch(err => {
    console(err)
  })
  
  }

  
exports.getEditProducts = (req, res, next) => {
  const proId = req.params.proId;
  const editing  = req.query.editing === 'true';
  console.log(proId,editing);
  Home.findById(proId).then(([products]) => {
    const product = products[0];
    if(!product){
      return res.redirect("/");
    }
    console.log(proId, editing, product);
    res.render('../views/edit-products',{editing: editing, product : product, proId : proId, currentPage:'vendor-list', pageTitle:'Edit product'})
  })
}


exports.postEditProducts = (req, res, next) => {
  const {id,proName, proPrice, proLocation, proRating, proPic}  = req.body;
  const home = new Home( proName, proPrice, proLocation, proRating, proPic,id)
  home.save().then(result =>{
    console.log(result);
    res.redirect('/vendor-list')
  }).catch(err =>{
    console.log('Error while editing',err);
  })
 
}

exports.postDeleteProduct = (req, res, next) =>{
  const proId = req.params.proId;
  Home.deleteById(proId).then(() =>{
      res.redirect('/vendor-list')
    }
  ).catch(err =>{
    console.log('Error while deleting',err)
  })

}

exports.getWishlist = (req, res, next) => {
  wishlist.fetchAll().then(([wishlistPage]) => {
      res.render('../views/wishlist-page',{wishlistPage : wishlistPage, currentPage : 'wishlist', pageTitle : 'Wishlist Page'})
  }).catch(err => {
      console.log(err)
  })
    
}


exports.postWishlist = (req, res, next) => {
  const wid = req.params.proId;
  
  wishlist.addToWishlist(wid)
    .then(result => {
      console.log('Product added to wishlist');
      res.redirect('/wishlist');
    })
    .catch(err => {
      console.log('Error adding to wishlist:', err);
      res.status(500).redirect('/');
    });
};

exports.postRemoveFromWishlist = (req, res, next) =>{
  const proId = req.params.proId;
  console.log(proId);
  wishlist.deleteFromWishlist(proId).then(() => {
    res.redirect("/wishlist")
  }).catch(err =>{
    console.log('Not deleted', err)
  })
}

exports.getCart = (req, res, next) => {
  cart.fetchAll().then(([cartProducts]) => {
    res.render("../views/cart-page",{cartProducts : cartProducts, currentPage : 'cart', pageTitle : 'Cart Page'})
  }).catch(err =>{
    console.log('Error while loading cart',err);
  })
}

exports.postCart = (req, res, next) =>{
  const cid = req.params.proId;

  cart.addToCart(cid).then(() =>{
    console.log('Product added to cart')
    res.redirect('/cart');
  }).catch(err =>{
    console.log('Error adding to cart',err)
    res.status(500).redirect('/');
  })
}

exports.postRemoveFromCart = (req, res, next) => {
  const cid = req.params.proId;
  cart.removeFromCart(cid).then(() =>{
    console.log('Removed from cart :',cid)
    res.redirect('/cart');
  }).catch(err =>{
    console.log('Error removing from cart',err)
  })
}
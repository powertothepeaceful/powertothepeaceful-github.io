$('.single-item').slick({
	autoplay: true,
	autoplaySpeed: 2000,
	dots:true,
	arrows: false,

});


var ShoppingCart = (function($) {
  "use strict";
  
  // Cahce necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
  	  productsEl2 = document.querySelector(".products2"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");
  
  // Fake JSON data array here should be API call
  var products = [
    {
      id: 0,
      name: "ring1",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring1.jpg",
      price: 799
    },
    {
      id: 1,
      name: "ring2",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring2.jpg",
      price: 349,
    },
    {
      id: 2,
      name: "ring3",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring3.jpg",
      price: 1499
    },
    {
      id: 3,
      name: "ring4",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring4.jpg",
      price: 999
    },
    {
      id: 4,
      name: "ring5",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring5.jpg",
      price: 599
    },
    {
      id: 5,
      name: "ring6",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring6.jpg",
      price: 499
    },
    {
         id: 6,
      name: "ring6",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring6.jpg",
      price: 499
    }


 	
  ],
      productsInCart = [];
  
  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)
  var generateProductList = function() {
    products.forEach(function(item) {
      var productEl = document.createElement("div");
      productEl.className = "col-sm-6 col-md-4 products";
	  productEl.innerHTML = `<div class="product-image">
	                             <img src="${item.imageUrl}" alt="${item.name}">
	                         </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
	                         `;// <a href="#0" class="button see-more">More Details</a>
                             
productsEl.appendChild(productEl);
    });
  }

	// PRODUCTS 2 //

  // Fake JSON data array here should be API call
  var products2 = [
    {
      id: 0,
      name: "ring1",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring1.jpg",
      price: 799
    },
    {
      id: 1,
      name: "ring2",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring2.jpg",
      price: 349,
    },
    {
      id: 2,
      name: "ring3",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring3.jpg",
      price: 1499
    },
    {
      id: 3,
      name: "ring4",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring4.jpg",
      price: 999
    },
    {
      id: 4,
      name: "ring5",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring5.jpg",
      price: 599
    },
    {
      id: 5,
      name: "ring6",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring6.jpg",
      price: 499
    },
    {
         id: 6,
      name: "ring6",
      description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
      imageUrl: "images/ring6.jpg",
      price: 499
    }


 	
  ],
      productsInCart = [];
  
  // Pretty much self explanatory function. NOTE: Here I have used template strings (ES6 Feature)
  var generateProduct2List = function() {
    products2.forEach(function(item) {
      var productEl2e = document.createElement("div");
      productEl2e.className = "col-sm-6 col-md-4 products2";
	  productEl2e.innerHTML = `<div class="product-image">
	                             <img src="${item.imageUrl}" alt="${item.name}">
	                         </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
	                         `;
                             
productsEl2.appendChild(productEl2e);
    });
  }



  
  // Like one before and I have also used ES6 template strings
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
    
    productsInCart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });
    
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {

	    productsEl.addEventListener("click", function(event) {
	      var el = event.target;
	      if(el.classList.contains("add-to-cart")) {
	       var elId = el.dataset.id;
	       addToCart(elId);
	      }
	  	});

	    productsEl2.addEventListener("click", function(event) {
	      var el = event.target;
	      if(el.classList.contains("add-to-cart")) {
	       var elId = el.dataset.id;
	       addToCart(elId);
	      }
	  	});


    
    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    generateProduct2List();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
  // I have included jQuery although I haven't used it
})(jQuery);

ShoppingCart.init();
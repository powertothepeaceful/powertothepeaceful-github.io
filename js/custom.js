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
      name: "Warrior Ring",
      description: "This ring features a warrior pattern to keep your soul strong in the world.",
      imageUrl: "images/ring1.jpg",
      price: 80
    },
    {
      id: 1,
      name: "Warrior Duo Set",
      description: "Two rings are always better than one and will double your inner strength.",
      imageUrl: "images/ring2.jpg",
      price: 90,
    },
    {
      id: 2,
      name: "Open Ring",
      description: "This ring enhances unconditional love, unity and of course friendship.",
      imageUrl: "images/ring3.jpg",
      price: 45
    },
    {
      id: 3,
      name: "Courage Ring",
      description: "This ring features a stone of courage. Its calming energies reduce stress and quiet the mind.",
      imageUrl: "images/ring4.jpg",
      price: 165
    },
    {
      id: 4,
      name: "Love Ring",
      description: "This ring stimulates the heart chakra and has a healing effect on the emotions of the heart.",
      imageUrl: "images/ring5.jpg",
      price: 180
    },
    {
      id: 5,
      name: "Open Soul Ring",
      description: "This ring is used to enhance spiritual communication blocks and can assist in aligning the chakras.",
      imageUrl: "images/ring6.jpg",
      price: 195
    },
  


 	
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
                             <div class="product-name"><span></span> ${item.name}</div>
                             <div class="product-description"><span></span> ${item.description}</div>
                             <div class="product-price"><span>$</span>${item.price}</div>
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
      name: "Eagle of Justice",
      description: "The Eagle will keep you safe and will help you forge your own path in the world.",
      imageUrl: "images/pendant1.jpg",
      price: 85
    },
    {
      id: 1,
      name: "Love Letter Pendant",
      description: "This pendant has the ability to draw love into your life. It akso strengthens your intuition.",
      imageUrl: "images/pendant2.jpg",
      price: 75,
    },
    {
      id: 2,
      name: "Anchor of Your Soul Pendant",
      description: "This is an anchor of serenity. It is calming and soothing and can be used to heal ailments.",
      imageUrl: "images/pendant3.jpg",
      price: 120
    },


 	
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
                             <div class="product-name"><span></span> ${item.name}</div>
                             <div class="product-description"><span></span> ${item.description}</div>
                             <div class="product-price"><span>$</span>${item.price}</div>
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
      li.innerHTML = `${item.quantity} ${item.product.name}: $${item.product.price * item.quantity}`;
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




var isOpened = true;

$(".tab").click(function(){
  console.log("test");
  if (isOpened == true){
    $(".shopping-cart").addClass("shopping-cart-closed");
    isOpened = false;
  }else if (isOpened == false){
    $(".shopping-cart").removeClass("shopping-cart-closed");
    isOpened = true;
  }
});


$('#monitor').html($(window).width());

    $(window).resize(function() {
    var viewportWidth = $(window).width();
$('#monitor').html(viewportWidth);
});
var myTimeline = new TimelineMax();

myTimeline
.staggerFrom('h1', 1, {opacity:0, transform:"TranslateX(200px)", ease: Sine.easeOut }, 1)
.to('h1', 0.6, {color:'white'}, '-=0.6')
;




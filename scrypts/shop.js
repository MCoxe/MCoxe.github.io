const products = {
  product_1: {
    name: "Ilha de Luanda Tour, Angola",
    price: 500,
    description: "Ilha de luanda is actually a peninsula, not an island, and is connected to the mainland by a bridge loaded with chic clubs and restaurants designed for those who want to see and be seen, and also to spend. Many serve fresh seafood and offer outdoor seating by the water. If your schedule allows, come here to catch the sunset over the Atlantic",
    image: "images/ilha.jpg"
  },
  product_2: {
    name: "Lubango - Namibe Tour, Angola",
    price: 1200,
    description: "Widen your perspective of of Angola on this 6-day tour to Lubango and Namibe, with round-trip transportation from Luanda and five night’s accommodation included for a hassle-free trip. Receive personalized attention from your small-group guide as you tick off several must-see...",
    image: "images/lubango.jpg"
  },
  product_3: {
    name: "Kissama National Park Overnight Tour from Luanda",
    price: 1300,
    description: "The Kissama National Park is Angola’s most important wildlife reserve, just two hours south of Luanda, and home to elephants, wildebeest, giraffes, and zebras. This overnight tour lets you experience the park away from the crowds—watch the sunset from Moon Viewpoint, cruise along Kalandula River, visit Kalandula Falls, and spend a night at the Kawa Camp.",
    image: "images/Kissama.jpg"
  },
  product_4: {
    name: "Mussulo Tour, Angola",
    price: 200,
    description: "Mussulo is a good place to get away from the city. The beach is great, the water is warm and it is relaxing. Some people have quad bikes and boats, so there is plenty to do there. Its great to go with a group of friends or with the family.",
    image: "images/musulo.jpg"
  },
  product_5: {
    name: "Luanda SightSeeing Tour",
    price: 140.99,
    description: "Get the lay of the land and learn a little Angolan history on this full-day tour of Luanda, ideal for first-time or solo travellers in the capital. Hotel pickup and drop-off ensures a hassle-free day of city exploration, while the small-group tour size allows for a more intimate glimpse of landmarks such as the Fortress of São Miguel, statue of Ana de Sousa, and Luanda Cathedral.",
    image: "images/luandasite.jpg"
  },

  product_6: {
    name: "Calandula Falls Tour",
    price: 800,
    description: "Come and have the amazing opportunity to see the Kalandula Falls. The falls are considered one of the largest waterfalls by volume in Africa. This major waterfall is powerful and impressive since it's surrounded by scenic landscapes to match, great grasslands, and spanning savannas. These falls are truly a hidden treasure that see little guest visits compared to Zim-Zam's Victoria Falls, so be part of it and discover it for yourself!",
    image: "images/Calandula.jpg"
  }
};


// Our product catalog element
const catalog = document.getElementById('catalog');
// Our cart elements
const cartWrapper = document.getElementById('cart');
const itemsWrapper = document.getElementById('cart__itemsWrapper');
const totalPrice = document.getElementById('cart__totalText');
const cartButton = document.getElementById('cart__buy');
// Our modal elements
const checkoutModal = document.getElementById('checkout_modal');
const checkoutContent = document.getElementById('checkout_content');
const checkoutTotal = document.getElementById('checkout_total');
// Checkout form
const checkoutForm = document.getElementById('checkoutForm');
// Receipt
const receipt = document.getElementById('receipt');
const receipt_fullName  = document.getElementById('receipt_fullName');
const receipt_email = document.getElementById('receipt_email');
const receipt_street = document.getElementById('receipt_street');
const receipt_city = document.getElementById('receipt_city');
const receipt_state = document.getElementById('receipt_state');
const receipt_zip = document.getElementById('receipt_zip');

// Item display locations
const updateLocations = {
  // prefix : parentWrapper
  'cart': itemsWrapper,
  'checkout': checkoutContent
};



var cart = {
  total: 0,
  items: {
    // Will be dynamically added/removed
    // product_1: products.product_1,
    // product_3: products.product_3
  },
  calc: function() {
    // Reset the total to 0
    cart.total = 0;

    // For each item in the cart
    for(let item in cart.items) {
      // Use 'item' (product_1, product_2, etc...) as key to get the quantity
      let quantity = cart.items[item].quantity;

      // Use 'item' as key to get the item price
      let price = cart.items[item].price;

      // Create the "subtotal" property, equal to quantity * price
      cart.items[item]["subtotal"] = quantity * price;

      // Add subtotal for this item to the total
      cart.total += cart.items[item].subtotal;
    }

    Cookies.set('cart', cart, { expires: 7 } );
  },
  update: function() {
    // For each prefix in the updateLocations object
    for(let prefix in updateLocations) {
      // Get the value
      let parent = updateLocations[prefix];

      // Clear any item HTML
      parent.innerHTML = "";

      // If all required elements exist
      if(cartWrapper && itemsWrapper && totalPrice && parent) {

        // For each item in the cart
        for(let item in cart.items) {
          let name = cart.items[item].name;
          let price = cart.items[item].price;
          let quantity = cart.items[item].quantity;
          let subtotal = cart.items[item].subtotal.toFixed(2);

          // Build item element
          let itemInfo = `
            <div id=${prefix}_${item} class="cart__itemWrapper">
              <div class="cart__itemInfo">
                <div class="cart__itemColumn cart__itemColumn--nameWrapper">
                  <p class="cart__itemName">${name} ($${price})</p>
                  <p id="${prefix}_${item}_remove" class="cart__removeItem button" role="button">Remove Item</p>
                </div>
                <p class="cart__itemColumn cart__itemColumn--quantity">${quantity}</p>
                <p class="cart__itemColumn cart__itemColumn--subtotal">${subtotal}</p>
              </div>
            </div>
          `;

          parent.insertAdjacentHTML('beforeend', itemInfo);

          // Add click event listener to each "Remove Item" text
          document.getElementById(`${prefix}_${item}_remove`).addEventListener('click', function(event) {
            // Call the 'remove' method of our 'cart' object, passing the 'item' ID as a parameter
            cart.remove(item);
          });
        }

        let totalCost = cart.total.toFixed(2);

        // Update cart total
        totalPrice.textContent = `$${totalCost}`;

        // Update checkout total
        checkoutTotal.textContent = `$${totalCost}`;
      }
    }
  },
  remove: function(item) {
    // Use the 'delete' operator to remove the 'item' property (if it exists) from our 'items' object
    delete cart.items[item];

    // Update our cart 'total' property
    cart.calc();

    // Update our cart HTML to match the new 'cart' object
    cart.update();
    cart.update('checkout', checkoutContent);
  }
};

if(Cookies.getJSON('cart')) {
  cart.items = Cookies.getJSON('cart').items;
  cart.calc();
  cart.update();
}
//<p class="product__price product__text"><strong>Price</strong></p>
if(catalog) {
  for(let key in products) {

    let product = `
      <div id=${key} class="product">
        
        <div class="product__image-Wrapper">
           <img class="product__image" src=${products[key].image}>
        
        </div>

        <div class="product__details">

            

            <div class="product__detailsWrapper">
              
             

              <div class="product__nameWrapper">
              <p class="product__name product__text">${products[key].name}</p>
              </div>

              <p class="product__description product__text">${products[key].description}</p>
            
            </div> 

            <div class="product__quantityWrapper">
              <p class="product__text"><strong>Quantity</strong></p>
              <input id="${key}_quantity" class="product__quantity" type="number" min="1" max="10" step="1" placeholder="" value="1" required>
              <p id="${key}_add" class="product__addToCart product__text" role="button"><i class="fas fa-shopping-cart icon"></i>Add to Cart</p>
            </div>

            <div class="product__priceWrapper">
              
              <p class="product__price product__text">$${products[key].price}</p>
            </div>

        </div>

      </div>
    `;

    catalog.insertAdjacentHTML('beforeend', product);

    document.getElementById(`${key}_add`).addEventListener('click', function(event) {
      // Get quantity value, converted from string to a number
      let quantity = Number(document.getElementById(`${key}_quantity`).value);

      // Item is already in cart
      if(cart.items[key]) {

        // If the 'quantity' property already exists
        if(cart.items[key].quantity) {
          // Add the field quantity to the current quantity
          cart.items[key].quantity += quantity;
        }
        // The 'quantity' property does not exist yet
        else {
          // Create the 'quantity' property, set it equal to the field quantity
          cart.items[key]["quantity"] = quantity;
        }
      }
      // Item is not in cart yet
      else {
        // Add the 'product_#' item in cart.items,
        // set it equal to the 'products.product_#' object
        cart.items[key] = products[key];

        // Create the 'quantity' property, set it equal to the field quantity
        cart.items[key]["quantity"] = quantity;
      }

      // If the subtotal property does not exist yet
      if(!cart.items[key].subtotal) {
        // Create the 'subtotal' property to be used for calculations later
        cart.items[key]["subtotal"] = 0;
      }

      cart.calc();
      cart.update();
    }); // End of event listener
  }
}



if(cartButton && checkoutModal && checkoutContent) {
  let closeButton = checkoutModal.querySelector('.modal__close');

  cartButton.addEventListener('click', function(event) {
    if(!checkoutModal.classList.contains('--reveal')) {
      checkoutModal.classList.add('--reveal');
    }

    // If buy now button is clicked, show the "Remove item" text again
    if(checkoutModal.classList.contains('--transactionCompleted')) {
      checkoutModal.classList.remove('--transactionCompleted');
    }

    // Hide receipt section
    if(receipt.classList.contains('--show')) {
      receipt.classList.remove('--show');
      receipt.classList.add('--hide');
    }

    // Show checkout form
    if(checkoutForm.classList.contains('--hide')) {
      checkoutForm.classList.add('--show');
      checkoutForm.classList.remove('--hide');
    }

    // If close button exists within this modal
      if(closeButton) {
        // Add click event listener to close button
        closeButton.addEventListener('click', function(event) {

          // If the modal has the --reveal class
          if(checkoutModal.classList.contains('--reveal')) {
            // Remove it (hides the modal)
            checkoutModal.classList.remove('--reveal');
          }
        });
      }
  });
}



if(checkoutForm) {
  checkoutForm.addEventListener('submit', function(event) {
    // Prevent instant submission of form
    event.preventDefault();

    // If at least one item is in the cart and the rest of the form is valid
    if(Object.keys(cart.items).length > 0 && checkoutForm.checkValidity()) {
      // Hide checkout form
      checkoutForm.classList.add('--hide');

      if(receipt && receipt.classList.contains('--hide')
        && receipt_fullName && receipt_email && receipt_street && receipt_city && receipt_state && receipt_zip) {
        // Remove --hide class, add --show class
        receipt.classList.remove('--hide');
        receipt.classList.add('--show');

        // Add class we can use to override styles and hide the "Remove Item" text displayed in receipt
        checkoutModal.classList.add('--transactionCompleted');

        // Set the different information elements equal to their form equivalent values
        receipt_fullName.innerHTML = `<strong>Name:</strong> ${checkoutForm.fullName.value}`;
        receipt_email.innerHTML = `<strong>Email:</strong> ${checkoutForm.email.value}`;
        receipt_street.innerHTML = `<strong>Street:</strong> ${checkoutForm.street.value}`;
        receipt_city.innerHTML = `<strong>City:</strong> ${checkoutForm.city.value}`;
        receipt_state.innerHTML = `<strong>State:</strong> ${checkoutForm.state.value}`;
        receipt_zip.innerHTML = `<strong>Zip:</strong> ${checkoutForm.zip.value}`;
      }
    }
    else {
      alert("You need at least one item in your cart to make a purchase!");
      // If the modal has the --reveal class
      if(checkoutModal.classList.contains('--reveal')) {
        // Remove it (hides the modal)
        checkoutModal.classList.remove('--reveal');
      }
    }
  });
}
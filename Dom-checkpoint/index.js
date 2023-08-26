if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var addButtons = document.querySelectorAll('.button-item.add-to-cart');
    for (var i = 0; i < addButtons.length; i++) {
        var addButton = addButtons[i];
        addButton.addEventListener('click', addToCart);
    }

    var buttonDeleteItems = document.getElementsByClassName('btn-eliminate');
    for (var i = 0; i < buttonDeleteItems.length; i++) {
        var button = buttonDeleteItems[i];
        button.addEventListener('click', deleteItemCart);
    }

    var addAmountButtons = document.querySelectorAll('.add-amount');
    var restartCartButtons = document.querySelectorAll('.restart-cart');

    for (var i = 0; i < addAmountButtons.length; i++) {
        addAmountButtons[i].addEventListener('click', increaseQuantity);
        restartCartButtons[i].addEventListener('click', decreaseQuantity);
    }

    updateTotal();
    hideCartIfEmpty();
}

function addToCart(event) {
    var addButton = event.currentTarget;
    var item = addButton.parentElement;
    var title = item.querySelector('.items-title').textContent;
    var price = item.querySelector('.price-item').textContent;
    var imageSrc = item.querySelector('img').src;

    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    var cartItemImage = document.createElement('img');
    cartItemImage.src = imageSrc;

    var cartItemDetails = document.createElement('div');
    cartItemDetails.classList.add('cart-item-details');

    var cartItemTitle = document.createElement('span');
    cartItemTitle.classList.add('cart-item-title');
    cartItemTitle.textContent = title;

    var quantitySelector = document.createElement('div');
    quantitySelector.classList.add('quantity-selector');

    var minusButton = document.createElement('i');
    minusButton.classList.add('fa-solid', 'fa-minus', 'restart-cart');

    var quantityInput = document.createElement('input');
    quantityInput.type = 'text';
    quantityInput.value = '1';
    quantityInput.classList.add('cart-item-quantity');
    quantityInput.disabled = true;

    var plusButton = document.createElement('i');
    plusButton.classList.add('fa-solid', 'fa-plus', 'add-amount');

    var cartItemPrice = document.createElement('span');
    cartItemPrice.classList.add('cart-item-price');
    cartItemPrice.textContent = price;

    var eliminateButton = document.createElement('span');
    eliminateButton.classList.add('btn-eliminate');

    var trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash');

    trashIcon.addEventListener('click', function() {
        cartItem.remove();
        updateTotal();
        hideCartIfEmpty();
    });

    cartItemDetails.appendChild(cartItemTitle);
    quantitySelector.appendChild(minusButton);
    quantitySelector.appendChild(quantityInput);
    quantitySelector.appendChild(plusButton);
    cartItemDetails.appendChild(quantitySelector);
    cartItemDetails.appendChild(cartItemPrice);
    eliminateButton.appendChild(trashIcon);

    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemDetails);
    cartItem.appendChild(eliminateButton);

    var cart = document.querySelector('.cart-items');
    cart.appendChild(cartItem);

    minusButton.addEventListener('click', decreaseQuantity);
    plusButton.addEventListener('click', increaseQuantity);
    trashIcon.addEventListener('click', deleteItemCart);

    updateTotal();
    hideCartIfEmpty();
}

function deleteItemCart(event) {
    var buttonClicked = event.currentTarget;
    buttonClicked.parentElement.remove();
    updateTotal();
    hideCartIfEmpty();
}

function increaseQuantity(event) {
    var plusButton = event.currentTarget;
    var quantityElement = plusButton.parentElement.querySelector('.cart-item-quantity');
    var currentQuantity = parseInt(quantityElement.value);
    quantityElement.value = currentQuantity + 1;
    updateTotal();
}

function decreaseQuantity(event) {
    var minusButton = event.currentTarget;
    var quantityElement = minusButton.parentElement.querySelector('.cart-item-quantity');
    var currentQuantity = parseInt(quantityElement.value);
    if (currentQuantity > 1) {
        quantityElement.value = currentQuantity - 1;
        updateTotal();
    }
}

function updateTotal() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.querySelector('.cart-item-price');
        var quantityElement = cartItem.querySelector('.cart-item-quantity');

        var price = parseFloat(priceElement.textContent.replace('$', ''));
        var quantity = parseInt(quantityElement.value);

        total += price * quantity;
    }

    var totalElement = document.querySelector('.cart-price-total');
    totalElement.textContent = '$' + total.toFixed(2);

    hideCartIfEmpty();
}

function hideCartIfEmpty() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var quantityElement = cartItem.querySelector('.cart-item-quantity');
        var priceElement = cartItem.querySelector('.cart-item-price');

        var quantity = parseInt(quantityElement.value);
        var price = parseFloat(priceElement.textContent.replace('$', ''));

        total += price * quantity;
    }

    var cart = document.querySelector('.cart');

    if (total === 0 || cartItems.length === 0) {
        cart.style.display = 'none';
    } else {
        cart.style.display = 'block';
    }
}

// Assuming you have a function to handle the Pay button click event
function handlePayButtonClick() {
    // Get the cart items
    var cartItems = document.querySelectorAll('.cart-items');
    
    // Get the total price
    var totalElement = document.querySelector('.cart-price-total');
    var total = totalElement.textContent;

    // Display the receipt modal
    var receiptModal = document.querySelector('.receipt-modal');
    var receiptItems = document.querySelector('.receipt-items');
    var receiptTotal = document.querySelector('.receipt-total');

    // Clear existing receipt items
    receiptItems.innerHTML = '';

    // Add each cart item to the receipt
    cartItems.forEach(function(cartItem) {
        var itemTitle = cartItem.querySelector('.cart-item-title').textContent;
        var itemQuantity = cartItem.querySelector('.cart-item-quantity').value;
        var itemPrice = cartItem.querySelector('.cart-item-price').textContent;

        var receiptItem = document.createElement('p');
        receiptItem.textContent = `${itemTitle} x ${itemQuantity} = ${itemPrice}`;
        receiptItems.appendChild(receiptItem);
    });

    // Display the total in the receipt
    receiptTotal.textContent = total;

    // Show the receipt modal
    receiptModal.style.display = 'block';
}

// Assuming you have a button with class "btn-pay"
var payButton = document.querySelector('.btn-pay');
payButton.addEventListener('click', handlePayButtonClick);

// Close the receipt modal when the close button is clicked
var closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', function() {
    var receiptModal = document.querySelector('.receipt-modal');
    receiptModal.style.display = 'none';
});

var likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(function(likeButton) {
    likeButton.addEventListener('click', function(event) {
        var button = event.currentTarget;
        var icon = button.querySelector('i');

        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'liked');
        } else {
            icon.classList.remove('fas', 'liked');
            icon.classList.add('far');
        }
    });
});

      
const slider = document.querySelectorAll('.header');
const slides = document.querySelectorAll('.header');
let currentIndex = 0;

function goToSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}
// Auto play the slider
setInterval(nextSlide, 3000); // Change interval time as needed
$('.header').slick({
    slidesToShow: 2, // Display two images at a time
    slidesToScroll: 1,
    autoplay: true, // Auto play the slider
    autoplaySpeed: 2000, // Auto play speed in millisecond
});





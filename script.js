if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}






function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    Array.from(removeCartItemButtons).forEach(removeCartItemButton => {
        removeCartItemButton.addEventListener('click', removeCartItem)
    })

    var quantityInputs = Array.from(document.getElementsByClassName('cart-quantity-input'));
    quantityInputs.forEach(quantityInput => {
        quantityInput.addEventListener('change',quantityChanged);
    })

    var addToCartButtons = Array.from(document.getElementsByClassName('shop-item-button'));
    addToCartButtons.forEach(button =>{
        button.addEventListener('click',addToCartClicked);
    })

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert("Thank you for purchase");
    var cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = " ";
    updateTotalCost();
}

function addToCartClicked(e){
    var itemButton = e.target;
    var shopItem = itemButton.parentElement.parentElement;
    var itemTitle = shopItem.querySelector('.shop-item-title').innerText;
    var itemPhoto = shopItem.querySelector('.shop-item-image').src;
    var itemPrice = shopItem.querySelector('.shop-item-price').innerText;
    addItemToCart(itemTitle,itemPrice, itemPhoto);
    updateTotalCost();
}

function addItemToCart(itemTitle, itemPrice, itemPhoto){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];

    // ONE WAY TO DO IT
    // var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    // for(var i = 0; i < cartItemNames.length; i++){
    //     if(cartItemNames[i].innerText == itemTitle){   
    //         alert("This item is already added to the cart");
    //         return;
    //     }
    // }

    // ANOTHER WAY TO DO IT
    var cartItemNames = Array.from(cartItems.getElementsByClassName('cart-item-title'));
    let existProd = false;
    cartItemNames.forEach(cartItemName => {
        if(cartItemName.innerText == itemTitle){
            alert('This item is already added to the cart');
                existProd = true
            return;
        }
    })    
    if(existProd) return;

    var cartRowContents = 
    `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${itemPhoto}" width="100" height="100">
            <span class="cart-item-title">${itemTitle}</span>
        </div>
        <span class="cart-price cart-column">${itemPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateTotalCost(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = Array.from(cartItems.getElementsByClassName('cart-row'));
    var total = 0; 
    cartRows.forEach(cartRow => {
        var cartRowPrice = cartRow.getElementsByClassName('cart-price')[0];
        var cartRowQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(cartRowPrice.innerHTML.replace("$", ''));
        var quantity = cartRowQuantity.value; 
        total = total + (price * quantity);
    })
    total = Math.round(total * 100) / 100;
    var cartTotalElement = document.querySelector('.cart-total-price').innerText = '$' + total;
}

function removeCartItem(e) {
    var buttonCLicked = e.target;
    buttonCLicked.parentElement.parentElement.remove();
    updateTotalCost();
};

function quantityChanged(e){
    var input = e.target;
    if(input.value <= 0 || isNaN(input.value)){
        input.value = 1;
    }
    updateTotalCost();
}

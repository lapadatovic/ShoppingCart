var removeCartItemButtons = document.getElementsByClassName('btn-danger');
// console.log(removeCartItemButtons);

// for(var i = 0; i < removeCartItemButtons.length; i++){
//     var button = removeCartItemButtons[i];
//     button.addEventListener('click', () => {
//         console.log("clicked button");
//     });
// }
Array.from(removeCartItemButtons).forEach(removeCartItemButton => {
    removeCartItemButton.addEventListener('click', (e) => {
        var buttonCLicked = e.target;
        buttonCLicked.parentElement.parentElement.remove();
        updateTotalCost();
    })
})

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
    var cartTotalElement = document.querySelector('.cart-total-price').innerText = '$' + total;
}


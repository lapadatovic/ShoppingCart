var removeCartItemButtons = document.getElementsByClassName('btn-danger');
// console.log(removeCartItemButtons);

// for(var i = 0; i < removeCartItemButtons.length; i++){
//     var button = removeCartItemButtons[i];
//     button.addEventListener('click', () => {
//         console.log("clicked button");
//     });
// }
Array.from(removeCartItemButtons).forEach(removeCartItemButton => {
    // console.log(removeCartItemButton);
    removeCartItemButton.addEventListener('click', () => {
        console.log("clicked button");
    })
})
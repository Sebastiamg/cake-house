// Carrito

let cartIcon = document.querySelector('#carrito_icono')
let cart = document.querySelector('.carritoCompra')
let closeCart = document.querySelector('#cerrar-carrito')

cartIcon.onclick =()=>{
  cart.classList.add('active')
}
closeCart.onclick =()=>{
  cart.classList.remove('active')
}


//Carrito trabajando
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded',ready);
}else{
  ready();
}

function ready() {
  //Remover items
  var removeCartButtons=document.getElementsByClassName('carrito-remover')
  console.log(removeCartButtons)

  for(var i=0;i<removeCartButtons.length; i++){
    var button=removeCartButtons[i]
    button.addEventListener('click',removeCartItem)
  }
  //Cambios de cantidad
  var quantityInputs = document.getElementsByClassName('carrito-contador')
  for(var i=0;i<quantityInputs.length; i++){
    var input=quantityInputs[i]
    input.addEventListener("change",quantityChanged)
  }
  //Agregar al carrito
  var addCart=document.getElementsByClassName('add-cartt')
  for(var i=0;i<addCart.length; i++){
    var button= addCart[i]
    button.addEventListener('click',addCartClicked)
  }
  // Boton de comprar trabajando
  const pedido = document.getElementsByClassName('btn-comprar')[0]
  .addEventListener('click',buyButtonClicked)
}
//Boton de comprar
function buyButtonClicked(){
  window.location.href = "http://127.0.0.1:8000/cake/pedidos/"
  var cartContent=document.getElementsByClassName('carrito-contenido')[0]
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal();
}
//Remover items del carrito
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal()
}
//Cambio de cantidad
function quantityChanged(event){
  var input = event.target
  if (isNaN(input.value) || input.value <= 0)  {
    input.value=1
  }
  updateTotal()
}
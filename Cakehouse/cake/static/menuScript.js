let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');


document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});


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

var removeCartButtons=document.getElementsByClassName('carrito-remover')
console.log(removeCartButtons)


function ready() {
    //Remover items
    var removeCartButtons=document.getElementsByClassName('carrito-remover')
    console.log(removeCartButtons)

    for(let i=0;i<removeCartButtons.length; i++){
      var button=removeCartButtons[i]
      button.addEventListener('click',() => removeCartItem())//--------------------------------------------
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
    const comprar = document.getElementsByClassName('btn-comprar')[0]
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
  let i = event
  console.log(i)
  updateTotal()
  // localStorage.removeItem("Pastel 1") //...................................................
}
//Cambio de cantidad
function quantityChanged(event){
  var input = event.target
  if (isNaN(input.value) || input.value <= 0)  {
    input.value=1
  }
  updateTotal()
}
//Add al carrito
function addCartClicked(event){
  var button=event.target
  var shopProducts=button.parentElement
  var title=shopProducts.getElementsByClassName("productoTitulo")[0].innerText
  var price=shopProducts.getElementsByClassName("price")[0].innerText
  var productImg=shopProducts.getElementsByClassName("producto-imagen")[0].src
  console.log(shopProducts)

  const pastelObject = {
    title: title,
    price: price,
    productImg: productImg
  }

  localStorage.setItem(`${title}`, JSON.stringify(pastelObject))
  const pastelNuevo = JSON.parse(localStorage.getItem(`${title}`))

  const title1 = pastelNuevo["title"]
  const price1 = pastelNuevo["price"]
  const productImg1 = pastelNuevo["productImg"]

  console.log(title1)
  addProductToCart(title1,price1,productImg1)
  updateTotal()
}
//productos agregados al carro localStorage
for (let i = 0; i <= localStorage.length-1; i++) {
  key = localStorage.key(i)
  value = JSON.parse(localStorage.getItem(key))


  var cartShopBox=document.createElement('div')
  cartShopBox.classList.add('carrito-caja')
  var cartItems = document.getElementsByClassName('carrito-contenido')[0]
  var cartItemsNames=cartItems.getElementsByClassName('productoTitulo-carrito') 
 
  var cartBoxContent= `<img src="${value["productImg"]}" alt="" class="carrito-img">
                      <div class="caja-detalle">
                        <div class="productoTitulo-carrito">${value["title"]}</div>
                        <div class="carrito-precion">${value["price"]}</div>
                        <input type="number" value="1" class="carrito-contador">
                      </div>
                      <!-- Borrar Carrito -->
                      <i class="fa-solid fa-trash carrito-remover"></i>` //-------------------------

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('carrito-remover')[0]
.addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('carrito-contador')[0]
.addEventListener('change',quantityChanged)

  console.log(value)
}

function addProductToCart(title,price,productImg){
  var cartShopBox=document.createElement('div')
  cartShopBox.classList.add('carrito-caja')
  var cartItems=document.getElementsByClassName('carrito-contenido')[0]
  var cartItemsNames=cartItems.getElementsByClassName('productoTitulo-carrito')
 for(var i=0;i<cartItemsNames.length; i++){
  if(cartItemsNames[i].innerText==title){
    alert("Ya tienes este producto en el carrito")
    return;
  }
  
 }
 var cartBoxContent= `<img src="${productImg}" alt="" class="carrito-img">
                      <div class="caja-detalle">
                        <div class="productoTitulo-carrito">${title}</div>
                        <div class="carrito-precion">${price}</div>
                        <input type="number" value="1" class="carrito-contador">
                      </div>
                      <!-- Borrar Carrito -->
                      <i class="fa-solid fa-trash carrito-remover"></i>`

cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('carrito-remover')[0]
.addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('carrito-contador')[0]
.addEventListener('change',quantityChanged)
}




//Actualizar  total
function updateTotal(){
  var cartContent=document.getElementsByClassName('carrito-contenido')[0]
  var cartBoxes =cartContent.getElementsByClassName('carrito-caja')
  var total =0;
  for(var i=0;i<cartBoxes.length; i++){
    var cartBox=cartBoxes[i]
    var priceElement=cartBox.getElementsByClassName('carrito-precion')[0]
    var quantityElement = cartBox.getElementsByClassName('carrito-contador')[0]
    var price =parseFloat(priceElement.innerText.replace("$",""))
    var quantity =quantityElement.value
    total=total+price*quantity
  }
    //Si el precio contiene centavos
    total=Math.round(total*100)/100
    document.getElementsByClassName('precio-total')[0].innerText ="$"+total
}


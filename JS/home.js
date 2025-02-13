let sliderImages = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let current = 0;

document.addEventListener('DOMContentLoaded', () => {

    displayUsername();
    updateCartCount(); 
    if(window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});
if(window.location.pathname.includes('home.html')) {
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
        dots[i].classList.remove("active");
    }
}
function currentSlide(num) {
    reset();
    sliderImages[num].style.display = "block";
    dots[num].classList.add("active");
    current = num;
}

function slideLeft() {
    reset();
    current = (current == 0) ? sliderImages.length - 1 : current - 1;
    sliderImages[current].style.display = "block";
    dots[current].classList.add("active");
}

function slideRight() {
    reset();
    current = (current == sliderImages.length - 1) ? 0 : current + 1;
    sliderImages[current].style.display = "block";
    dots[current].classList.add("active");
}
setInterval(slideRight, 4000);
}
function Gotop(){
window.scrollTo(0, 0);

}
function getCookie(name) {
    let cookieArr = document.cookie.split(';');
    
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');
        if  (cookiePair[0].trim() == name)  {
            return cookiePair[1];
        }
    }
    return null;
}
function displayUsername() {
    let username = getCookie('username');
    let loggedIn = getCookie('loggedIn');
console.log(username);
    if (loggedIn) {
        document.getElementById("usernameDisplay").innerHTML =
        `<a class='nav-link'><i class='fa-solid fa-circle-user'></i> ${username}</a>`;
    }
}

window.onscroll =function(){

        if(scrollY > 550)  {
            document.querySelector(".scroll-to-top").style.display 
            = "block";
        }
        else  {
            document.querySelector(".scroll-to-top").style.display 
            = "none";
        }
    }

let product=document.querySelectorAll(".product");
let Tops=document.querySelectorAll(".Tops");
let Shoes=document.querySelectorAll(".Shoes");
let Accessories=document.querySelectorAll(".Accessories");
function showTops(){
    for(let i=0;i<product.length;i++){
        product[i].style.display="none";
    }
    for(let i=0;i<Tops.length;i++){
        Tops[i].style.display="block";
    }
}
function showShoes(){
    for(let i=0;i<product.length;i++){
        product[i].style.display="none";
    }
    for(let i=0;i<Shoes.length;i++){
        Shoes[i].style.display="block";
    }
}
function showAccessories(){
    for(let i=0;i<product.length;i++){
        product[i].style.display="none";
    }
    for(let i=0;i<Accessories.length;i++){
        Accessories[i].style.display="block";
    }
}
function showall(){
    for(let i=0;i<product.length;i++){
        product[i].style.display="block";
    
    }
}
let quickview=document.querySelectorAll(".productLink");
let modal = document.getElementById('quickViewModal');
let close = document.getElementsByClassName('close')[0];
let cancel=document.getElementsByClassName('cancel-modal')[0];
let productImage=document.getElementsByClassName('modal-image')[0];
let productName=document.getElementsByClassName('modal-product-name')[0];
let productPrice=document.getElementsByClassName('modal-product-price')[0];
let modalcontent=document.getElementsByClassName('modal-content')[0];
let cart=JSON.parse(localStorage.getItem('cart'))||[];


for(let i = 0; i < product.length; i++) {
    quickview[i].addEventListener('click', function() {
      modal.style.display = 'block';
      let backgroundImage =window.getComputedStyle(product[i].querySelector('.product-img')).backgroundImage;
      let name = product[i].querySelector('.product-name').textContent;
      let price = product[i].querySelector('.product-price').textContent;
      productImage.style.backgroundImage = backgroundImage;
      productName.innerHTML = name;
      productPrice.innerHTML = price;
      modalcontent.setAttribute('data-product-id', product[i].id);
    });
  }
modalcontent.addEventListener('click', (e) => {
        const input = document.querySelector('.quantity-input');
         value = parseInt(input.value) || 1;
      
        if(e.target.classList.contains('plus')) {
          value++;
        } else if(e.target.classList.contains('minus') && value > 1) {
          value--;
        }
      
        input.value = value;
});

document.querySelector('.add-to-cart').addEventListener('click', function() {
    addToCart(modalcontent.getAttribute('data-product-id')); 
  });
    function addToCart(productId) {
        let productElement = document.getElementById(productId);
        let productName = productElement.querySelector('.product-name').textContent;
        let productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
        let productImage = window.getComputedStyle(productElement.querySelector('.product-img')).backgroundImage;
        let productQuantity = parseInt(document.querySelector('.quantity-input').value);
        let productTotal = productPrice * productQuantity;
      
        let product = {
          productId,
          productName,
          productPrice,
          productImage,
          productQuantity,
          productTotal
        };
      
       
        let ProductExist = cart.findIndex(item => item.productId === productId);
      
        if (ProductExist !== -1) {
          cart[ProductExist].productQuantity += productQuantity;
          cart[ProductExist].productTotal += productTotal;
        } else {
          cart.push(product);
        }
      
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Added ${product.productQuantity} ${product.productName} to cart!`);
        updateCartCount();
        modal.style.display="none";
}
function updateCartCount(){
    let totalQuantity = cart.reduce((sum, product) => sum + product.productQuantity, 0);
    document.querySelector('#lblCartCount').textContent = totalQuantity;
}
updateCartCount();

close.addEventListener('click', function() {
    modal.style.display = 'none';
});

cancel.addEventListener('click', function(){
    modal.style.display = 'none';
});




function displayCartItems() {
    let cartItems = document.querySelector('.cart-items');
    let totalPriceElement = document.getElementById('cart-total-price');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item) => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image" style=background-image:${item.productImage}></div>
            <div class="cart-item-info">
                <h4>${item.productName}</h4>
                <p class="cart-item-price">$${item.productPrice} x ${item.productQuantity}</p>
                <p>Total: $${item.productTotal.toFixed(2)}</p>
            </div>
  
        `;
        
        cartItems.appendChild(cartItem);
        total += item.productTotal;
       
    });
    totalPriceElement.textContent = total.toFixed(2);
}
















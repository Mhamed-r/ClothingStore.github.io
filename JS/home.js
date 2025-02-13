let sliderImages = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let current = 0;

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
window.onload=displayUsername;
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
      let backgroundImage  =window.getComputedStyle(product[i].querySelector('.product-img')).backgroundImage;
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







// document.querySelectorAll('.product').forEach(product => {
//     product.addEventListener('click', function() {
//       const modal = document.getElementById('quickViewModal');
//       modal.dataset.target = this.dataset.name;
//     });
//   });
// document.querySelectorAll('.productLink').forEach(link => {
//     link.addEventListener('click', function(e) {
//       e.preventDefault();
//       const product = this.closest('.product');
//       const productName = product.dataset.name;
//       const modal = document.getElementById('quickViewModal');
//       if(productName == modal.dataset.target) {
//         const productImg = product.querySelector('.product-img');
//         const productPrice = product.querySelector('.product-price').textContent;
//         const productTitle = product.querySelector('.product-name').textContent;
//         const productImage = window.getComputedStyle(productImg).backgroundImage;
//         document.querySelector('.modal-product-name').textContent = productTitle;
//         document.querySelector('.modal-product-price').textContent = productPrice;
//         document.querySelector('.modal-image').style.backgroundImage = productImage;
//         modal.style.display = 'block';
//       }
//     });
//   });
  
//   document.querySelectorAll('.close, .close-modal').forEach(button => {
//     button.addEventListener('click', () => {
//       document.getElementById('quickViewModal').style.display = 'none';
//     });
//   });
  
//   window.onclick = (e) => {
//     if(e.target == document.getElementById('quickViewModal')) {
//       document.getElementById('quickViewModal').style.display = 'none';
//     }
//   };





//   function addToCart(product) {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItem = cart.find(item => item.id === product.id);
    
//     if(existingItem) {
//       existingItem.quantity += product.quantity;
//     } else {
//       cart.push(product);
//     }
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert(`Added ${product.quantity} ${product.name} to cart!`);
//   }
  
//   document.querySelector('.modal-content').addEventListener('click', (e) => {
//     const input = document.querySelector('.quantity-input');
//     let value = parseInt(input.value) || 1;
  
//     if(e.target.classList.contains('plus')) {
//       value++;
//     } else if(e.target.classList.contains('minus') && value > 1) {
//       value--;
//     }
  
//     input.value = value;
//   });
//   document.querySelector('.add-to-cart').addEventListener('click', () => {
//     const product = {
//       id: document.getElementById('quickViewModal').dataset.target,
//       name: document.querySelector('.modal-product-name').textContent,
//       price: document.querySelector('.modal-product-price').textContent,
//       image: document.querySelector('.modal-image').style.backgroundImage,
//       quantity: parseInt(document.querySelector('.quantity-input').value) || 1
//     };
  
//     addToCart(product);
//     document.getElementById('quickViewModal').style.display = 'none';
//     updateCartCount();
//   });
  

//   if(!localStorage.getItem('cart')) {
//     localStorage.setItem('cart', JSON.stringify([]));
//   }

//   function updateCartCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//     document.querySelector('.cart-count').textContent = count;
//   };

//   updateCartCount();

  
//   function displayCartItems() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartContainer = document.querySelector('.cart-items');
//     const totalPriceElement = document.getElementById('cart-total-price');
    
//     cartContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach((item, index) => {
//         const itemElement = document.createElement('div');
//         itemElement.className = 'cart-item';
//         itemElement.innerHTML = `
//             <div class="cart-item-image" style="background-image: ${item.image}"></div>
//             <div class="cart-item-info">
//                 <h4>${item.name}</h4>
//                 <p class="cart-item-price">${item.price} x ${item.quantity}</p>
//                 <p>Total: $${(parseFloat(item.price.replace('$','')) * item.quantity)}</p>
//             </div>
//             <button class="remove-item" data-index="${index}">&times;</button>
//         `;
        
//         cartContainer.appendChild(itemElement);
//         total += parseFloat(item.price.replace('$','')) * item.quantity;
//     });

//     totalPriceElement.textContent = total.toFixed(2);

//     document.querySelectorAll('.remove-item').forEach(button => {
//         button.addEventListener('click', function() {
//             const index = parseInt(this.dataset.index);
//             const cart = JSON.parse(localStorage.getItem('cart'));
//             cart.splice(index, 1);
//             localStorage.setItem('cart', JSON.stringify(cart));
//             displayCartItems();
//             updateCartCount();
//         });
//     });
// }



'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.navlist');
let listCard = document.querySelector('.navlistCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listCards  = [];
const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});




let prods = []
const productbody = document.querySelector(".food-menu-list");

window.addEventListener("load",()=>{
  fetch("http://localhost:8080/products")
  .then(response => response.json())
  .then(products => displayproduct(products))
  .catch(error => console.error('Error fetching products:', error));
})


function displayproduct(products){
  
  products.forEach((product, key) => {
    let li = document.createElement("li")

    let div = document.createElement('div')
    div.classList.add("food-menu-card");
  
    let div1 = document.createElement("div")
    div1.classList.add("card-banner");
  
    let img = document.createElement("img")
    img.src = product.img;
    img.width = "300"
    img.style.height = "300px"
    img.loading = "lazy"
    img.alt = product.productName;
    img.classList.add("w-100");
  
    let div1div = document.createElement("div")
    div1div.classList.add("badge")
    div1div.innerHTML = `-${product.discount}%`;
  
    let orderbtn = document.createElement("button")
    orderbtn.classList.add("food-menu-btn")
    orderbtn.classList.add("btn")
    orderbtn.innerHTML = "Add to cart"
    orderbtn.addEventListener("click",()=>{
      addToCard(products,key)
    })
  
  
    div1.append(img,div1div,orderbtn)
  
    let div2 = document.createElement("div")
    div2.classList.add("wrapper")
  
    let div2p = document.createElement("p")
    div2p.classList.add("category")
    div2p.innerHTML = product.productName
  
    let div2div = document.createElement("div")
    div2div.classList.add("rating-wrapper")
  
    let star1 = document.createElement("ion-icon")
    star1.name = "star"
    let star2 = document.createElement("ion-icon")
    star2.name = "star"
    let star3 = document.createElement("ion-icon")
    star3.name = "star"
    let star4 = document.createElement("ion-icon")
    star4.name = "star"
    let star5 = document.createElement("ion-icon")
    star5.name = "star"
  
    div2div.append(star1,star2,star3,star4,star5)
  
  
    div2.append(div2p,div2div)
  
    let h3 = document.createElement("h3")
    h3.classList.add("h3")
    h3.classList.add("card-title")
    h3.innerHTML = product.productName
  
  
    let div4 = document.createElement("div")
    div4.classList.add("price-wrapper")
  
    let div4p = document.createElement("p")
    div4p.classList.add("price-text")
    div4p.innerText = "Price:"
  
  
    let div4del = document.createElement("del")
    div4del.classList.add("del")
    div4del.value = product.price
    div4del.innerText = `$${product.price}`
  
    let div4data = document.createElement("data")
    div4data.classList.add("price")
    div4data.innerHTML = `$${(product.price - (product.price*(product.discount/100))).toFixed(2)}`
  
    div4.append(div4p,div4del,div4data)
  
  
  
  
    div.append(div1,div2,h3,div4)
    productbody.append(div)
        
        
  })
  // console.log(product)



}




openShopping.addEventListener('click', ()=>{
    body.classList.add('active1');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active1');
})




let pro = [];
function addToCard(products,key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    pro = products;
    reloadCard();
}
function reloadCard() {
  
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  
  console.log(pro)
  listCards.forEach((value, key) => {
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;
      
      if (value != null) {
          let newDiv = document.createElement('li');
          newDiv.innerHTML = `
              <div><img src="${value.img}"/></div>
              <div>${value.productName}</div>
              <div>${value.price.toLocaleString()}</div>
              <div>
                  <button onclick="changeQuantity(${key}, ${value.quantity - 1},${pro[key].price})">-</button>
                  <div class="count">${value.quantity}</div>
                  <button onclick="changeQuantity(${key}, ${value.quantity + 1},${pro[key].price})">+</button>
              </div>`;
          listCard.appendChild(newDiv);
          console.log(listCard);
      }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity,price) {
  console.log("hello")
  if (quantity == 0) {
      delete listCards[key];
  } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * price;
  }
  reloadCard();
}








//table bookin script
let tablename = document.querySelector(".tablename")
let tableemail = document.querySelector(".tableemail")
let tablepersons = document.querySelector(".tableinputfiled")
let tabledate = document.querySelector(".tabledate")
let tabletime = document.querySelector(".tabletime")
let tablemessage = document.querySelector(".tablemessage")
let tablebtn = document.querySelector(".tablebtn")

console.log(tablepersons.value)
tablebtn.addEventListener("click", (e) => {
  e.preventDefault()
  const jwtToken = JSON.parse(localStorage.getItem("jwtToken"));
console.log(jwtToken)
  const apiUrl = 'http://localhost:8080/table';

  const tableobj = {
    name: tablename.value,
    email: tableemail.value,
    persons: tablepersons.value,
    date: tabledate.value,
    time: tabletime.value,
    message: tablemessage.value
  };
console.log(tableobj)
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tableobj) 
  })
    .then(response => {
      if (response.ok) {
        console.log(response);
      } else {
        // Handle errors or non-200 status codes here
        console.error('Request failed with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Request error:', error);
    });
});


const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const registerusername = document.querySelector(".signupusername")
const registeremail = document.querySelector(".signupemail")
const registerpass = document.querySelector(".signuppass")
const register = document.querySelector(".signupbtn");

register.addEventListener("click",(e)=>{
  e.preventDefault();
  let regobj = {
    username : registerusername.value,
    password : registerpass.value,
    email : registeremail.value
  }

  console.log(regobj)
      fetch('http://localhost:8080/users',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(regobj)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error =>{
      console.log(error)
      })
})




const loginusername = document.querySelector(".signinusername")
const loginpass = document.querySelector(".signinpass")
const login = document.querySelector(".signinbtn")



login.addEventListener("click",(e)=>{
  e.preventDefault()
  var authHeader = "Basic " + btoa(loginusername.value + ":" + loginpass.value);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", authHeader);

  // Set up the fetch options with the Basic Authentication header
  var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
  };

  const varification = "";
  // Send the GET request to the /signIn endpoint
  fetch('http://localhost:8080/signIn', requestOptions)
  .then((response) => {
    if (response.ok) {
      var token = response.headers.get("Authorization");
      localStorage.setItem("jwtToken", JSON.stringify(token));
      console.log("Token stored:", token);
      window.location = "index.html"
    } else {
      console.log("Error:", response.status);
      alert("wrong password")
    }
    return response.json();
  })
  .then((result) => {
    var customerId = result.customerId;
    var customername = result.name;
    var cart= result.cart;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("customername", customername);
    console.log(result);
    console.log(result.role);
    
    localStorage.setItem("customerId", customerId);
  })
  .catch((error) => console.log("error", error));
})
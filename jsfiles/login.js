// const signin = document.getElementById("signIn");
// signin.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const userData = JSON.parse(localStorage.getItem("users"));
//   const user = userData.find(
//     (element) => element.email === email && atob(element.password) === password
//   );

//   if (user) {
//     if (user.role === "user") {
//       console.log(user.role);
//       localStorage.setItem("name", JSON.stringify(user.name));
//       window.location.href = "user.html";
//     } else {
//       localStorage.setItem("name", JSON.stringify(user.name));
//       window.location.href = "admin.html";
//     }
//   } else {
//     document.querySelector(
//       "#errormsg"
//     ).textContent = `invalid email or password`;
//   }
// });
const signin = document.getElementById("signIn");
signin.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Regular expression to check if the password contains at least one special character
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  
  if (!specialCharRegex.test(password)) {
    // Display error message if password doesn't contain a special character
    document.querySelector("#errormsg").textContent = "Password must contain at least one special character.";
    return; // Stop further execution
  }

  const userData = JSON.parse(localStorage.getItem("users"));
  const user = userData.find(
    (element) => element.email === email && atob(element.password) === password
  );

  if (user) {
    if (user.role === "user") {
      console.log(user.role);
      localStorage.setItem("name", JSON.stringify(user.name));
      window.location.href = "user.html";
    } else {
      localStorage.setItem("name", JSON.stringify(user.name));
      window.location.href = "admin.html";
    }
  } else {
    document.querySelector("#errormsg").textContent = `Invalid email or password`;
  }
});


//  Prevent navigating back
function stopBack() {
  window.history.go(1);
}

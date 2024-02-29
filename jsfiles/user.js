// Event listener for logout button
document.querySelector(".logout").addEventListener("click", () => {
    let result = confirm("Are you sure you want to log out?");
  if (result) {
    window.location.href = "crud.html";
  } else {
    console.log("user click cancel");
  }
});


// Display user name
const userName = localStorage.getItem("name");
const heading = document.querySelector(".heading");
heading.innerHTML = `HEY ${userName}`;
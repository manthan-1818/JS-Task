// Function to handle logout
document.querySelector(".logout").addEventListener("click", () => {
  let result = confirm("Are you sure you want to log out?");
  if (result) {
    window.location.href = "crud.html";
  } else {
    console.log("user click cancel");
  }
});
// Display user data
const userName = localStorage.getItem("name");
const heading = document.querySelector("#heading");
const tbody = document.querySelector("#tbody");
heading.innerHTML = `Welcome ${userName}!`;
const table = document.querySelector("table");
const userdata = JSON.parse(localStorage.getItem("users"));
let tablerows = "";

if (userdata.length > 0) {
  for (let i = 0; i < userdata.length; i++) {
    tablerows += `
    <tr> 
    <td>${i + 1}    </td>
    <td>${userdata[i].name}</td>
    <td>${userdata[i].email}</td>
    <td>${userdata[i].role}</td>
    <td> <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#updateModal" onclick=updatedata(${i})>
    Update </button></td>
    <td><button type="button" class="btn btn-info" onclick="deletedata('${
      userdata[i].email
    }')">Delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = tablerows;
}

 // Delete user data
function deletedata(userEmail) {
  let result = confirm("Are you sure you want to delete?");
  if (result) {
    var users = JSON.parse(localStorage.getItem("users"));
    var restUsers = users.filter(function (user) {
      return user.email !== userEmail;
    });
    localStorage.setItem("users", JSON.stringify(restUsers));
    location.reload();
  } else {
    console.log("user click cancel");
  }
}

// update user data
function updatedata(index) {
  var users = JSON.parse(localStorage.getItem("users"));
  
  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;
  document.getElementById("select-role").value = users[index].role;

  document.getElementById("submitBtn").addEventListener("click", () => {
    let updatedName = document.getElementById("name").value;
    let updatedEmail = document.getElementById("email").value;
    let updatedRole = document.getElementById("select-role").value;

    users[index].name = updatedName;
    users[index].email = updatedEmail;
    users[index].role = updatedRole;

    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  });
}



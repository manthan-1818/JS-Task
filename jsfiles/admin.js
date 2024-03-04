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
  $("#deleteConfirmationModal").modal("show");

  $("#confirmDeleteButton").on("click", function () {
    var users = JSON.parse(localStorage.getItem("users"));
    var restUsers = users.filter(function (user) {
      return user.email !== userEmail;
    });
    localStorage.setItem("users", JSON.stringify(restUsers));
    location.reload();
  });
}

// update user data
function updatedata(index) {
  var users = JSON.parse(localStorage.getItem("users"));

  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;
  document.getElementById("select-role").value = users[index].role;

  document
    .getElementById("submitBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      let updatedName = document.getElementById("name").value.trim();
      let updatedEmail = document.getElementById("email").value.trim();
      let updatedRole = document.getElementById("select-role").value.trim();

      // Check if any field is empty
      if (updatedName === "" || updatedEmail === "" || updatedRole === "") {
        alert("Please fill in all the details.");
        return;
      }

      users[index].name = updatedName;
      users[index].email = updatedEmail;
      users[index].role = updatedRole;

      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    });
}

// add blog
function addBlog() {
  let blogForm = document.getElementById("blogForm");
  let blog = JSON.parse(localStorage.getItem("blog")) || [];
  let title = document.getElementById("title").value;
  console.log(title);
  let blogObj = {
    title: document.getElementById("title").value,
    discription: document.getElementById("description").value,
  };
  blog.push(blogObj);
  localStorage.setItem("blog", JSON.stringify(blog));
  blogForm.reset();
  displayBlogs();
}

// blog
function displayBlogs() {
  let tBlogBody = document.getElementById("tBlogBody");
  let blogData = JSON.parse(localStorage.getItem("blog")) || [];
  let tableRows = "";

  if (blogData.length > 0) {
    for (let i = 0; i < blogData.length; i++) {
      tableRows += `
        <tr> 
          <td>${i + 1}</td>
          <td>${blogData[i].title}</td>
          <td>${blogData[i].discription}</td>
          <td>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#update-Blog" onclick="updateBlog(${i})">Update</button>
          </td>
          <td>
            <button type="button" class="btn btn-danger" onclick="deleteBlog(${i})">Delete</button>
          </td>
        </tr>`;
    }
    tBlogBody.innerHTML = tableRows;
  }
}

// delete blog
function deleteBlog(index) {
  $("#deleteConfirmationModal").modal("show");

  $("#confirmDeleteButton").on("click", function () {
    let blogdata = JSON.parse(localStorage.getItem("blog")) || [];

    blogdata.splice(index, 1);

    localStorage.setItem("blog", JSON.stringify(blogdata));

    location.reload();
  });
}

// update blog
function updateBlog(index) {
  debugger;
  let blogData = JSON.parse(localStorage.getItem("blog")) || [];
  document.getElementById("updateTitle").value = blogData[index].title;
  document.getElementById("updateDescription").value =
    blogData[index].description;

  document.getElementById("updateBlogButton").addEventListener("click", () => {
    let title = document.getElementById("updateTitle").value;
    let description = document.getElementById("updateDescription").value;
    blogData[index].title = title;
    blogData[index].discription = description;
    localStorage.setItem("blog", JSON.stringify(blogData));
    location.reload();
  });
}

displayBlogs();
function stopBack() {
  window.history.go(1);
}

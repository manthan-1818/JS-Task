document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (validate()) {
        if (isEmailExist()) {
      console.log("inside exist");
      document.querySelector("#semail").textContent = `email already exist`;
      return false;
    } else {
      const success = document.querySelector("#successMessage");
      const { name, email, role, password } = getFormValues();
      const encryptpassword = btoa(password);
      success.style.display = "block";
      let user = JSON.parse(localStorage.getItem("users")) || [];

      const data = {
        name: name,
        email: email,
        role: role,
        password: encryptpassword,
      };
      user.push(data);
      var userdata = localStorage.setItem("users", JSON.stringify(user));
      console.log(userdata);
      e.target.reset();
    }
  }
});

// Function to retrieve form values
function getFormValues() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    role: document.getElementById("select-role").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };
}
// Function to check if email already exists
function isEmailExist() {
  const { email } = getFormValues();
  const userdata = JSON.parse(localStorage.getItem("users"));
  if (userdata === null) {
    return false;
  } else {
    const emailcheck = userdata.some((element) => {
      return element.email === email;
    });
    console.log(emailcheck);
    return emailcheck;
  }
}
 // Function to validate form inputs
function validate() {
  const { name, email, role, password, confirmPassword } = getFormValues();
  let valid = true;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  if (name === "") {
    document.getElementById("sname").innerHTML = "Input is not empty";
    valid = false;
  } else {
    document.getElementById("sname").innerHTML = "";
  }

  if (email === "") {
    document.getElementById("semail").innerHTML = "Input is not empty";
    valid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("semail").innerHTML = "Incorrect email";
    valid = false;
  } else {
    document.getElementById("semail").innerHTML = "";
  }

  if (password.length < 8) {
    document.getElementById("spassword").innerHTML = "It should contain 8 characters";
    valid = false;
  } else if (password === "") {
    document.getElementById("spassword").innerHTML = "Input is not empty";
    valid = false;
  } else if (!specialCharRegex.test(password)) {
    document.getElementById("spassword").innerHTML = "Password must contain at least one special character";
    valid = false;
  } else {
    document.getElementById("spassword").innerHTML = "";
  }

  if (confirmPassword !== password) {
    document.getElementById("sConfirmPassword").innerHTML = "Password does not match";
    valid = false;
  } else if (password === "") {
    document.getElementById("sConfirmPassword").innerHTML = "Input is not empty";
    valid = false;
  } else {
    document.getElementById("sConfirmPassword").innerHTML = "";
  }

  return valid;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Check if username and password are valid (this is a simple example)
    if (username === 'user' && password === 'password') {
      // Successful login
      document.getElementById('loginMessage').innerText = 'Login successful!';
      // Redirect to dashboard or another page
      window.location.href = 'dashboard.html'; // Redirect to dashboard.html
    } else {
      // Failed login
      document.getElementById('loginMessage').innerText = 'Invalid username or password';
    }
  });
  
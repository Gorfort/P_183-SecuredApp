// Function to handle form submission
export function handleLoginSubmit(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send a POST request to the server
  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Login Successful!");
        // Redirect or perform other actions on success
        window.location.href = "/dashboard"; // Example redirect
      } else {
        alert("Login Failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Event listener to attach the function to form submission
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }
});

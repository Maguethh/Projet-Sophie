function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        window.location.href = "/FrontEnd/index.html";
      } else {
        alert("Error : " + data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
document.getElementById("submitButton").addEventListener("click", login);

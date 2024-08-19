document.addEventListener("DOMContentLoaded", function () {
  authenticationStatus = localStorage.getItem("authenticated");
  if (!authenticationStatus) {
    window.location.href = "/login.html";
  }
});

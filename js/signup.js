let fullName;
let code;

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("authenticated")) {
    window.location.href = "index.html";
  }
  fullName = document.getElementById("name");
  code = document.getElementById("code");
});

async function signup() {
  if (!fullName.value || !code.value) {
    swal.fire({
      title: "Error",
      text: "Please enter both your full name and the code",
      icon: "error",
    });
    return;
  }
  try {
    let response = await fetch(
      "https://api.local.rednotsus.rocks/card/info/new?name=" +
        fullName.value +
        "&code=" +
        code.value
    );
    let data = await response.json();
    if (data.message == "Success") {
      swal
        .fire({
          title: "Success",
          html: `Account created successfully, note your information down and sign in<br><br>Credit Card Number: <b>${data.number}</b> <br>CVV: <b>${data.cvv}<br> </b>`,
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sign In",
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html";
          }
        });
    } else {
      swal.fire({
        title: "Error",
        text: data.error,
        icon: "error",
      });
    }
  } catch (error) {
    swal.fire({
      title: "Error",
      text: error,
      icon: "error",
    });
  }
}

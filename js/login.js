let cc;
let ccv;

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("authenticated")) {
    window.location.href = "index.html";
  }
  ccv = document.getElementById("ccv");
  if (ccv) {
    ccv.addEventListener("input", function (e) {
      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (value.length > 3) {
        e.target.value = value.slice(0, 3); // Limit to 3 characters
      }
    });
  }
  cc = document.getElementById("cc");
  if (cc) {
    cc.addEventListener("input", function (e) {
      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (value.length > 16) {
        value = value.slice(0, 16); // Limit to 16 characters
      }

      // Add a space every 4 characters
      let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;

      e.target.value = formattedValue;
    });
  }
});

async function login() {
  if (!ccv.value || !cc.value) {
    swal.fire({
      title: "Error",
      text: "Please enter both CCV and Credit Card Number",
      icon: "error",
    });
    return;
  }
  ccNumber = cc.value.replace(/\s+/g, "");
  try {
    let response = await fetch(
      "http://192.168.1.191:3000/card/admin/userLogin?number=" +
        ccNumber +
        "&cvv=" +
        ccv.value
    );
    let data = await response.json();
    if (data.message == "Success") {
      window.location.href = "index.html";
      localStorage.setItem("authenticated", true);
      localStorage.setItem("id", data.id);
      localStorage.setItem("number", data.number);
      localStorage.setItem("cvv", data.cvv);
      localStorage.setItem("holder", data.holder);
    } else {
      swal.fire({
        title: "Error",
        text: "Invalid Credit Card Number or CCV",
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

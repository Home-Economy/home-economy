let amountInput;
let paybtn;
let recipient;

document.addEventListener("DOMContentLoaded", function () {
  amountInput = document.getElementById("amount-input");
  paybtn = document.getElementById("paybtn");
  recipient = document.getElementById("recipient");

  if (amountInput) {
    amountInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (value.length === 0) {
        e.target.value = "";
        return;
      }

      let formattedValue;
      if (value.length <= 2) {
        formattedValue = "0." + value.padStart(2, "0");
      } else {
        formattedValue = value.slice(0, -2) + "." + value.slice(-2);
      }

      // Add commas as thousands separators
      formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      e.target.value = "$ " + formattedValue.replace(/^0+(?=\d)/, "");

      // Move the cursor to the end of the input
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
      }, 0);
    });

    // Keep cursor at the end on focus
    amountInput.addEventListener("focus", function (e) {
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
      }, 0);
    });

    // Keep cursor at the end on mouseup
    amountInput.addEventListener("mouseup", function (e) {
      e.preventDefault();
      e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
    });
  }

  if (paybtn) {
    paybtn.addEventListener("click", pay);
  }
});

function pay() {
  let toPay = parseFloat(amountInput.value.replace(/[^0-9.]/g, ""));

  if (amountInput.value === "") {
    swal.fire({
      text: "Please enter an amount to add.",
      icon: "error",
      confirmButtonText: "OK",
    });

    return;
  } else if (recipient.value === "") {
    swal.fire({
      text: "Please enter a recipient.",
      icon: "error",
      confirmButtonText: "OK",
    });

    return;
  }
  let result = swal
    .fire({
      title: "Are you sure?",
      text: `You are about to pay $${toPay} to ${recipient.value}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetch(
          `https://api.local.rednotsus.rocks/card/transact/pay?from=${localStorage.getItem(
            "id"
          )}&to=${recipient.value}&amount=${toPay}`
        );
        let data = await response.json();
        if (data.message === "Transaction Successful") {
          swal.fire({
            text: "Payment successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          amountInput.value = "";
          recipient.value = "";
        } else {
          swal.fire({
            title: "Payment failed.",
            icon: "error",
            text: data.error,
            confirmButtonText: "OK",
          });
        }
      }
    });
}

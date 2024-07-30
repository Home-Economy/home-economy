document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount-input");

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
});

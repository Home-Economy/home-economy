document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount-input");

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

  const ccv = document.getElementById("ccv");
  if (ccv) {
    ccv.addEventListener("input", function (e) {
      let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (value.length > 3) {
        e.target.value = value.slice(0, 3); // Limit to 3 characters
      }
    });
  }

  const cc = document.getElementById("cc");
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

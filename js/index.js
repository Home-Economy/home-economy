document.addEventListener("DOMContentLoaded", async function () {
  let response = await fetch(
    `https://api.local.rednotsus.rocks/card/info/balance?number=${localStorage.getItem(
      "number"
    )}}`
  );
  let data = await response.json();
  document.getElementById("money").innerText = data.balance;
});

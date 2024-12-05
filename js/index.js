document.addEventListener("DOMContentLoaded", async function () {
  let response = await fetch(
    `https://card-api.ch3n.cc/card/info/balance?number=${localStorage.getItem(
      "number"
    )}`
  );
  let data = await response.json();
  document.getElementById("money").innerText = data.balance;
});

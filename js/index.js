document.addEventListener("DOMContentLoaded", async function () {
  let response = await fetch(
    `http://192.168.1.191:3000/card/info/balance?number=${localStorage.getItem(
      "number"
    )}}`
  );
  let data = await response.json();
  document.getElementById("money").innerText = data.balance;
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    hash = BigInt(window.location.hash.slice(1));
    let response = await fetch(
      "http://192.168.1.191:3000/card/cash/verify?hash=" + hash
    );

    let data = await response.json();
    if (data.message === "Success") {
      document.getElementById("amount").innerHTML = data.amount;
      document.getElementById("hash").innerHTML = data.hash;
    } else if (data.error == "Invalid Hash") {
      window.location.href = "/cash/fail.html";
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
});

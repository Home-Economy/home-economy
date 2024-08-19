document.addEventListener("DOMContentLoaded", async function () {
  let initialsElement = document.getElementById("initials");
  let number = document.getElementById("number");
  let name = document.getElementById("name");
  let cvv = document.getElementById("cvv");

  let holder = localStorage.getItem("holder");
  if (holder) {
    let initials = holder
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("")
      .toUpperCase();
    initialsElement.value = initials;
  }

  let numberValue = localStorage.getItem("number");
  if (numberValue) {
    number.value = numberValue.replace(/(\d{4})(?=\d)/g, "$1 ");
  }
  if (holder) {
    name.value = holder;
  }
  let cvvValue = localStorage.getItem("cvv");
  if (cvvValue) {
    cvv.value = cvvValue;
  }
});

let currentPage = 1;
let itemsPerPage;

document.addEventListener("DOMContentLoaded", async function () {
  itemsPerPage = calculateItemsPerPage();
  await fetchData(currentPage);
  setupPaginationControls();
});

function calculateItemsPerPage() {
  const rowHeight = 46;
  const screenHeight = window.innerHeight - 125;
  const headerHeight = 100;
  const availableHeight = screenHeight - headerHeight;
  return Math.floor(availableHeight / rowHeight);
}

async function fetchData(page) {
  let response = await fetch(
    `http://192.168.1.191:3000/card/transact/listStatements?id=${localStorage.getItem(
      "id"
    )}&page=${page}&pageSize=${itemsPerPage}`
  );
  data = await response.json();
  table = document.querySelector("#table");

  if (table) {
    let tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    data.forEach((transaction) => {
      let tr = document.createElement("tr");
      let date = new Date(transaction.createdAt);
      let formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
      tr.innerHTML = `
              <td>${transaction.statement}</td>
              <td>${formattedDate}</td>
              <td>$${transaction.amount}</td>
          `;
      tbody.appendChild(tr);
    });
  } else {
    console.error("Table with ID 'table' not found.");
  }
}

function setupPaginationControls() {
  const paginationContainer = document.querySelector("#pagination");
  const prevButton = document.getElementById("prevButton");
  const pageInput = document.getElementById("pageInput");
  const nextButton = document.getElementById("nextButton");

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      pageInput.value = currentPage;
      fetchData(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    pageInput.value = currentPage;
    fetchData(currentPage);
  });

  pageInput.addEventListener("change", () => {
    const newPage = parseInt(pageInput.value, 10);
    if (!isNaN(newPage) && newPage > 0) {
      currentPage = newPage;
      fetchData(currentPage);
    } else {
      pageInput.value = currentPage;
    }
  });
}

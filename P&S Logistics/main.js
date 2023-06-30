function addItem() {
  var table = document.getElementById("invoice-table");
  var row = table.insertRow(-1);
  row.classList.add("slide-in");

  var quantityCell = row.insertCell(0);
  var itemCell = row.insertCell(1);
  var priceCell = row.insertCell(2);
  var actionCell = row.insertCell(3);

  quantityCell.innerHTML = "<input type='number' class='quantity-input' min='1' value='1' oninput='calculateTotal()'>";
  itemCell.innerHTML = "<input type='text' class='item-input' oninput='calculateTotal()' maxlength='50'></textarea>";
  priceCell.innerHTML = "<input type='number' class='price-input' min='0' step='0.01' oninput='calculateTotal()'>";
  actionCell.innerHTML = "<button type='button' class='delete-btn' onclick='deleteItem(this)'>Delete</button>";

  calculateTotal();
}

function deleteItem(btn) {
  var row = btn.parentNode.parentNode;
  row.classList.add("slide-out");
  setTimeout(function() {
    row.parentNode.removeChild(row);
    calculateTotal();
  }, 500);
}
  
  function calculateTotal() {
    var quantityInputs = document.getElementsByClassName("quantity-input");
    var priceInputs = document.getElementsByClassName("price-input");
    var total = 0;
  
    for (var i = 0; i < quantityInputs.length; i++) {
      var quantity = parseInt(quantityInputs[i].value);
      var price = parseFloat(priceInputs[i].value);
  
      if (!isNaN(quantity) && !isNaN(price)) {
        total += quantity * price;
      }
    }
  
    document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
  }

function updateDate() {
  var dateElement = document.getElementById("invoice-date");
  var currentDate = new Date().toLocaleDateString();
  dateElement.textContent = "Date: " + currentDate;
}

updateDate();
setInterval(updateDate, 1000);




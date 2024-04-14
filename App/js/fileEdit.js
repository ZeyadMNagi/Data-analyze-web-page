const done = document.getElementById("delDone");

function deleteCol() {
  var columnDel = document.getElementById("delCol").value;
  var index = csvData.columns.findIndex((column) => column[0] === columnDel);

  if (index !== -1) {
    csvData.columns.splice(index, 1);
    done.innerText =   `The  ${columnDel} column has been deleted.`;
    update();
    renderData();
  } else {
    alert("Column not found");
  }
}

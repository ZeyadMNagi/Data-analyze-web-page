function update() {
  document.getElementById("data1").innerHTML = "";
  document.getElementById("data2").innerHTML = "";
  document.getElementById("data3").innerHTML = "";
  document.getElementById("data4").innerHTML = "";
  document.getElementById("delCol").innerHTML = "";

  // Populate dropdowns with column names
  for (let i = 0; i < csvData.columns.length; i++) {
    const columnName = csvData.columns[i][0];
    document.getElementById(
      "data1"
    ).innerHTML += `<option value="${columnName}">${columnName}</option>`;
    document.getElementById(
      "data2"
    ).innerHTML += `<option value="${columnName}">${columnName}</option>`;
    document.getElementById(
      "data3"
    ).innerHTML += `<option value="${columnName}">${columnName}</option>`;
    document.getElementById(
      "data4"
    ).innerHTML += `<option value="${columnName}">${columnName}</option>`;
    document.getElementById(
      "delCol"
    ).innerHTML += `<option value="${columnName}">${columnName}</option>`;
  }
}

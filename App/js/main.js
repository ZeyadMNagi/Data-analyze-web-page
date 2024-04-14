var csvData = [];
var numRowsToShow = 10;
var numRowsToShowIncrement = 20;
var currentNumRowsShown = 0;
var switchers = document.querySelectorAll(".case");
var sections = document.querySelectorAll(".part");

// Add event listener for file input change
document
  .getElementById("fileInput")
  .addEventListener("change", handleFileSelect, false);
var evColumn;
var evRow;

// Function to allow dropping files
function allowDrop(ev) {
  ev.preventDefault();
}

// Function to handle file drop
function drop(ev) {
  ev.preventDefault();
  var files = ev.dataTransfer.files;
  handleFiles(files);
}

// Function to handle file selection
function handleFileSelect(event) {
  var files = event.target.files;
  handleFiles(files);
}

// Function to display more rows
function showMoreRows() {
  for (
    var i = currentNumRowsShown + 1;
    i <
    Math.min(
      csvData.columns[0].length,
      currentNumRowsShown + numRowsToShowIncrement + 1
    );
    i++
  ) {
    var row = document.createElement("tr");

    for (var j = 0; j < csvData.columns.length; j++) {
      var cell = document.createElement("td");
      cell.textContent = csvData.columns[j][i];
      row.appendChild(cell);

      dataContent.appendChild(row);
    }
    document.getElementById("dataContent").appendChild(row);
  }
  currentNumRowsShown += numRowsToShowIncrement;
}

// Function to close file uploader
function closeUploader() {
  document.getElementById("fileInput").value = "";
  document.querySelector(".upload").style.display = "none";
}

// Function to switch sections
function switchSection(me, i) {
  switchers.forEach((item) => {
    item.classList.remove("active");
  });
  me.classList.add("active");
  sections.forEach((item) => {
    item.style.display = "none";
  });
  var sectionId = switchers[i].dataset.sec;
  document.getElementById(sectionId).style.display = "flex";
}

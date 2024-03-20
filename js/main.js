var csvData = []; 
var numRowsToShow = 10; 
var numRowsToShowIncrement = 20; // Incremental number of rows to display when showing more
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

// Function to handle selected files
function handleFiles(files) {
  if (files.length === 0) {
    alert("No files selected.");
    return;
  }

  var validFiles = [];
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.type === "text/csv" || file.type === "application/csv") {
      validFiles.push(file);
    } else {
      alert("File '" + file.name + "' is not a CSV file.");
    }
  }

  if (validFiles.length === 0) {
    alert("No valid CSV files selected.");
    return;
  }

  // Proceed with valid CSV files
  var reader = new FileReader();
  reader.onload = function (event) {
    csvData = parseCSV(event.target.result);
    renderData();
  };

  reader.readAsText(validFiles[0]);
}

// Function to parse CSV data
function parseCSV(csvData) {
  var lines = csvData.split("\n");
  var result = [];

  // Initialize an array to hold each column separately
  var columns = [];
  for (var i = 0; i < lines[0].split(",").length; i++) {
    columns.push([]);
  }

  for (var i = 0; i < lines.length; i++) {
    var cells = lines[i].split(",");
    result.push(cells);

    // Iterate over each cell and store the data into corresponding columns
    for (var j = 0; j < cells.length; j++) {
      columns[j].push(cells[j]);
    }
  }
  evColumn = columns;
  evRow = result;
  console.log("evColumn: ", evColumn, "evRow: ", evRow);

  // Return an object containing both the original rows and the extracted columns
  return {
    rows: result,
    columns: columns,
  };
}

// Function to render CSV data onto the webpage
function renderData() {
  var dataContent = document.getElementById("dataContent");
  dataContent.innerHTML = ""; // Clear previous data

  // Create table header
  var headerRow = document.createElement("tr");
  for (var i = 0; i < csvData.rows[0].length; i++) {
    var cell = document.createElement("th");
    cell.textContent = csvData.rows[0][i];
    headerRow.appendChild(cell);
  }
  dataContent.appendChild(headerRow);

  // Show initial rows
  currentNumRowsShown = numRowsToShow;
  for (var i = 1; i < Math.min(csvData.rows.length, numRowsToShow + 1); i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < csvData.rows[i].length; j++) {
      var cell = document.createElement("td");
      cell.textContent = csvData.rows[i][j];
      row.appendChild(cell);
    }
    dataContent.appendChild(row);
  }
  // Add options in the dropdown menu
  update();
}

// Function to display more rows
function showMoreRows() {
  for (
    var i = currentNumRowsShown + 1;
    i <
    Math.min(
      csvData.rows.length,
      currentNumRowsShown + numRowsToShowIncrement + 1
    );
    i++
  ) {
    var row = document.createElement("tr");
    for (var j = 0; j < csvData.rows[i].length; j++) {
      var cell = document.createElement("td");
      cell.textContent = csvData.rows[i][j];
      row.appendChild(cell);
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
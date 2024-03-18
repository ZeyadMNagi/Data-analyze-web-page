//Variables
var csvData = [];
var numRowsToShow = 10;
var numRowsToShowIncrement = 20;
var currentNumRowsShown = 0;
var switchers = document.querySelectorAll(".case");
var sections = document.querySelectorAll(".part");


//darg and  drop functionality for CSV file uploading
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var files = ev.dataTransfer.files;
  handleFiles(files);
}

// File reading

function handleFileSelect(event) {
  var files = event.target.files;
  handleFiles(files);
}

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

function parseCSV(csvData) {
  var lines = csvData.split("\n");
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    var cells = lines[i].split(",");
    result.push(cells);
  }
  return result;
}

//rendering the file  data on to the webpage

function renderData() {
  var dataContent = document.getElementById("dataContent");
  dataContent.innerHTML = ""; // Clear previous data

  // Create table header
  var headerRow = document.createElement("tr");
  for (var i = 0; i < csvData[0].length; i++) {
    var cell = document.createElement("th");
    cell.textContent = csvData[0][i];
    headerRow.appendChild(cell);
  }
  dataContent.appendChild(headerRow);

  // Show initial rows
  currentNumRowsShown = numRowsToShow;
  for (var i = 1; i < Math.min(csvData.length, numRowsToShow + 1); i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < csvData[i].length; j++) {
      var cell = document.createElement("td");
      cell.textContent = csvData[i][j];
      row.appendChild(cell);
    }
    dataContent.appendChild(row);
  }
}

// Show more btn
function showMoreRows() {
  for (
    var i = currentNumRowsShown + 1;
    i <
    Math.min(csvData.length, currentNumRowsShown + numRowsToShowIncrement + 1);
    i++
  ) {
    var row = document.createElement("tr");
    for (var j = 0; j < csvData[i].length; j++) {
      var cell = document.createElement("td");
      cell.textContent = csvData[i][j];
      row.appendChild(cell);
    }
    document.getElementById("dataContent").appendChild(row);
  }
  currentNumRowsShown += numRowsToShowIncrement;
}

function closeUploader() {
  document.getElementById("fileInput").value = "";
  document.querySelector(".upload").style.display = "none";
}

//section switch

function swich_section(me, i) {
  switchers.forEach((item) => {
    item.classList.remove("active");
  });
  me.classList.add("active");

  sections.forEach((item) => {
    item.style.display = "none";
  });
  var sectionId = switchers[i].dataset.sec;
  document.getElementById(sectionId).style.display = "block";
  console.log(sectionId)
}


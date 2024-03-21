const columns = document.querySelectorAll("#columns");

var data1;
var data2;
var data3;
var chartType;

function createChart() {
  data1 = document.querySelector(".data1").value;
  data2 = document.querySelector(".data2").value;
  chartType = document.getElementById("chartType").value;

  // Check if both data fields are selected
  if (!data1 || !data2) {
    alert("Please select both data fields.");
    return;
  }

  // Find the indices of selected data fields
  var index1 = csvData.columns.findIndex((column) => column[0] === data1);
  var index2 = csvData.columns.findIndex((column) => column[0] === data2);

  // Extract x and y values for the plot
  var ValuesX = csvData.columns[index1].slice(1);
  var ValuesY = csvData.columns[index2].slice(1);

  var xValues = ValuesX.map(Number);
  var yValues = ValuesY.map(Number);

  // Create Plotly trace based on selected chart type
  var trace;
  if (chartType === "bar") {
    trace = {
      x: xValues,
      y: yValues,
      type: "bar",
    };
  } else if (chartType === "line") {
    trace = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
    };
  } else if (chartType === "scatter") {
    trace = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "markers",
    };
  } else {
    alert("Invalid chart type selected.");
    return;
  }

  // Create plot layout
  var layout = {
    title: "Data Visualization",
    xaxis: {
      title: data1,
    },
    yaxis: {
      title: data2,
    },
  };

  // Plot the trace
  Plotly.newPlot("myChart", [trace], layout);
}

function createSingleChart() {
  data3 = document.querySelector(".data3").value;
  chartType = document.getElementById("singleType").value;

  var index3 = csvData.columns.findIndex((column) => column[0] === data3);

  var xValues = csvData.columns[index3].slice(1); // Exclude header
  var Values = xValues.map(Number);

  if (chartType === "pie") {
    trace = {
      labels: Values,
      values: data3,
      type: "pie",
    };
  } else if (chartType === "box") {
    trace = {
      y: Values,
      type: "box",
    };
  } else {
    alert("Invalid single chart type selected.");
    return;
  }
  const layout = { title: data3 };
  Plotly.newPlot("singleMyChart", [trace], layout);
}

function createHeatmap() {
  var zValues = csvData.columns;

  var numRows = zValues[0].length;
  var numCols = zValues.length;
  var rowLabels = [];
  var colLabels = [];

  for (var i = 0; i < numRows; i++) {
    rowLabels.push(i);
  }
  for (var j = 0; j < numCols; j++) {
    colLabels.push(j);
  }

  console.log(rowLabels, colLabels);

  var data = [
    {
      z: zValues,
      x: rowLabels,
      y: rowLabels,
      type: "heatmap",
    },
  ];

  // Layout for the heatmap
  var layout = {
    title: "Heatmap",
    xaxis: {
      title: evRow[0],
    },
    yaxis: {
      title: evRow[0],
    },
  };

  // Plot the heatmap
  Plotly.newPlot("heatMapDiv", data, layout);
}

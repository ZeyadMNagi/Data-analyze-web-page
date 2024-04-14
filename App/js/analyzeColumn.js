const dataShow = document.getElementById("ana");
var text;
var old;

function analyzeColumn() {
  var column = document.getElementById("data4").value;
  if (column == "") {
    alert("Please enter a valid number");
  } else {
    dataProcessing(column);
  }
}

function dataProcessing(colName) {
  if (!colName || !csvData.columns.includes(colName)) {
    console.error("Invalid column name provided.");
    return;
  }

  const index = csvData.columns.findIndex((column) => column[0] === colName);
  const stValues = csvData.columns[index].slice(1);
  const values = stValues.map(Number);

  const meanElement = document.getElementById("mean");
  const medianElement = document.getElementById("median");
  const modeElement = document.getElementById("mode");
  const maxElement = document.getElementById("max");
  const minElement = document.getElementById("min");
  const rangeElement = document.getElementById("range");
  const standardDeviationElement = document.getElementById("standardDeviation");

  const calculateMean = () => {
    const total = values.reduce((acc, val) => acc + val, 0);
    const meanValue = total / values.length;
    meanElement.textContent = `Mean of ${colName}: ${meanValue}`;
    return meanValue;
  };

  const calculateMedian = () => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const n = sortedValues.length;
    const medianValue =
      n % 2 === 0
        ? (sortedValues[n / 2 - 1] + sortedValues[n / 2]) / 2
        : sortedValues[Math.floor(n / 2)];
    medianElement.textContent = `Median of ${colName}: ${medianValue}`;
    return medianValue;
  };

  const calculateMode = () => {
    const frequencyMap = new Map();
    values.forEach((val) => {
      frequencyMap.set(val, (frequencyMap.get(val) || 0) + 1);
    });
    const maxFrequency = Math.max(...frequencyMap.values());
    const modes = [...frequencyMap.keys()].filter(
      (key) => frequencyMap.get(key) === maxFrequency
    );
    modeElement.textContent = `Mode/s of ${colName}: ${modes}`;
    return modes;
  };

  const calculateMax = () => {
    const maxValue = Math.max(...values);
    maxElement.textContent = `Max value in ${colName}: ${maxValue}`;
    return maxValue;
  };

  const calculateMin = () => {
    const minValue = Math.min(...values);
    minElement.textContent = `Min value in ${colName}: ${minValue}`;
    return minValue;
  };

  const calculateRange = () => {
    const rangeValue = `${calculateMin()} - ${calculateMax()}`;
    rangeElement.textContent = `Range of values in ${colName}: ${rangeValue}`;
    return rangeValue;
  };

  const calculateStandardDeviation = () => {
    const meanValue = calculateMean();
    const squaredDifferences = values.map((val) =>
      Math.pow(val - meanValue, 2)
    );
    const variance =
      squaredDifferences.reduce((acc, curr) => acc + curr, 0) / values.length;
    const standardDeviationValue = Math.sqrt(variance);
    standardDeviationElement.textContent = `Standard Deviation of ${colName}: ${standardDeviationValue}`;
    return standardDeviationValue;
  };

  calculateMean();
  calculateMedian();
  calculateMode();
  calculateMax();
  calculateMin();
  calculateRange();
  calculateStandardDeviation();
}

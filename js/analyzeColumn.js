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
  var index = csvData.columns.findIndex((column) => column[0] === colName);
  var stValues = csvData.columns[index].slice(1);

  var Values = stValues.map(Number);

  const mean = () => {
    let total = 0;
    for (let i = 0; i < Values.length; i++) {
      total += Values[i];
    }
    document.getElementById("mean").innerHTML = `Mean of ${colName}: ${
      total / Values.length
    }`;

    return total / Values.length;
  };

  const median = () => {
    Values.sort((a, b) => a - b);
    let n = Values.length;
    if (n % 2 == 0) {
      document.getElementById("median").innerHTML = `Median of   ${colName}: ${
        (Values[n / 2 - 1] + Values[n / 2]) / 2
      }`;
      return (Values[n / 2 - 1] + Values[n / 2]) / 2;
    } else {
      document.getElementById("median").innerHTML = `Median of ${colName}: ${
        Values[(n - 1) / 2]
      }`;
      return Values[Math.floor((n - 1) / 2)];
    }
  };

  const mode = () => {
    var modes = [];
    var count = [];
    var maxCount = 0;
    for (var i = 0; i < Values.length; i++) {
      var x = Values[i];
      count[x] = count[x] || 0;
      count[x]++;

      if (count[x] > maxCount) {
        maxCount = count[x];
        modes = [x];
      } else if (count[x] == maxCount) {
        modes.push(x);
      }
    }
    document.getElementById(
      "mode"
    ).innerHTML = `Mode/s of ${colName}: ${modes}`;
    return modes;
  };

  const max = () => {
    document.getElementById(
      "max"
    ).innerHTML = `Max value in ${colName}: ${Math.max(...Values)}`;
    return Math.max(...Values);
  };

  const min = () => {
    document.getElementById(
      "min"
    ).innerHTML = `Min value in ${colName}: ${Math.min(...Values)}`;
    return Math.min(...Values);
  };

  const range = () => {
    document.getElementById(
      "range"
    ).innerHTML = `Range of values in ${colName}: ${`${min()} - ${max()}`}`;
    return `${min()} - ${max()}`;
  };

  const standardDeviation = () => {
    const meanValue = mean();
    const squaredDifferences = Values.map((value) =>
      Math.pow(value - meanValue, 2)
    );
    const variance =
      squaredDifferences.reduce((acc, curr) => acc + curr, 0) / Values.length;
    document.getElementById(
      "standardDeviation"
    ).innerHTML = `Standard Deviation of ${colName}: ${Math.sqrt(variance)}`;
    return Math.sqrt(variance);
  };

  // const text = `Mean of ${colName} is ${mean()}. \n Median of ${colName} is ${median()}. \n
  // Mode of ${colName} is ${mode()}. \n
  // Max of ${colName} is ${max()}. \n
  // Min of ${colName} is ${min()}. \n
  // Range of ${colName} is ${range()}. \n
  // Standard Deviation of ${colName} is ${standardDeviation()}. \n
  // `;

  // if (colName == old) {
  //   alert("Please change the column name");
  // } else {
  //   dataShow.innerHTML = "";
  //   for (let i = 0; i < text.length; i++) {
  //     setTimeout(function () {
  //       dataShow.innerHTML += text.charAt(i);
  //     }, 15 * i);
  //   }
  // }

  mean();
  median();
  mode();
  max();
  min();
  range();
  standardDeviation();

  old = colName;
}

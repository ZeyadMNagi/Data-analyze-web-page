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
  console.log(colName);

  var index = csvData.columns.findIndex((column) => column[0] === colName);
  var stValues = csvData.columns[index].slice(1);

  var Values = stValues.map(Number);

  console.log(Values);

  const mean = () => {
    let total = 0;
    for (let i = 0; i < Values.length; i++) {
      total += Values[i];
    }
    return total / Values.length;
  };

  const median = () => {
    Values.sort((a, b) => a - b);
    let n = Values.length;
    if (n % 2 == 0) {
      return (Values[n / 2 - 1] + Values[n / 2]) / 2;
    } else {
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

    return modes;
  };

  const max = () => {
    return Math.max(...Values);
  };

  const min = () => {
    return Math.min(...Values);
  };

  const range = () => {
    return max() - min();
  };

  const standardDeviation = () => {
    const meanValue = mean();
    const squaredDifferences = Values.map((value) =>
      Math.pow(value - meanValue, 2)
    );
    const variance =
      squaredDifferences.reduce((acc, curr) => acc + curr, 0) / Values.length;
    return Math.sqrt(variance);
  };

  //   console.log("Mean:", mean());
  //   console.log("Median:", median());
  //   console.log("Mode:", mode());
  //   console.log("Max:", max());
  //   console.log("Min:", min());
  //   console.log("Range:", range());
  //   console.log("Standard Deviation:", standardDeviation());

  const text = `Mean of ${colName} is ${mean()}. \n Median of ${colName} is ${median()}. \n
  Mode of ${colName} is ${mode()}. \n
  Max of ${colName} is ${max()}. \n
  Min of ${colName} is ${min()}. \n
  Range of ${colName} is ${range()}. \n
  Standard Deviation of ${colName} is ${standardDeviation()}. \n
  `;

  if (colName == old) {
    alert("Please change the column name");
  } else {
    dataShow.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      setTimeout(function () {
        dataShow.innerHTML += text.charAt(i);
      }, 15 * i);
    }
  }
  old = colName;
}

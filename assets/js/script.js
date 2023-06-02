function solveModifiedEulerMethod() {
    var equation = document.getElementById('equation').value; // Уравнение по умолчанию
    var start = parseFloat(document.getElementById('start').value);
    var end = parseFloat(document.getElementById('end').value);
    var step = parseFloat(document.getElementById('step').value);
    var initialX = parseFloat(document.getElementById('initialX').value);
    var initialY = parseFloat(document.getElementById('initialY').value);
  
    // Добавление шага к конечной точке интервала
    end += step;
  
    var n = Math.ceil((end - start) / step);
    var x = new Array(n + 1);
    var y = new Array(n + 1);
    x[0] = initialX;
    y[0] = initialY;
  
    for (var i = 0; i < n; i++) {
      var currentX = x[i];
      var currentY = y[i];
  
      // Расчет значения Y(1/2)
      var intermediateX = currentX + (step / 2);
      var intermediateY = currentY + (step / 2) * evaluateEquation(equation, currentX, currentY);
  
      // Расчет значения Y(i+1)
      var nextX = currentX + step;
      var nextY = currentY + step * evaluateEquation(equation, intermediateX, intermediateY);
  
      // Обновление значений x и y
      x[i + 1] = nextX;
      y[i + 1] = nextY;
    }
  
    // Вывод результатов
    var resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = '';
    for (var i = 0; i <= n; i++) {
      var row = resultTable.insertRow();
      if (i === 0) {
        row.insertCell().innerText = "0";
        row.insertCell().innerText = x[i].toFixed(2);
        row.insertCell().innerText = y[i].toFixed(3);
      } else if (i === 1) {
        row.insertCell().innerText = "1/2";
        row.insertCell().innerText = (x[i - 1] + step / 2).toFixed(2);
        row.insertCell().innerText = (y[i - 1] + step / 2 * evaluateEquation(equation, x[i - 1], y[i - 1])).toFixed(3);
      } else if (i === n) {
        row.insertCell().innerText = (i - 1).toFixed(0);
        row.insertCell().innerText = x[i - 1].toFixed(2);
        row.insertCell().innerText = y[i - 1].toFixed(3);
      } else {
        row.insertCell().innerText = (i - 1).toFixed(0);
        row.insertCell().innerText = x[i - 1].toFixed(2);
        row.insertCell().innerText = y[i - 1].toFixed(3);
      }
    }
  }
  
  function evaluateEquation(equation, x, y) {
    // Замена строки cos(y) на Math.cos(y)
    equation = equation.replace(/cos\(/g, "Math.cos(");
    // Замена строки sin(y) на Math.sin(y)
    equation = equation.replace(/sin\(/g, "Math.sin(");

    equation = equation.replace(/x\^2/g, "Math.pow(x, 2)");
  
    var result = eval(equation.replace(/X/g, x).replace(/Y/g, y));
    return result;
  }
  
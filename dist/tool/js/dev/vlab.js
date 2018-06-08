var Vlab = {

    div: null,

    setVariant: function (str) {
    },
    setPreviosSolution: function (str) {
    },
    setMode: function (str) {
    },

    //Инициализация ВЛ
    init: function () {
        this.div = $("#jsLab");
        this.taskContainer = $("<div></div>").addClass('task-container');
        this.coefficientsContainer = $("<div></div>").addClass('coeff-container');
        this.resultsContainer = $("<div></div>").addClass('results-container');
        this.div.append(this.taskContainer);
        this.div.append(this.coefficientsContainer);
        this.div.append(this.resultsContainer);
        //получение варианта задания
        var data = this.getData();
        var matrixA = JSON.parse(data[0]);
        var matrixB = JSON.parse(data[1]);

        this.resultsRows = matrixA.length;
        this.resultsCols = matrixB[0].length;

        this.drawMatrix(matrixA, 'A', this.taskContainer);
        this.drawMatrix(matrixB, 'B', this.taskContainer);
        this.drawMatrixCoefficients(this.resultsRows, this.resultsCols, this.resultsContainer);
        this.drawSpecialMatrix(this.resultsRows, this.resultsCols, 'C', this.resultsContainer);

        $(".matrixValue").change(function () {
            var value = $(this).find('input').val();
            var className = $(this).attr('class').replace('matrixValue', '').replace(' ', '');
            $(`.${className}`).find('input').val(value);
        });
    },
    getData: function () {
        return $("#preGeneratedCode").val().split(';');
    },
    drawResultsCoefficients: function (rows, cols, container) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var string = $(`<p>c<sub>${i + 1}${j + 1}</sub> = <input/></p>`).addClass(`matrixValue coeff${i}${j}`);
                this.coefficientsContainer.append(string);
            }
        }
        container.append(this.coefficientsContainer);
    },
    drawMatrix: function (matrix, matrixName, container) { //Change NAME!!!
        var rows = matrix.length;
        var cols = matrix[0].length;
        (container).append("<span>" + matrixName + "= </span>");
        var table = $('<table>').addClass('matrix').appendTo(container);

        for (var i = 0; i < rows; i++) {
            var row = $('<tr />');
            table.append(row);
            for (var j = 0; j < cols; j++) {
                var cell = $(`<td>${matrix[i][j]}</td>`);
                row.append(cell);
            }
        }
    },
    drawResultMatrix: function (rows, cols, matrixName, container) { //Change NAME!!!
        (container).append(`<span>${matrixName} = </span>`);
        var table = $('<table>').addClass('matrix').appendTo(container);

        for (var i = 0; i < rows; i++) {
            var row = $('<tr />');
            table.append(row);
            for (var j = 0; j < cols; j++) {
                var cell = $('<td><input readonly></td>').addClass(`userVals coeff${i}${j}`);
                row.append(cell);
            }
        }
    },
    getCondition: function () {
    },
    getResults: function () {
        var result = [];
        for (var i = 0; i < this.resultsRows; i++) {
            result[i] = [];
            for (var j = 0; j < this.resultsCols; j++) {
                result[i][j] = parseInt($(`.coeff${i}${j}`).find('input').val());
            }
        }
        return result
    },
    calculateHandler: function (text, code) {
    },
}

window.onload = function () {
    Vlab.init();
};

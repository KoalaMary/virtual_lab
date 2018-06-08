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
        this.drawResultsCoefficients(this.resultsRows, this.resultsCols, this.resultsContainer);
        this.drawResultMatrix(this.resultsRows, this.resultsCols, 'C', this.resultsContainer);

        $(".term").change(function () {
            var classes = $(this).attr('class');
            var className = classes.substring(classes.indexOf("sum"), classes.indexOf("sum") + 5);
            var elem1 = $(`.${className}.elem1`).val();
            var elem2 = $(`.${className}.elem2`).val();
            var elem3 = $(`.${className}.elem3`).val();
            var elem4 = $(`.${className}.elem4`).val();

            if (elem1 && elem2 && elem3 && elem4) {
                var value = elem1 * elem2 + elem3 * elem4;
                $(`span.${className}`).text(value);
                $(`.${className}`).find('input').val(value);
            }
            else {
                $(`span.${className}`).text('');
                $(`.${className}`).find('input').val('');
            }
        });
    },
    getData: function () {
        return $("#preGeneratedCode").val().split(';');
    },
    drawResultsCoefficients: function (rows, cols, container) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var sum = `<input class="term sum${i}${j} elem1"> × <input class="term sum${i}${j} elem2"> + <input class="term sum${i}${j} elem3"> × <input class="term sum${i}${j} elem4">`;
                var string = $(`<p>c<sub>${i + 1}${j + 1}</sub> = ${sum} = <span class="sum${i}${j}"></span></p>`).addClass(`matrixValue coeff${i}${j}`);
                this.coefficientsContainer.append(string);
            }
        }
        container.append(this.coefficientsContainer);
    },
    drawMatrix: function (matrix, matrixName, container) {
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
    drawResultMatrix: function (rows, cols, matrixName, container) {
        (container).append(`<span>${matrixName} = </span>`);
        var table = $('<table>').addClass('matrix').appendTo(container);

        for (var i = 0; i < rows; i++) {
            var row = $('<tr />');
            table.append(row);
            for (var j = 0; j < cols; j++) {
                var cell = $('<td><input readonly></td>').addClass(`userVals sum${i}${j}`);
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

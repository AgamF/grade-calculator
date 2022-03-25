var render = function (type, text, id, position) {
    var elem = document.createElement(type);
    if (text)
        elem.innerText = text;
    if (id)
        elem.id = id;
    if (position) {
        position.appendChild(elem);
    }
    else
        document.body.appendChild(elem);
};
var gradecount = document.querySelector('input');
var submitBtn = document.querySelector('button');
var gradefield = document.querySelector('div');
var resultfield = document.getElementById('result');
submitBtn.onclick = function () {
    if (isNaN(+gradecount.value)) {
        return alert("That is not a number!");
    }
    else if (+gradecount.value <= 0) {
        return alert("Can't be smaller than or equal to 0!");
    }
    gradecount.remove(), submitBtn.remove();
    for (var i = 1; i < +gradecount.value + 1; i++) {
        render('input', null, "grade".concat(i), gradefield);
        var grade = document.getElementById("grade".concat(i));
        grade.placeholder = "Grade ".concat(i);
    }
    render("button", "Calculate", 'calc', gradefield);
    var calcBtn = document.getElementById('calc');
    calcBtn.onclick = function () {
        var grades = document.querySelectorAll('input');
        var result;
        var total = 0;
        for (var _i = 0, _a = grades; _i < _a.length; _i++) {
            var grade = _a[_i];
            if (isNaN(+grade.value))
                return alert("Whoops, you haven't entered a number!");
            total += +grade.value;
        }
        result = Math.floor(total / +gradecount.value);
        render('h1', "Your score average is ".concat(result), 'result', resultfield);
        document.getElementById('result').classList.add('animate__animated', 'animate__bounceInUp');
        render('button', 'Refresh', 'refresh');
        document.getElementById('refresh').onclick = function () { return window.location.reload(); };
    };
};

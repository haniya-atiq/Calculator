
let display = document.getElementById("display");

let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let value = button.getAttribute("data-value");

        if (value === "C") {
            display.value = "";
        }

        else if (value === "DEL") {
            display.value = display.value.slice(0, -1);
        }

        else if (value === "SIGN") {
            toggleSign();
        }

        else if (value === "=") {
            calculate();
        }

        else {
            display.value += value;
        }

    });

});

function toggleSign() {

    let expression = display.value;

    let match = expression.match(/(\d+\.?\d*|\.\d+)$/);

    if (!match) {
        return;
    }

    let number = match[0];
    let start = match.index;

    let before = expression.slice(0, start);

    if (before.endsWith("-") &&
        (before.length === 1 || /[+*/(]/.test(before.slice(-2, -1)))) {

        before = before.slice(0, -1);

    } else {
        before += "-";
    }

    display.value = before + number;
}

function calculate() {

    try {

        if (display.value === "") {
            return;
        }

        let expression = display.value.replace(/%/g, "/100");

        if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
            throw new Error("Invalid");
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid");
        }

        display.value = Number(result.toPrecision(12));

    }

    catch(error) {
        display.value = "Error";
    }

}

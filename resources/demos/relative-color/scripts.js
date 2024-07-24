function changeColor(event) {
    handleInput(event.target);
}

function handleInput(element) {
    const value = element.value;
    const variable = element.dataset.variable;
    const colorTokens = document.querySelectorAll('.relative-color-token');
    colorTokens.forEach((element) => {
        element.style.setProperty(variable, value);
    });
}

const inputs = document.querySelectorAll('input');
inputs.forEach((element) => {
    handleInput(element);
    element.addEventListener('input', changeColor);
});


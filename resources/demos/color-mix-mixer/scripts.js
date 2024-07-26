function changeColor(event) {
    handleInput(event.target);
}

function handleInput(element) {
    const value = element.value + (element.type === 'range' ? '%' : '');
    const variable = element.dataset.variable;
    const mixer = document.querySelector('#colormixer');
    mixer.style.setProperty(variable, value);
    document.querySelectorAll('[data-colorpicker-value="' + variable + '"]').forEach((valueElement) => {
        valueElement.innerHTML = value;
    });
}

const inputs = document.querySelectorAll('input');
inputs.forEach((element) => {
    handleInput(element);
    element.addEventListener('input', changeColor);
});

const colorspacePicker = document.getElementById('colorspace');
colorspacePicker.addEventListener('change', (event) => {
    const value = event.target.value;
    const variable = event.target.dataset.variable;
    document.getElementById('colormixer').style.setProperty(variable, value);
});

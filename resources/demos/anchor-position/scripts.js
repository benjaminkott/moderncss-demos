document.addEventListener('DOMContentLoaded', function() {

    const tooltip = document.getElementById('tooltip');
    const positionAreaValueContainer = document.getElementById('position-area-value');
    const positionAreaButtons = document.querySelectorAll('button[data-position-area]');
    activateStatus(getComputedStyle(tooltip).getPropertyValue('position-area'));

    positionAreaButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const target = event.target;
            const positionArea = target.dataset.positionArea;
            activateStatus(positionArea);
        });
    });

    function activateStatus(positionArea) {
        positionAreaButtons.forEach((button) => {
            if (button.dataset.positionArea === positionArea) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        tooltip.style.positionArea = positionArea;
        positionAreaValueContainer.innerHTML = `<strong>position-area:</strong> ${positionArea};`;
    }

});

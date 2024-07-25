const selects = document.querySelectorAll('select[data-target]');
selects.forEach((element) => {
    element.addEventListener('change', (event) => {
        const target = document.querySelector(event.target.dataset.target);
        target.style.colorScheme = event.target.value;
    });
});

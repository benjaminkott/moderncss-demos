import '../css/inline.scss';

function handleTriggerInput(element) {
    const target = element.dataset.target ?? null;
    if (!target) {
        return;
    }

    const targetElements = document.querySelectorAll(element.dataset.target);
    if (!targetElements) {
        return;
    }

    const value = element.value + (element.dataset.valueAffix ?? '');
    const valueElements = element.dataset.valueElements ?? null;
    document.querySelectorAll(valueElements).forEach((valueElement) => {
        valueElement.innerHTML = value;
    });

    const attribute = element.dataset.attribute ?? null;
    if (attribute) {
        targetElements.forEach((targetElement) => {
            targetElement.setAttribute(attribute, value);
        });
    }

    const property = element.dataset.property ?? null;
    if (property) {
        targetElements.forEach((targetElement) => {
            targetElement.style.setProperty(property, value);
        });
    }
}

const inputs = document.querySelectorAll('[data-trigger]');
inputs.forEach((element) => {
    handleTriggerInput(element);
    element.addEventListener(element.dataset.trigger, (event) => {
        handleTriggerInput(event.target)
    });
});

window.demotools = {
    notsupported: (message) => {
        const notice = document.createElement('div');
        notice.classList.add('demo-not-supported');
        notice.innerHTML = message;
        document.querySelector('#demo-inner').prepend(notice);
    }
}

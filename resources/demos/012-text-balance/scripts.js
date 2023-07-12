const target = document.querySelector('#target');
const selector = document.querySelector('#textwrap');
selector.addEventListener('change', (event) => {
    target.style.textWrap = event.target.value;
});

if (!CSS.supports('text-wrap', 'balance')) {
    const notice = document.createElement('div');
    notice.classList.add('demo-not-supported');
    notice.innerHTML = 'The browser does not support <strong>text-wrap: balance</strong>.';
    document.querySelector('#demo-inner').prepend(notice);
}

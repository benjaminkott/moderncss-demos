if (!CSS.supports('text-wrap', 'balance', 'pretty')) {
    const notice = document.createElement('div');
    notice.classList.add('demo-not-supported');
    notice.innerHTML = 'The browser does not support <strong>text-wrap: balance</strong>.';
    document.querySelector('#demo-inner').prepend(notice);
}

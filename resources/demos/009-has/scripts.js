try {
    document.querySelector('div:has(div)');
} catch (error) {
    const notice = document.createElement('div');
    notice.classList.add('demo-not-supported');
    notice.innerHTML = 'The browser does not support the selector <strong>:has</strong>.';
    document.querySelector('#demo-inner').prepend(notice);
}

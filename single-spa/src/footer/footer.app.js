let domEl;

export function bootstrap(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl = document.querySelector('#footer');
        });
}
export function mount(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl.textContent = 'I am footer'
        });
}
export function unmount(props) {
    return Promise
        .resolve()
        .then(() => {
            domEl.textContent = '';
        })
}
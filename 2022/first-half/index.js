import App from "./components/App.js";

const $target = document.querySelector('.app');
console.log('$target', $target)
new App({ $target })
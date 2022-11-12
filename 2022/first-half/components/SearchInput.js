const debounce = (callback, delay) => {
  console.log(callback)
  let timerId;

  return event => {
    if (timerId) clearTimeout(timerId)

    timerId = setTimeout(callback, delay, event)
  }
}

export default function SearchInput({ $target, initialState, onChange }) {
  this.$element = document.createElement('form');
  this.$element.className = 'search-input';
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <input class="search-input_input" type="text" placeholder="input programming language!" value="${this.state}" />
    `

    console.dir(this.$element)
  }

  this.render();

  this.$element.addEventListener('keyup', debounce((e) => {
    const { target: { value }, key } = e;

    localStorage.setItem('inputValue', value);

    const ignoreKeys = ['Enter', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

    if (!ignoreKeys.includes(key)) {
      onChange(value);
    }
  }, 1000))

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  })
}
const debounce = (func, delay) => {
  let timerId;

  return event => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(func, delay, event);
  }
}

const throttle = (func, delay) => {
  let timerId;

  return event => {
    if (timerId) return;

    timerId = setTimeout(() => {
      func(event);
      timerId = null;
    }, delay, event);
  }
}

export default function SearchInput({
  $target,
  initialState,
  onChange
}) {
  this.$element = document.createElement('form');
  this.$element.className = 'SearchInput';
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." />
    `

    const input = this.$element.querySelector('.SearchInput__input');
    input.focus();
  }

  this.render();

  // this.$element.addEventListener('keyup', (e) => {
  //   const actionIngnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  //
  //   if (!actionIngnoreKeys.includes(e.key)) {
  //     this.state = e.target.value;
  //     onChange(this.state);
  //   }
  // })
  this.$element.addEventListener('keyup', debounce((e) => {
    const actionIngnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    if (!actionIngnoreKeys.includes(e.key)) {
      this.state = e.target.value;
      onChange(this.state);
    }
  }, 1_000))

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  })
}
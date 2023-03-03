export default function SearchInput({
  $target,
  initialState,
  onChange
}) {
  console.log('component init')
  this.$element = document.createElement('form');
  this.$element.className = 'SearchInput';
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    console.log('render')
    this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." />
    `
  }

  this.render();

  this.$element.addEventListener('keyup', (e) => {
    const actionIngnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

    if (!actionIngnoreKeys.includes(e.key)) {
      onChange(e.target.value);
    }
  })

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  })
}
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

  console.log(this.$element)

  this.$element.addEventListener('keyup', (e) => {
    onChange(e.target.value);
  })
}
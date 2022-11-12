const MAX_DISPLAY_COUNT = 5;

export default function SelectedLanguages({
  $target, initialState,
}) {
  this.$element = document.createElement('div');
  this.$element.className = 'selected-languages';
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;

    if(this.state.length > MAX_DISPLAY_COUNT) {
      const startPosition = this.state.length - MAX_DISPLAY_COUNT;
      this.state = this.state.slice(startPosition, MAX_DISPLAY_COUNT + startPosition)
    }

    this.render();
  }

  this.render = () => {
    if(this.state.length > 0) {
      this.$element.innerHTML = `
        <ul>
          ${this.state.map((item, index) => (
            `<li data-index="${index}">${item}</li>`
          )).join('')}
        </ul>
      `
    }
  }

  this.render();
}
export default function Suggestion ({
  $target,
  initialState,
}) {
  this.$element = document.createElement('div');
  this.$element.className = 'Suggestion'
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    ...initialState,
  };

  this.setState = (nextState) => {
    console.log('Suggestion nextState', nextState)
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  this.render = () => {
    const { items = [], selectedIndex } = this.state;

    console.log('items', items)

    if (items.length > 0) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
        <ul>
          ${items.map((item, index) => `
            <li 
              data-index="${index}"
              style="${index === selectedIndex ? 'color: blue' : ''}"
            >${item}</li>
          `).join('')}
        </ul>
      `;
    } else {
      this.$element.style.display = 'none';
      this.$element.innerHTML = '';
    }
  }

  this.render();

  window.addEventListener('keyup', e => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;
      const navigationKeys = ['ArrowUp', 'ArrowDown'];

      let nextIndex = selectedIndex;

      if (navigationKeys.includes(e.key)) {
        if (e.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
        }

        this.setState({
          ...this.state,
          selectedIndex: nextIndex,
        })
      }
    }
  })
}
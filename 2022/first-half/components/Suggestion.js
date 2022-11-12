export default function Suggestion({
  $target, initialState, onSelect
}) {
  this.$element = document.createElement('div');
  this.$element.className = 'suggestion';
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    ...initialState,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.renderMatchItem = (value, keyword) => {
    console.log(value, keyword)
    if (!value.includes(keyword)) {
      return value;
    }

    const matchText = value.match(new RegExp(keyword, 'gi'));
    return value.replace(new RegExp(matchText, 'gi'), `<strong>${matchText}</strong>`)
    }

  this.render = () => {
    const { items, keyword, selectedIndex } = this.state;

    if(items.length > 0) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
        <ul>
          ${items.map((value, index) => (
            `<li class="${index === selectedIndex ? 'suggestion_item--selected' : ''}" data-index="${index}">${this.renderMatchItem(value, keyword)}</li>`
          )).join('')}
        </ul>
      `
    } else {
      this.$element.style.display = 'none';
      this.$element.innerHTML = ''
    }
  }

  this.render();

  window.addEventListener('keyup', (e) => {
    console.log(this.state.items)
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;
      const allowedKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
      let nextIndex = selectedIndex;

      if (allowedKeys.includes(e.key)) {
        if (e.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : selectedIndex - 1;
        } else if (e.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : selectedIndex + 1;
        } else if (e.key === 'Enter') {
          console.log(this.state)
          onSelect(this.state.items[this.state.selectedIndex])
        }
      }

      this.setState({
        ...this.state,
        selectedIndex: nextIndex
      })
    }
  })

  this.$element.addEventListener('click', (e) => {
    console.log('click!')
    const $li = e.target.closest('li');

    if($li) {
      const { index } = $li.dataset;

      try {
        onSelect(this.state.items[index])
      } catch (e) {
        console.log('error')
      }
    }
  })
}
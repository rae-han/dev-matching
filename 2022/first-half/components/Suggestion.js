export default function Suggestion ({
  $target,
  initialState,
  onSelect,
}) {
  this.$element = document.createElement('div');
  this.$element.className = 'Suggestion'
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    keyword: '',
    ...initialState,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  this.renderMachedItem = (keyword, item) => {
    console.log(keyword, item)
    if (!item.includes(keyword)) {
      return item;
    }

    const matchedText = item.match(new RegExp(keyword, 'gi'))[0];
    return item.replace(new RegExp(matchedText, 'gi'), `<stong style="color: red">${matchedText}</stong>`)
  }

  this.render = () => {
    const { items = [], selectedIndex, keyword } = this.state;

    if (items.length > 0) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
        <ul>
          ${items.map((item, index) => `
            <li 
              data-index="${index}"
              style="${index === selectedIndex ? 'color: blue' : ''}"
            >
              ${this.renderMachedItem(keyword, item)}
            </li>
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
      const navigationKeys = ['Enter', 'ArrowUp', 'ArrowDown'];

      let nextIndex = selectedIndex;

      if (navigationKeys.includes(e.key)) {
        if (e.key === 'ArrowUp') {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === 'ArrowDown') {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
        } else if (e.key === 'Enter') {
          onSelect(this.state.items[this.state.selectedIndex])
        }

        this.setState({
          ...this.state,
          selectedIndex: nextIndex,
        })
      }
    }
  })

  this.$element.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { index } = $li.dataset;

      try {
        onSelect(this.state.items[index])
      } catch (e) {
        console.error(new Error('error!'))
      }
    }
  })
}
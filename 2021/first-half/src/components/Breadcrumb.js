export default function Breadcrumb({ $app, initialState }) {
  this.$element = document.createElement('nav')
  this.$element.className = 'Breadcrumb'
  $app.appendChild(this.$element)

  console.log(initialState)

  this.state = initialState
  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    console.log(this.state)
    this.$element.innerHTML = `<div class="nav-item">root</div>${
      this.state.map(
        (node, index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`).join('')}`
  }

  this.render();
}
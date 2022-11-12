export default function CartListPage({ $target }) {
  this.$page = document.createElement('div');
  this.$page.className = 'CartPage';

  this.$page.innerHTML = '<h1>장바구니</h1>'

  this.render = () => {
    $target.appendChild(this.$page)
  }

  this.render();
}
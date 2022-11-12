import { routeChange } from "../router.js";

export default function ProductList({ $target, initialState }) {
  const $element = document.createElement('ul');
  $target.appendChild($element);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    console.log(nextState)
    this.render();
  }

  this.render = () => {
    if(!this.state) {
      return null;
    }

    $element.innerHTML = `
      ${this.state.map(({imageUrl, name, price, id}, index) => (
      `<li class="Product" data-product-id=${id}>
          <img src="${imageUrl}">
          <div class="Product__info">
            <div>${name}</div>
            <div>${price}원</div>
          </div>
        </li>`
    )).join('')}
    `
  }

  $element.addEventListener('click', e => {
    const $li = e.target.closest('li');
    console.log($li)
    const { productId } = $li.dataset;

    if(productId) {
      routeChange(`/product/${productId}`)
    }
  })

  this.render();
}
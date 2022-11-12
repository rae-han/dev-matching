import ProductList from "../components/ProductList.js";
import { request } from "../api.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'ProductListPage';
  $page.innerHTML = '<h1>Product List</h1>';

  this.render = () =>  {
    $target.append($page)
  }

  this.state = []

  this.setState = (nextState) => {
    console.log(nextState)
    this.state = nextState;
  }

  const fetchProduct = async () => {
    const products = await request('/products');
    this.setState(products)
    productList.setState(products);
  }

  const productList = new ProductList({
    $target: $page,
    initialState: this.state,
  })

  console.log(productList)

  // this.render();
  fetchProduct();

}
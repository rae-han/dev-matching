import { request } from "../api.js";
import ProductDetail from "../components/ProductDetail.js";

export default function ProductDetailPage({ $target, productId }) {
  this.$page = document.createElement('div');
  this.$page.className = 'ProductDetail';

  this.$page.innerHTML = '<h1>제품 상세 페이지</h1>'

  this.state = {
    productId,
    product: null,
    selectedOptions: [],
  }

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    }

    this.render();
    productDetail.setState(this.state)
  }

  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = 'Loading...'
    } else {
      $target.innerHTML = '';
      $target.appendChild(this.$page);
    }
    $target.appendChild(this.$page);
  }

  this.fetchProduct = async () => {
    const { productId } = this.state;
    const product = await request(`/products/${productId}`);
    console.log(product);

    this.setState({
      ...this.state,
      product,
    })
  }

  // this.render();
  this.fetchProduct();

  const productDetail = new ProductDetail({
    $target: this.$page,
    initialState: {
      ...this.state,
      selectedOptions: [],
    }
  })
}
import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import CartListPage from "./CartListPage.js";
import { init } from "../router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname)

    $target.innerHTML = 'DetaulLayout';

    if (pathname === '/web/') {
      new ProductListPage({ $target }).render();
    } else if (pathname.includes('/product')) {
      const [,, productId] = pathname.split('/');
      console.log(productId)
      new ProductDetailPage({ $target, productId });
    } else if (pathname.includes('/cart')) {
      new CartListPage({ $target })
    }
  }

  init(this.route)

  this.route();

  window.addEventListener('popstate', this.route)
}
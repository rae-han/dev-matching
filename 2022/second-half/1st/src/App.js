import Header from "./components/Header.js";
import HomePage from "./components/HomePage.js";
import SignupPage from "./components/SignupPage.js";
import ContentTitle from "./components/ContentTitle.js";
import {setPersonalInfo} from "./api/fetch.js";

export default function App ({
  $target
}) {
  this.state = {
    route: '',
  }

  this.setState = async (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }

    this.render();
  }

  const header = new Header({
    $target,
  })

  this.$main = document.createElement("main");
  this.$main.setAttribute("id", "page_content");
  $target.appendChild(this.$main);

  this.render = async (pathname = '') => {
    const result = await setPersonalInfo();

    switch(pathname) {
      case '/web/':
        contentTitle.setState('Greate People')
        homePage.render();
        break;
      case "/web/signup":
        contentTitle.setState('Greate People')
        signupPage.render();
        break;
      default:
        contentTitle.setState('Greate People')
        homePage.render();
        break;
    }
  }

  const contentTitle = new ContentTitle({
    $target: this.$main,
    title: '',
  })

  const homePage = new HomePage({
    $target: this.$main
  })

  const signupPage = new SignupPage({
    $target: this.$main
  })

  this.render();

  document.addEventListener('urlchange', (e) => {
    let pathname = e.detail.href;
    this.$main.innerHTML = '';

    this.render(pathname);
  })
}
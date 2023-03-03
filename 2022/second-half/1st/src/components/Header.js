export default function Header ({
  $target,
}) {
  this.$header = document.createElement('header');

  this.createMenuElem = (divClass, spanClass, spanId, menuText, url) => {
    const div = document.createElement("div");
    div.setAttribute("class", divClass);
    div.setAttribute('data-url', url)

    const span = document.createElement("span");
    span.setAttribute("class", spanClass);
    span.setAttribute("id", spanId);
    span.appendChild(document.createTextNode(menuText));

    div.appendChild(span);
    return div;
  }

  this.render = () => {
    const homeMenu = this.createMenuElem("header header_left", "menu_name", "menu_home", "HOME", '/web/');
    const signupMenu = this.createMenuElem("header header_right", "menu_name", "menu_signup", "SIGNUP", '/web/signup');

    this.$header.appendChild(homeMenu);
    this.$header.appendChild(signupMenu);
    $target.appendChild(this.$header);
  }

  this.render();

  this.$header.addEventListener('click', (e) => {
    const $menu = e.target.closest('div');

    if ($menu) {
      const { url } = $menu.dataset;

      try {
        window.history.pushState('', '', url);
        const urlChange = new CustomEvent('urlchange', {
          detail: {
            href: url
          }
        });
        document.dispatchEvent(urlChange);
      } catch (e) {
        console.error(e)
      }
    }
  })
}
class Header {
...

    render() {
        ...

        // HOME 메뉴 클릭 이벤트
        home_menu.addEventListener("click", () => {
            window.history.pushState("", "", "/web/");
            const urlChange = new CustomEvent("urlchange", {
                detail: { href: "/web/" }
            });
            document.dispatchEvent(urlChange);
        });

        // SIGNUP 메뉴 클릭 이벤트
        signup_menu.addEventListener("click", () => {
            window.history.pushState("", "", "/web/signup");
            const urlChange = new CustomEvent("urlchange", {
                detail: { href: "/web/signup" }
            });
            document.dispatchEvent(urlChange);
        });
    }
}
export default Header;

class App {
...

    render() {
        ...

        const homePage = new HomePage(main);
        const signupPage = new SignupPage(main);

        homePage.render();

        document.addEventListener("urlchange", (e) => {
            let pathname = e.detail.href;

            switch(pathname) {
                case "/web/":
                    homePage.render();
                    break;
                case "/web/signup":
                    signupPage.render();
                    break;
                default:
            }
        });
    }
}
export default App;
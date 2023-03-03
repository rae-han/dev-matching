import CardPage from "./CardPage.js";

export default function HomePage ({
  $target,
}) {
  this.$main = document.createElement('div');

  const cardPage = new CardPage({ $target: this.$main })

  this.render = () => {
    // this.$main.innerHTML = 'hoem page'
    cardPage.render();

    $target.appendChild(this.$main);
  }
}
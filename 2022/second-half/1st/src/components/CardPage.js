import CardView from "./CardView.js";

export default function CardPage ({
  $target,
}) {
  this.render = () => {
    const cardView = new CardView({ $target });
    cardView.render();
  }
}
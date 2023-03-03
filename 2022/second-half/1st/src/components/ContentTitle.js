export default function ContentTitle ({
  $target,
  title,
}) {
  this.state = title;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  }

  this.render = () => {
    const div = document.createElement("div");
    div.setAttribute("class", "content_title");

    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(this.state));

    div.appendChild(h1);
    $target.appendChild(div);
  }
}
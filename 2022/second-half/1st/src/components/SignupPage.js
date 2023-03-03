export default function HomePage ({
  $target,
}) {
  this.$main = document.createElement('div');
  // this.$main.setAttribute('id', 'page_content');
  // $target.appendChild(this.$main);

  this.render = () => {
    this.$main.innerHTML = 'signup page'

    $target.appendChild(this.$main);
  }
}
import Table from "./Table.js";
import Pagination from "./Pagination.js";

class App {
  constructor($app) {
    this.$app = $app;
    this.render();
  }

  async render() {
    try {
      const response = await fetch('/src/data.json');

      if(response.ok) {
        const data = await response.json();
        console.log(data)

        new Table(data)
        new Pagination(data);
      } else {

      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default App;
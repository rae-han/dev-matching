export const header = ['name', 'title', 'email', 'role'];
export const displayTableData = (data) => {
  const tr = document.createElement("tr");
  for(const item of header) {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(data[item]));
    tr.appendChild(td);
  }
  return tr;
}

class Table {
  constructor(data) {
    this.data = data;

    this.render()
  }

  displayTableHead = () => {
    const thead = document.createElement("thead");
    const theadTr = document.createElement("tr");

    for(let i = 0; i < header.length; i++) {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(header[i]));
      theadTr.appendChild(th);
    }
    thead.appendChild(theadTr);
    return thead;
  }

  render() {
    const table = document.createElement("table");

    // Table Header
    const thead = this.displayTableHead();
    table.appendChild(thead);

    // Table Data Area 그리기
    const tbody = document.createElement("tbody");
    for(let i = 0; i < this.data.length; i++) {
      let tbodyTr = displayTableData(this.data[i])
      tbody.appendChild(tbodyTr);
    }
    table.appendChild(tbody);

    document.getElementById("table").appendChild(table);
  }
}

export default Table;
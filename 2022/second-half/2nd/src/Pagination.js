class Pagination {
  constructor(data) {
    this.data = data;
    this.render();
  }

  paginationBtnsStyle = (maxPageCnt, currentPage) => {
    const buttons = document.querySelectorAll('#pagination > button')
    for(let i = 1; i <= maxPageCnt; i++) {
      buttons[i].classList.remove('active')
      if(currentPage === i) {
        // button[i].classList.add("active");
        buttons[i].classList.add("active")
      }
    }
  }

  paginationBtnClicked = (maxPageCnt, pagePerCnt, currentPage) => {
    console.log(maxPageCnt, pagePerCnt, currentPage)
    const start = (currentPage - 1) * 5;
    const end = (currentPage * 5) - 1;
    console.log(currentPage, start, end)
    this.paginationBtnsStyle(maxPageCnt, currentPage);
  }

  setPaginationBtns = (maxPageCnt, pagePerCnt, currentPage) => {
    // 버튼의 개수만큼 button 요소를 생성합니다.
    for(let i = 0; i <= maxPageCnt+1; i++) {
      const button = document.createElement("button");

      if(i === 0 || i === maxPageCnt+1) {
        button.setAttribute("class", "arrow");
        if (i === 0) {
          button.appendChild(document.createTextNode('<<<'));
        } else {
          button.appendChild(document.createTextNode('>>>'));
        }
      } else {
        button.appendChild(document.createTextNode(i));
      }

      button.addEventListener('click', () => {
        this.paginationBtnClicked(maxPageCnt, pagePerCnt, i);
      });

      document.getElementById('pagination').appendChild(button);
    }
  }

  render() {
    let currentPage = 1;
    let pagePerCnt = 5;
    let maxPageCnt = 5;

    this.setPaginationBtns(maxPageCnt, pagePerCnt, currentPage);
  }
}
export default Pagination;


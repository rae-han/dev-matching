import {setCardStatus} from "../api/fetch.js";

export const cardDiv = (index) => {
  const card_div = document.createElement("div");
  card_div.setAttribute("idx", index);
  card_div.setAttribute("class", "card");

  // 1
  let cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
  console.log(index, cardStorage)
  if(!cardStorage[index]) {
    card_div.setAttribute("class", "card");
    cardStorage.push({
      "idx": index,
      "status": "card"
    });
    localStorage.setItem("cardStatus", JSON.stringify(cardStorage));
  } else {
    card_div.setAttribute("class", cardStorage[index].status);
  }

  card_div.addEventListener('click', (e) => {
    card_div.classList.toggle('is-flipped')

    // 1
    let cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
    console.log(cardStorage, cardStorage[index], cardStorage[index].status)
    cardStorage[index].status = cardStorage[index].status === 'card' ? 'card is-flipped' : 'card';
    localStorage.setItem("cardStatus", JSON.stringify(cardStorage));
  })

  return card_div;
}

export const cardPlane = (side, data) => {
  const cardPlane_div = document.createElement("div");
  cardPlane_div.setAttribute("class", "card_plane card_plane--" + side);
  cardPlane_div.appendChild(document.createTextNode(data));

  return cardPlane_div;
}

export default function CardView ({
  $target,
}) {
  this.render = () => {
    // 카드 상태 저장 1
    setCardStatus();

    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "cards_container");
    $target.appendChild(containerDiv);

    const personalInfo = localStorage.getItem('personalInfo');
    const parsedPersonalInfo = JSON.parse(personalInfo);
    console.log(parsedPersonalInfo)

    // parsedPersonalInfo.map((item, index) => {
    //   // const card = cardDiv(index);    // 카드의 레이아웃 요소
    //   // card.appendChild(cardPlane("front", item.nickname));    // 카드 앞면의 요소
    //   // card.appendChild(cardPlane("back", item.nickname));     // 카드 뒷면의 요소
    //   // containerDiv.appendChild(card);
    // })

    const { index = 0, nickname } = parsedPersonalInfo[0];
    const card = cardDiv(index);    // 카드의 레이아웃 요소
    card.appendChild(cardPlane("front", nickname));    // 카드 앞면의 요소
    card.appendChild(cardPlane("back", nickname));     // 카드 뒷면의 요소
    containerDiv.appendChild(card);

    this.infiniteScroll(containerDiv, personalInfo)
  }

  this.infiniteScroll = (container, localStorage) => {
    let $target = container.lastChild;
    console.log($target)

    const io = new IntersectionObserver((entry, observer) => {
      console.log(entry, observer)
    }, {
      threshold: 0.7
    });

    io.observe($target)
  }
}
const debounce = (callback, delay) => {
  let timerId;

  return event => {
    if (timerId) clearTimeout(timerId)

    timerId = setTimeout(callback, delay, event)
  }
}

const throttle = (callback, delay) => {
  let timerId;

  return event => {
    timerId = setTimeout(() => {
      callback(event);
      timerId = null;
    }, delay, event);
  }
}

export default function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.$element = document.createElement('ul');
  this.$element.className = 'Nodes';
  $app.appendChild(this.$element)

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;

    this.render();
  }

  this.render = () => {
    if (this.state.nodes) {
      const nodeTemplate = this.state.nodes.map((node, index) => {
        const iconPath = node.type ===  'FILE' ? '파일' : '디렉토리'

        return `
          <div class="Node" data-node-id="${node.id}">
            <h3>${iconPath}</h3>
            <div>${node.name}</div>
          </div>
        `;
      }).join('');

      this.$element.innerHTML = !this.state.isRoot ? `<div class="Node">뒤로가기</div>${nodeTemplate}` : nodeTemplate
    }

    this.$element.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      const $node = e.target.closest('.Node');

      if(!$node) {
        return;
      }
      const { nodeId } = $node.dataset;

      if(!nodeId) {
        return onBackClick();
      }
      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

      onClick(selectedNode)
    })

    // this.$element.addEventListener('click', (e) => {
    //   // $target 하위에 있는 HTML 요소 클릭시 이벤트가 상위로 계속 전파 되면서
    //   // $target까지 오게 됨. 이 특성을 이용한 기법.
    //
    //   // closest를 이용하면 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음.
    //   const $node = e.target.closest('.Node')
    //
    //   if ($node) {
    //     const { nodeId } = $node.dataset
    //
    //     if (!nodeId) {
    //       onBackClick()
    //       return
    //     }
    //
    //     const selectedNode = this.state.nodes.find(node => node.id === nodeId)
    //
    //     if (selectedNode) {
    //       onClick(selectedNode)
    //     }
    //   }
    // })
  }

  this.render();
}
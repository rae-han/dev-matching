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
    console.log(44444, this.state.nodes)
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
        return;
      }
      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

      onClick(selectedNode)
    })

    // this.$element.querySelectorAll('.Node').forEach($node => {
    //   $node.addEventListener('click', (e) => {
    //     // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
    //     console.log(e.target)
    //     const { nodeId } = e.target.dataset
    //     console.log(nodeId)
    //     const selectedNode = this.state.nodes.find(node => node.id === nodeId)
    //
    //     if (selectedNode) {
    //       onClick(selectedNode)
    //     }
    //   })
    // })
  }

  this.render();
}
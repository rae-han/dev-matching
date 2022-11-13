import Nodes from "./components/Nodes.js";
import Breadcrumb from './components/Breadcrumb.js'
import ImageView from "./components/ImageView.js";
import { request } from './api.js'

export default function ({ $app }) {
  console.log($app)

  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  }

  this.setState = nextState => {
    this.state = nextState;

    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath)
  }

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  })

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      console.log(node);
      if (node.type === 'DIRECTORY') {
        console.log('directory')
        const nextNodes = await request(`/${node.id}`);

        console.log(nextNodes)

        this.setState({
          ...this.state,
          depth: [...this.state.depth, node],
          nodes: nextNodes,
        })
      } else if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath
        })
      }
    },
  })

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
  })

  const init = async () => {
    try {
      const rootNodes = await request('/')

      console.log(rootNodes)

      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      })
    } catch (e) {
      console.error(e);
    }
  }

  init();
}
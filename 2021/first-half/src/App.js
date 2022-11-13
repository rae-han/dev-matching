import Nodes from "./components/Nodes.js";
import Breadcrumb from './components/Breadcrumb.js'
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import { request } from './api.js'

const cache = {};

export default function ({ $app }) {
  this.state = {
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  }

  this.setState = nextState => {
    this.state = nextState;

    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
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
        if (cache[node.id]) {
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: cache[node.id],
            isRoot: false,
          })
        } else {
          const nextNodes = await request(`/${node.id}`);

          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
            isRoot: false,
          })

          cache[node.id] = nextNodes
        }

        // this.setState({
        //   ...this.state,
        //   isRoot: false,
        //   depth: [...this.state.depth, node],
        //   nodes: nextNodes,
        // })
      } else if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedFilePath: node.filePath
        })
      }
    },
    onBackClick: async () => {
      const nextState = { ...this.state };
      nextState.depth.pop();

      const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id;

      if (prevNodeId === null) {
        const rootNodes = await request('/')
        this.setState({
          ...nextState,
          isRoot: true,
          nodes: rootNodes
        })
      } else {
        const prevNodes = await request(`/${prevNodeId}`)

        this.setState({
          ...nextState,
          isRoot: false,
          nodes: prevNodes,
        })
      }
    }
  })

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
  })

  const loading = new Loading({ $app, initialState: this.state.isLoading })

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      const rootNodes = await request('/')

      console.log(rootNodes)

      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      })
    } catch (e) {
      console.error(e);
    }
  }

  init();
}
export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: []
  }

  this.setSTate = (nextState) => {
    console.log(nextState)
  }
}
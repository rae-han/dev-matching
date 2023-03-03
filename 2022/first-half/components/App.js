import SearchInput from './SearchInput.js';
import Suggestion from './Suggestion.js'
import {fetchLanguage} from "../api.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: []
  }

  this.setState = (nextState) => {
    console.log(nextState)
    this.state = {
      ...this.state,
      ...nextState,
    }

    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    })
  }

  const searchInput = new SearchInput({
    $target,
    initialState: '',
    onChange: async (keyword) => {
      const languages = await fetchLanguage(keyword)
      console.log(languages)

      this.setState({
        fetchedLanguages: languages
      })
    }
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      cursor: 0,
      selectedIndex: 0,
      items: [],
    },
  })
}
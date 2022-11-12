import SelectedLanguages from './SelectedLanguages.js'
import SearchInput from "./Searchinput.js";
import Suggestion from "./Suggestion.js";
import {fetchLanguages} from "../api.js";

export default function App({ $target }) {
  this.state = {
    keyword: '',
    fetchedLanguages: [],
    selectedLanguages: [],
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }

    suggestion.setState({
      selectedIndex: 0,
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
    })
    selectedLanguages.setState(this.state.selectedLanguages)
  }

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: [],
  })

  const searchInput = new SearchInput({
    $target,
    initialState: localStorage.getItem('inputValue') || '',
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        })
      } else {
        const languages = await fetchLanguages(keyword);

        this.setState({
          keyword,
          fetchedLanguages: languages,
        })
      }
    }
  })

  const suggestion = new Suggestion({
    $target,
    initialState: {
      items: [],
    },
    onSelect: (language) => {
      const nextSelectedLanguages = [...this.state.selectedLanguages];

      const index = nextSelectedLanguages.findIndex((item) => item === language);

      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(language)

      this.setState({
        selectedLanguages: nextSelectedLanguages
      })
    }
  })
}
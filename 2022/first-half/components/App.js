import SearchInput from './SearchInput.js';
import Suggestion from './Suggestion.js'
import SelectedLanguages from './SelectedLanguages.js'

import {fetchLanguage} from '../api.js';

export default function App({ $target }) {
  this.state = {
    keyword: '',
    fetchedLanguages: [],
    selectedLanguages: []
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }

    localStorage.setItem('2022_first', JSON.stringify(this.state))

    suggestion.setState({
      selectedIndex: 0,
      keyword: this.state.keyword,
      items: this.state.fetchedLanguages,
    })

    selectedLanguages.setState(this.state.selectedLanguages)
  }

  const searchInput = new SearchInput({
    $target,
    initialState: '',
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: []
        })
      } else {
        const languages = await fetchLanguage(keyword)

        this.setState({
          fetchedLanguages: languages,
          keyword,
        })
      }

    }
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      selectedIndex: 0,
      keyword: '',
      items: [],
    },
    onSelect: (language) => {
      const nextSelectedLanguages = [...this.state.selectedLanguages];

      const index = nextSelectedLanguages.findIndex((selectedLanguage) => selectedLanguage === language);

      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }

      nextSelectedLanguages.push(language);

      this.setState({
        selectedLanguages: nextSelectedLanguages,
      })
    }
  })

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: [],
  })

  const store = JSON.parse(localStorage.getItem('2022_first'));
  if (store) {
    this.setState(store)
  }
}
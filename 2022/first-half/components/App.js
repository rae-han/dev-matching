import SearchInput from './SearchInput.js';
import Suggestion from './Suggestion.js'
import {fetchLanguage} from "../api.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: []
  }

  this.setSTate = (nextState) => {
    console.log(nextState)
  }

  const searchInput = new SearchInput({
    $target,
    initialState: '',
    onChange: async (keyword) => {
      const languages = await fetchLanguage(keyword)
      console.log(languages)
    }
  });

  const suggestion = new Suggestion({
    $target,
    initialState: [],
  })
}
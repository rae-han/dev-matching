export const API_END_POINT = 'http://localhost:3000';

const cache = {};

const request = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  const response = await fetch(url);

  if(response.ok) {
    const json = await response.json();
    cache[url] = json;
    return json;
  }

  throw new Error('Request Error!!');
}

// export const fetchLanguages = async (keword) => request(`${API_END_POINT}/languages?keyword=${keword}`)
export const fetchLanguage = async (keyword) => request(`${API_END_POINT}/languages`);
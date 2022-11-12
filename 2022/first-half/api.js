export const API_END_POINT = 'http://localhost:3000';

const cache = {};

const request = async (url) => {
  const response = await fetch(url);

  console.log(response)
  if(response.ok) {
    const json = await response.json();
    return json;
  }

  throw new Error('Request Error!!');
}

// export const fetchLanguages = async (keword) => request(`${API_END_POINT}/languages?keyword=${keword}`)
export const fetchLanguages = async (keyword) => {
  if(cache[keyword]) {
    return cache[keyword]
  } else {
    const response = request(`${API_END_POINT}/languages?keyword=${keyword}`);
    cache[keyword] = response;
    return response;

  }
}
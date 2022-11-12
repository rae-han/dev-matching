const API_END_POINT = `https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev`;

export const request = async (pathname, options = {}) => {
  try {
    const url = `${API_END_POINT}${pathname}`
    const response = await fetch(url, options)

    if(response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('API request Error!')
  } catch (error) {
    console.log(error.message);
  }
}
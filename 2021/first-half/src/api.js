const API_END_POINT = `https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev`;

export const request = async (url = '/', options = {}) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, options);

    if(!response.ok) {
      throw new Error('API request Error!');
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error(e.message)
  }
}
const API_TOKEN = '24681a9d973873f34b61a16210a20da3';

export function getFillmsFromApiWithSearchedText (text) {

  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query='+ text
  return fetch(url)
  .then((response)=> response.json())
  .catch((error)=> console.error(error))
}

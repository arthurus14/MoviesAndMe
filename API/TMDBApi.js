const API_TOKEN = '24681a9d973873f34b61a16210a20da3';

export function getFillmsFromApiWithSearchedText (text, page) {

  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query='+ text + '&page=' + page
  return fetch(url)
  .then((response)=> response.json())
  .catch((error)=> console.error(error))
}

export function getImageFromApi(name){
	return 'https://image.tmdb.org/t/p/w300'+ name
}
const initialState = {favoriteFilm: []}

function toggleFavorite(state = initialState,action){
	let nextState
	switch(action.type){
		case 'TOGGLE_FAVORITE':
		const favoriteFilmIndex = state.favoriteFilm.findIndex(item => item.id === action.value.id)
		if(favoriteFilmIndex !== -1)
			{
			//supression des favorie
				nextState = {
					/// ... state = copie du state
						...state,
			favoriteFilm: state.favoriteFilm.filter((item,index) => index !== favoriteFilmIndex)
				}
			}	
			else{
				//ajouter le film aux favories
				nextState = {
					...state,
					favoriteFilm: [...state.favoriteFilm, action.value]
				}
			}
			//cette synthaxe permet de renvoyer nexteState si !== -1 ou state si existe		
			return nextState || state
		default:
			return state
	}
}
//permet de l'utiliser partout dans l'app
export default toggleFavorite
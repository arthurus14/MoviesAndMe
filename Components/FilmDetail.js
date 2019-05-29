import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmDetail extends React.Component{

	constructor(props){
		super(props)
		this.state={
			film: undefined,
			isLoading: true
		}
	}
	componentDidMount(){
		getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data=>{
			this.setState({
				film: data,
				isLoading: false
			})
		})
	}
	_toggleFavorite(){
		const action = {type:"TOGGLE_FAVORITE",value:this.state.film}
		this.props.dispatch(action)
	}
	componentDidUpadate(){
		console.log(this.props.favoriteFilm);
	}
	_displayFavoriteImage(){
		//on initialise avec l'image non favorit
		var sourceImage = require('../Images/ic_favorite_border.png')
		//on vérifie si le film est compté comme favorit
		if(this.props.favoriteFilm.findIndex(item=> item.id === this.state.film.id) !== -1){
			//dans ce cas fait parti des favorit car !== -1
			sourceImage = require('../Images/ic_favorite.png')
		}
		return(
				<Image source ={sourceImage} style={styles.favorite_image}/>
			)
	}
	_displayFilm(){
		const film = this.state.film
		if(film != undefined){
			return(
					<ScrollView style={styles.scrollview_container}>
						<Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <TouchableOpacity style={styles.favorite_container} onPress={()=>this._toggleFavorite()}>
          {this._displayFavoriteImage()}
          </TouchableOpacity >

						<Text style={styles.title_text}>{film.title}</Text>
						<Text style={styles.description_text}>{film.overview}</Text>
					</ScrollView>
				)
		}
	}
	 _displayLoading(){
    if(this.state.isLoading){
      return(
          <View style={styles.loadingContainer}>
             <ActivityIndicator size="large" />
          </View>
        )
    }
  }
	render(){
		console.log(this.props);
		const idFilm = this.props.navigation.state.params.idFilm
		return(
			<View style={styles.main_container}>
			{this._displayFilm()}
			{this._displayLoading()}

			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container:{
		flex:1,
	},
	loadingContainer:{
	    position : 'absolute',
	    left : 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center'
  },
  	scrollview_container:{
  		flex:1,
  },
  image: {
    height: 169,
    margin: 5
  },
    title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  favorite_container:{
  	alignItems:'center'
  },
  favorite_image:{
  	width:40,
  	height:40
  }
})
//on connection du state global au props du component FilmDetail
const mapStateToProps = (state) =>{
	return {
		favoriteFilm: state.favoriteFilm
	}
}
export default connect(mapStateToProps)(FilmDetail)
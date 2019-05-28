import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'

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
	_displayFilm(){
		const film = this.state.film
		if(film != undefined){
			return(
					<ScrollView style={styles.scrollview_container}>
						<Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />

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
  }
})

export default FilmDetail
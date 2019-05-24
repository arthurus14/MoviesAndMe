import React from 'react';
import {StyleSheet,View, Button, TextInput, FlatList, Text,ActivityIndicator} from 'react-native';
import films from '../Helpers/filmsDatas';
import FilmsItem from './FilmsItem';
import { getFillmsFromApiWithSearchedText } from '../API/TMDBApi'
class Search extends React.Component {
  constructor(props){
    super(props)
    this.page = 0,
    this.totalPages = 0,
    this.state = {
      films: [],
      isLoading: false
      }
        this.searchedText = ""
    }
  _loadFilms(){
    this.setState({isLoading:true})
    if(this.searchedText.length > 0){
    getFillmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data=>

    {
      this.page = data.page
      this.totalPages = data.total_pages

       this.setState({
        films: this.state.films.concat(data.results),
        isLoading:false
      })
    }

      );
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
  _displayDetailForFilm = (idFilm)=>{
      //console.log('id du film '+idFilm);
      this.props.navigation.navigate("FilmDetail",{idFilm : idFilm});
  }
  _searchFilms(){
    this.page = 0
    this.totalPages = 0
    //remise à zéro pour ne pas avoir la précedante recherche avec la nouvelle
    this.setState({
      films : []
    })
    this._loadFilms()
  }
  _searchTextInputChanged(text){
    this.searchedText = text
  }
  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput onSubmitEditing = { () => this._searchFilms()} onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.textinput} placeholder="movie name"/>
        <Button title="Let's go" onPress={()=> this._searchFilms()}/>
        <FlatList

          data={this.state.films}

          keyExtractor = {(item) => item.id.toString()}

          //0.5 car appel le component à la moitiée de la page, 1 serait en bas de page
          onEndReachedThreshold = {0.5}
          onEndReached = {()=>{
            if(this.page < this.totalPages){
              this._loadFilms()
            }
          }}

          renderItem={({item}) => <FilmsItem film={item} displayDetailForFilm={this._displayDetailForFilm}/> }
        />
        {this._displayLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create( {
  main_container:{
    flex:1
  },
  textinput : {
    marginLeft:5,
    marginRight:5,
    height:50,
    borderColor: 'blue',
    borderWidth:1,
    paddingLeft:5
  },
  loadingContainer:{
    position : 'absolute',
    left : 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Search

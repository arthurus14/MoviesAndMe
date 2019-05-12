import React from 'react';
import {StyleSheet,View, Button, TextInput, FlatList, Text} from 'react-native';
import films from '../Helpers/filmsDatas';
import FilmsItem from './FilmsItem';
import { getFillmsFromApiWithSearchedText } from '../API/TMDBApi'
class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {films: [],
    searchedText : ""}
    }
  _loadFilms(){
    if(this.state.searchedText.length > 0){
    getFillmsFromApiWithSearchedText(this.state.searchedText).then(data=>this.setState({films: data.results}));
    }
  }
  _searchTextInputChanged(text){
    this.setState({searchedText:text})
  }
  render() {
    console.log("render");
    return (
      <View style={styles.main_container}>
        <TextInput onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.textinput} placeholder="movie name"/>
        <Button title="Search" onPress={()=> this._loadFilms()}/>
        <FlatList

          data={this.state.films}

          keyExtractor = {(item) => item.id.toString()}

          renderItem={({item}) => <FilmsItem film={item}/> }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create( {
  main_container:{
    marginTop:40,
    flex:1,
    backgroundColor:''
  },
  textinput : {
    marginLeft:5,
    marginRight:5,
    height:50,
    borderColor: 'blue',
    borderWidth:1,
    paddingLeft:5
  }
})
export default Search

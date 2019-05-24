import React from 'react';
import {StyleSheet,View,Text,Image, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDBApi'
class FilmsItem extends React.Component {
  render() {
{/*comment*/}
    const { film, displayDetailForFilm } = this.props
    return (

<TouchableOpacity
 style={styles.main}
 onPress={()=>displayDetailForFilm(film.id)}>
<Image
  source={{ uri: getImageFromApi(film.poster_path) }}
  style={styles.image  }
/>
      <View style={styles.content}>
<View style={styles.header}>

        <Text style={styles.titre  }>{film.title} </Text>
        <Text style={styles.vote  }>{film.vote_average} </Text>
  </View>

  <View  style={styles.descriptionContainer  }>
        <Text style={styles.description  } numberOfLines={6}>{film.overview} </Text>
  </View>

  <View style={styles.date  }>
          <Text style={styles.sorti  }> Sorti le :{film.release_date} </Text>
  </View>
      </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({

  main: {
    height:190,
    flexDirection :'row'
  },
  content: {
    flex:1,
    margin:5
  },
  header: {
    flex:3,
  flexDirection:'row'
  },
  descriptionContainer: {
    flex:7,
  },
  image: {
    height:180,
    width:120,
    margin:5,
    backgroundColor: 'gray'

  },
  titre: {
    flexWrap:'wrap',
    fontWeight:'bold',
    fontSize:20,
    flex:1
  },
  vote: {
    color:'grey',
    fontWeight:'bold',
    fontSize:26,
    paddingRight:5,
    marginLeft:5
  },
  description: {
    color:'grey',
  fontStyle:'italic'
  },
  date: {
    flex:1
  },
  sorti: {
    textAlign:'right',
    fontSize:14
  },
})
export default FilmsItem

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
})

// Navigation/Navigation.js

export default createAppContainer(SearchStackNavigator)

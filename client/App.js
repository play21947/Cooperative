import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { applyMiddleware, createStore } from 'redux'
import {Provider} from 'react-redux'
import { useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import SignIn from './SignIn'
import AllReducers from './AllReducers'
import Account from './Account'
import HomeContainer from './HomeContainer'
import SignUp from './SignUp'


const Stack = createNativeStackNavigator()


const store = createStore(AllReducers, applyMiddleware(thunk))


const App = () => {

  let user = useSelector((state)=>{
    return state.auth.user
  })

  console.log("User : ", user)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? <Stack.Screen name='SIGN_IN' component={SignIn} options={{headerShown: false}}></Stack.Screen> : <Stack.Screen name='HOME_CONTAINER' component={HomeContainer} options={{headerShown: false}}></Stack.Screen>}
        {!user ? <Stack.Screen name='SIGN_UP' component={SignUp} options={{headerShown: false}}></Stack.Screen> : null}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const Warp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Warp
import React from 'react'
import Home from './Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Account from './Account'

let Stack = createNativeStackNavigator()

const HomeContainer = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HOME" component={Home} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='DEPOSIT' component={Deposit} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='WITHDRAW' component={Withdraw} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='ACCOUNT' component={Account} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    )
}


export default HomeContainer
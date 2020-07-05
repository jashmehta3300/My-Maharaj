import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from 'react'

import CreateRequest from './src/screen/CreateRequest'
import CurrentOrder from './src/screen/CurrentOrder'
import Details from './src/screen/Details'
import FAQ from './src/screen/FAQ'
import LoginScreen from './src/screen/LoginScreen'
import PastOrders from './src/screen/PastOrders'
import Profile from './src/screen/Profile'
import Registration from './src/screen/Registration'
import Settings from './src/screen/Settings'
import SplashScreen from './src/screen/SplashScreen'
import TrackOrder from './src/screen/TrackOrder'


export default class App extends React.Component {
  
  render() {
    return (
      
          <TrackOrder /> 
     
    );
  }
}


const CurrentNav = createStackNavigator(
  {
  CreateRequest : CreateRequest,
  Details:Details,
  TrackOrder : TrackOrder,
  CreateOrder : CurrentOrder,
},

)

const SettingsNav = createStackNavigator({
  FAQ:FAQ,
  Settings:Settings
})

const Main = createMaterialTopTabNavigator({
  SettingsNav : SettingsNav,
  CurrentNav : CurrentNav,
  Profile:Profile,
  PastOrders :PastOrders,
},{
  tabBarPosition:'bottom'
})





const Base = createSwitchNavigator({
  SplashScreen : SplashScreen,
  LoginScreen : LoginScreen,
  Registration : Registration,
  Main : Main,
},
{
  initialRouteName : 'Main' ,
  
})



const AppContainer = createAppContainer(Base)

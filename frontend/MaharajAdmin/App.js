import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

import CurrentOrder from './src/screen/CurrentOrder'
import Details from './src/screen/Details'
import FAQ from './src/screen/FAQ'
import PastOrder from './src/screen/PastOrder'
import Home from './src/screen/Home'
import Registration from './src/screen/Registration'
import Settings from './src/screen/Settings'
import SplashScreen from './src/screen/SplashScreen'
import TrackOrder from './src/screen/TrackOrder'
import Verify from './src/screen/Verify'
import ContactUs from './src/screen/ContactUs'
import Location from './src/screen/Location'
import Divider from './src/screen/Divider'
import AdminLogin from './src/screen/AdminLogin'
import MaharajLogin from './src/screen/MaharajLogin'
import Analytics from './src/screen/Analytics'
import RegisterAdmin from './src/screen/RegisterAdmin';
import UploadPhoto from './src/screen/UploadPhoto'
import Charts from './src/screen/charts'
import LoginScreen from './src/screen/Verify';
export default class App extends React.Component {
  
  render() {
    return (
      
          <AppContainer />
     
    );
  }
}

const RegisterAdmins = createSwitchNavigator(
  {
  Registration:Registration,
  RegisterAdmin : {
    screen : RegisterAdmin,
    navigationOptions :{
      tabBarVisible : false
    }
  },
  Verify : Verify,
  LoginScreen : LoginScreen
},{
  initialRouteName : 'RegisterAdmin',
  headerMode:'none'
});


const CurrentNav = createStackNavigator(
  {
  Details:Details,
  TrackOrder : {
    screen : TrackOrder,
    navigationOptions :{
      tabBarVisible : false
    }
  },
  CurrentOrder : CurrentOrder,
  Location : Location
},{
  initialRouteName : 'CurrentOrder',
  headerMode:'none'
}

)

const SettingsNav = createStackNavigator({
  FAQ:FAQ,
  ContactUs:ContactUs,
  Settings:{screen:Settings,
  navigationOptions:{
    headerMode:"on",
    title:'Settings',
    headerTintColor:'white',
    tabBarIcon:() => (
      <Icon name="gear" size={25} color='white' />
      ),
    height:40,
    headerStyle:{
      backgroundColor:'black',
    },
    fontSize:20
  }
  }
},
{
  initialRouteName : 'Settings'
})

const MainAdmin = createMaterialTopTabNavigator({
  SettingsNav :{
    screen:SettingsNav ,
    navigationOptions: {title: 'Settings', tabBarIcon: ({ tintColor }) => (
      <Icon name="gear" size={25} color={tintColor} />
      )}
  },
  RegisterAdmins : {
    screen:RegisterAdmins ,
    navigationOptions: {title: 'Register', tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={tintColor} />
      )}
  },
  Analytics:{
    screen:Analytics ,
    navigationOptions: {title: 'Analytics', tabBarIcon: ({ tintColor }) => (
      <Icon name="line-chart" size={23} color={tintColor} />
      )}
  },
  Charts:{
    screen:Charts ,
    navigationOptions: {title: 'Charts', tabBarIcon: ({ tintColor }) => (
      <Icon name="bar-chart" size={25} color={tintColor} />
      )}
  },
},{
  tabBarPosition: 'bottom',
    tabBarOptions: {activeTintColor: 'white',
    inactiveColor: '#aaaaaa', showIcon: 'true',
    style: { backgroundColor: '#212121', },
    labelStyle: {fontSize:12,textTransform:'capitalize'},
    tabStyle:{height:70},
    iconStyle: {inactiveColor:'#aaaaaa', paddingTop:3, activeColor: 'white'},
    indicatorStyle: { backgroundColor: 'white', height: 4}
  },
  order : ['RegisterAdmins','Analytics','Charts','SettingsNav'],
})

const MainMaharaj = createMaterialTopTabNavigator({
  SettingsNav :{
    screen:SettingsNav ,
    navigationOptions: {title: 'Settings', tabBarIcon: ({ tintColor }) => (
      <Icon name="gear" size={25} color={tintColor} />
      )}
  },
  CurrentNav : {
    screen:CurrentNav ,
    navigationOptions: {title: 'Home', tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={25} color={tintColor} />
      )}
  },
  Home:{
    screen:Home ,
    navigationOptions: {title: 'Accepted Orders', tabBarIcon: ({ tintColor }) => (
      <Icon name="check" size={25} color={tintColor} />
      )}
  },
  PastOrder :{
    screen:PastOrder ,
    navigationOptions: {title: 'Past Orders', tabBarIcon: ({ tintColor }) => (
      <Icon name="book" size={25} color={tintColor} />
      )}
  },
/*  Profile :{
    screen:UploadPhoto ,
    navigationOptions: {title: 'Profile', tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={25} color={tintColor} />
      )}
  }*/
},{
  tabBarPosition: 'bottom',
    tabBarOptions: {activeTintColor: 'white',
    inactiveColor: '#aaaaaa', showIcon: 'true',
    style: { backgroundColor: '#212121', },
    labelStyle: {fontSize:12,textTransform:'capitalize'},
    tabStyle:{height:70},
    iconStyle: {inactiveColor:'#aaaaaa', paddingTop:3, activeColor: 'white'},
    indicatorStyle: { backgroundColor: 'white', height: 4}
  },
  order : ['CurrentNav','Home','PastOrder','SettingsNav'],
})



const Base = createSwitchNavigator({
  SplashScreen : SplashScreen,
  Divider:Divider,
  AdminLogin:AdminLogin,
  MaharajLogin:MaharajLogin,
  MainAdmin:MainAdmin,
  Registration : Registration,
  Verify:Verify,
  MainMaharaj :MainMaharaj,
  UploadPhoto:UploadPhoto
},
{
  initialRouteName : 'SplashScreen' ,
  
})



const AppContainer = createAppContainer(Base)

import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View} from 'react-native';


export default class SplashScreen extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <View style = {style.container}>
            <Text style = {style.text}>Welcome to        MY MAHARAJA</Text>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },

    text:{
        fontSize:50,
        textAlign:'center'
    }
})

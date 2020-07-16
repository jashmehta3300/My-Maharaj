import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View} from 'react-native';


export default class Details extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <View style = {style.container}>
            <Text>Details</Text>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
    },

    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    }
})

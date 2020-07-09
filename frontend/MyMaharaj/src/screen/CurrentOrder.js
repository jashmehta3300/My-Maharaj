import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class CurrentOrder extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <View style = {style.container}>
            <Text style = {{margin:20 , fontWeight:'bold',marginBottom:10,fontSize:30}}>Current Orders</Text>
            <View style={style.box}>



    <View style={{ flexDirection: 'column' }}>
        <Text style={style.boxText2 }>REQUEST ID: 123456 </Text>
        <Text style={style.boxText2}>Date of Booking: 04/07/2020 6:00 pm </Text>
        <Text style={style.boxText}>Status : Pending</Text>
    </View>
    


</View>
            <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('CreateRequest')}
          style={style.TouchableOpacityStyle}>
          {/* <Icon name = 'plus' size = {40} color = '#fff'/> */}
            <Text style ={{color:'#fff' , fontSize:60 , paddingBottom:10}}>+</Text>
        </TouchableOpacity>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },

    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    } ,
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor:'#000',
        borderRadius:70
      },
    
      box: {
        borderColor: 'black',
        margin: 10,
        borderWidth: 1 ,
        borderRadius:10
    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize:20,
        

    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:20,
        marginBottom:0

    }

})

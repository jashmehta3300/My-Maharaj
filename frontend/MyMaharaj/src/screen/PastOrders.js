import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View} from 'react-native';


export default class PastOrders extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <View style = {style.container}>
            <Text style = {{margin:20,fontSize:30 , fontWeight:'bold',marginBottom:10}}>Past Orders</Text>
            <View style={style.box}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={style.boxText2 }>REQUEST ID: 123456 </Text>
            <Text style={style.boxText2}>Date of Booking: 04/07/2020 6:00 pm </Text>
            <Text style={style.boxText}>Status : Pending</Text>
       </View>
</View>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,
    },

    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    },
    box: {
        borderColor: 'black',
        margin: 10,
        borderWidth: 1 ,
        borderRadius:10,
        backgroundColor:'#fff'
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

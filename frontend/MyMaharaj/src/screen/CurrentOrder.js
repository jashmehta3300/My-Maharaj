import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


export default class CurrentOrder extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            location : 'Helloo World'
        }
    }
    onFocusFunction = async() =>{
        const location = await AsyncStorage.getItem('Location')
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                location : loc.title
            }) :
            this.setState({
                location : 'Please add your location'
            })
    }
    componentDidMount() {
            this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
                this.onFocusFunction()
            })
    }
     componentWillUnmount() {
         this.focusListener.remove()
     }

render(){
    return(
        <View style = {style.container}>
            <TouchableOpacity style = {{ backgroundColor:'#000'  , justifyContent:'center' ,paddingTop:20}} onPress={() => this.props.navigation.navigate('Location')}>
                <Text style ={{fontSize:15 , color:'#fff' , paddingLeft:10 ,}}>Deliver to </Text>
                <View style ={{flexDirection:'row' , }}>
                    <Text style = {{fontSize : 20 ,color :'#fff' , fontWeight:'bold' , marginLeft:10 , marginVertical:10, borderBottomWidth:1 ,borderBottomColor:'#fff',marginTop:0}}>{this.state.location}</Text>
                    <Icon name = "chevron-down" size = {15} color = {'#fff'} style={{paddingTop:5,paddingLeft:30 , marginRight:100}}/>
                </View>
            </TouchableOpacity>
            <Text style = {{margin:20,fontSize:30 , fontWeight:'bold',marginBottom:10}}>Current Orders</Text>
            
            
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
        borderRadius:10 , 
        backgroundColor:'#fff',
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

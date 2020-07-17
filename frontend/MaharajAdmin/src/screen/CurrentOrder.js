import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable'

export default class CurrentOrder extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            location : '',
            data:[]
        }
    }
    onFocusFunction = async() =>{
        this.getOrder()     
    }
    
    getOrder = async() =>{
        let token = await AsyncStorage.getItem('token')
            console.log(token)
            fetch('http://localhost:5000/api/v1/maharajReq/allreq',
            {
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.setState({data : data.data})
        })
    }

    onAccept = async(id) =>{
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        console.log(id)
        fetch('http://localhost:5000/api/v1/maharajReq/'+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.getOrder()
        })
        
    }
    componentDidMount= async() => {
            
            this.getOrder()
            this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
                this.onFocusFunction()
            })
    }
      

render(){
    return(
        <View style = {style.container}>
            <Text style = {{margin:18,fontSize:30 , fontWeight:'bold',marginBottom:10}}>All Request</Text>
            <Animatable.View>            
            <FlatList
             data={this.state.data.reverse()}
             keyExtractor={(item, index) => item._id}
             renderItem ={ ({ item, index }) =>
            
            
            <TouchableOpacity style={style.box} onPress={() => {this.props.navigation.navigate('Details',{'details':item})}}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                    <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                    <Text style={style.boxText}>Location : {item.address }</Text>
                </View>
                <TouchableOpacity style={{justifyContent:"center" , flexDirection:'row' , flex:0}} onPress={() => this.onAccept(item._id)}>
                    <Text style={[style.boxText , {color:'#fff' , backgroundColor:'#000' ,padding:15 , borderRadius:10,fontWeight:'bold'}]}>Accept</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            
             }
             
            />
            </Animatable.View>
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
        fontSize:18,
        

    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    }

})

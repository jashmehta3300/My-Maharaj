import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment'

export default class Home extends React.Component{
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
            fetch('http://localhost:5000/api/v1/maharajReq/myreq',
            {
                method:'GET',
                headers:{
                    "Authorization":token,
                    "Content-Type":"application/json"
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.setState({data : data.data})
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
           <View style ={{flexDirection:'row' ,backgroundColor:'#000',  }}>
                    <Text style = {{fontSize : 30 ,color :'#fff' , fontWeight:'bold' , marginLeft:10 , marginVertical:10, borderBottomWidth:1 ,marginTop:10}}>Accepted Orders</Text>
            </View> 
            <FlatList
             data={this.state.data}
             keyExtractor={(item, index) => item._id}
             renderItem ={ ({ item, index }) =>            
            <TouchableOpacity style={style.box} onPress = {() => {this.props.navigation.navigate('Details',{'details':item})}}>
                <View style={{ flexDirection: 'column', flex:1 }} >
                    <Text style={style.boxText2 }>REQUEST ID: {item._id} </Text>
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {moment(item.bookingTime,"hh:mm").format("h:mm A")}</Text>
                    <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                    <Text style={style.boxText2}>Location : {item.address }</Text>
                    <Text style={style.boxText}>Modified : {item.modified.toString()}</Text>
                </View>            
            </TouchableOpacity>
            
             }
            />
            
            
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
        backgroundColor:'#fff',
    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize:18,
        fontWeight:'bold',
        color : 'red'
    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    }

})

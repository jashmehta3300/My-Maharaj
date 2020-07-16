import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


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
    onComplete = async(id) =>{
        console.log(id)
        fetch('http://localhost:5000/api/v1/req/complete/'+id,
            {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                }
            }, ).then((response) => 
                response.json()
            
        ).then((data) =>{
            console.log(data.data)
            this.getOrder()
        })
        
    }
      

render(){
    return(
        <View style = {style.container}>
            <Text style = {{margin:18,fontSize:30 , fontWeight:'bold',marginBottom:10}}>Accepted Orders</Text>
            
            <FlatList
             data={this.state.data.reverse()}
             keyExtractor={(item, index) => item._id}
             renderItem ={ ({ item, index }) =>            
            <TouchableOpacity style={style.box}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={style.boxText2 }>REQUEST ID: {item._id} </Text>
                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8,10)}/${[item.bookingDate].toLocaleString().slice(5,7)}/${[item.bookingDate].toLocaleString().slice(0,4)}`} </Text>
                    <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                    <Text style={style.boxText2}>Cuisine : {item.cuisine }</Text>
                    <Text style={style.boxText}>Location : {item.address }</Text>
                </View>
                <TouchableOpacity style={{justifyContent:"center" , flexDirection:'row' , flex:0}} onPress={() => this.onComplete(item._id)}>
                    <Text style={[style.boxText , {color:'#fff' , backgroundColor:'#000' ,padding:15 , borderRadius:10,fontWeight:'bold'}]}>Complete</Text>
                </TouchableOpacity>
                
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

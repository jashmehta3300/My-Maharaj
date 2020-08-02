import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Linking
} from "react-native";
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-community/async-storage';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            details: [],
            x: []

        }
    }

    componentDidMount() {
        const details = this.props.navigation.getParam('details')
        console.log(details)
        this.state.x.push(details)
        this.setState({
            details: this.state.x,
            isloading: false
        })
    }
    onAccept = async (id) => {
        const token = await AsyncStorage.getItem('token')
        console.log(token)
        console.log(id)
        fetch('http://localhost:5000/api/v1/maharajReq/' + id,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            }).then((response) =>
                response.json()

            ).then((data) => {
                console.log(data.data)
                this.props.navigation.navigate("CurrentOrder")
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
            this.props.navigation.navigate("Home")
        })
        
    }
    openGps = (lat, lng) => {
        console.log(lat , lng)
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
      }
   
    render() {
        if (this.state.isloading) {
            return (
                <View style={style.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        else {
            return (
                <View>
                    <Animatable.View
                        animation='fadeInUpBig'
                    >
                        <Text style={{ margin: 18, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>Details</Text>
                        <FlatList
                            data={this.state.details}
                            keyExtractor={(item, index) => item._id}
                            renderItem={({ item, index }) =>
                                item.location ?
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                        <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                                        <Text style={style.boxText2}>{item.bookingType + " :\t" + item.bookingQuantity} </Text>
                                        <Text style={style.boxText2}>Foodtype : {item.foodType} </Text>
                                        <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                        <Text style={style.boxText2}>Address : {item.address}</Text>
                                        { item.status === "accepted" ?
                                        <TouchableOpacity onPress = {() => this.openGps(item.location.coordinates.latitude, item.location.coordinates.longitude)}>
                                            <Text style = {[style.boxText2 , {fontWeight:'bold' , backgroundColor:'#000' , color:'#fff', width:160,padding:10}]}>Show Directions</Text>
                                        </TouchableOpacity> : null}
                                        <Text style={style.boxText2}>Low price : {item.priceLow} </Text>
                                        <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                                        {
                                            item.acceptedBy  ?

                                                
                                                item.status === "accepted" ?
                                                    <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 0 }} onPress={() => this.onComplete(item._id)}>
                                                        <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold' }]}>Complete</Text>
                                                    </TouchableOpacity> 
                                                    : 
                                                    null
                                                :
                                                <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 1 }} onPress={() => this.onAccept(item._id)}>
                                                <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold', paddingHorizontal: 40, marginTop: 50 }]}>Accept</Text>
                                            </TouchableOpacity> 
                
                                      }
                                    </View>
                                    :
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                        <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                                        <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                        <Text style={style.boxText2}>Location : {item.address}</Text>
                                        <Text style={style.boxText2}>Foodtype ; {item.foodType} </Text>
                                        <Text style={style.boxText2}>Address : {item.address}</Text>
                                        <Text style={style.boxText}>Max Price : {item.priceMax}</Text>
                                        <Text style={style.boxText2}>CreatedAt : {item.createdAt} </Text>
                                    </View>


                            }

                        />
                    </Animatable.View>
                </View>
            )
        }
    }
}
export default Details;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize: 18,
        marginBottom: 0,
        marginLeft: 18

    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize: 18,


    }
});
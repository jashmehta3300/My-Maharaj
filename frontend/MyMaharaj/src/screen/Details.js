import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Linking,
    Image
} from "react-native";
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-community/async-storage';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            details: [],
            x: [],
            maharaj:{}


        }
    }

    componentDidMount() {
        const details = this.props.navigation.getParam('details')
        console.log(details)
        if(details.status === "completed"){
            this.AcceptedBy(details.acceptedBy)
        }
        this.state.x.push(details)
        this.setState({
            details: this.state.x,
            isloading: false
        })
    }

    AcceptedBy = (id) => {
        fetch("http://localhost:5000/api/v1/maharajAuth/maharajs/"+id)
        .then(response => response.json()).then((result) => {
            console.log(result)
            this.setState({maharaj : result})})
            .catch(error => console.log('error', error));
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
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={style.boxText2}>Date of Booking: {`${[item.bookingDate].toLocaleString().slice(8, 10)}/${[item.bookingDate].toLocaleString().slice(5, 7)}/${[item.bookingDate].toLocaleString().slice(0, 4)}`} </Text>
                                    <Text style={style.boxText2}>Time of Booking : {item.bookingTime}</Text>
                                    <Text style={style.boxText2}>{item.bookingType + " :\t" + item.bookingQuantity} </Text>
                                    <Text style={style.boxText2}>Foodtype : {item.foodType} </Text>
                                    <Text style={style.boxText2}>Cuisine : {item.cuisine}</Text>
                                    <Text style={style.boxText2}>Address : {item.address}</Text>
                                    <Text style={style.boxText2}>Low price : {item.priceLow} </Text>
                                    <Text style={style.boxText2}>Max price : {item.priceMax} </Text>
                                    {item.status === 'completed' ?
                                        <View>
                                        <Text style={style.boxText2}>Maharaj Name : {this.state.maharaj.name}</Text>
                                        <Image source ={{uri : "http://localhost:5000"+this.state.maharaj.imageURL}} style={{height:100,width:100}} />
                                        </View>
                                        :
                                        item.modified ?
                                        <Text style={[style.boxText2,{fontWeight:'bold' , fontSize:25}]}>Awaiting Maharaj Response</Text>
                                        :
                                        <TouchableOpacity style={{ justifyContent: "center", flexDirection: 'row', flex: 1 }} onPress={() => this.props.navigation.navigate("ModifyRequest", { "item": item })}>
                                            <Text style={[style.boxText, { color: '#fff', backgroundColor: '#000', padding: 15, borderRadius: 10, fontWeight: 'bold', paddingHorizontal: 40, marginTop: 50 }]}>Edit</Text>
                                        </TouchableOpacity>
                                    }
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
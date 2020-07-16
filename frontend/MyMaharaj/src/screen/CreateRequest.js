import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, TouchableOpacity ,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage'
import { ThemeColors } from 'react-navigation';

export default class CreateRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            type_of_booking : '',
            Cuisine:'',
            isVisible : false,
            date : null ,
            location:'',
            longLat:{},
            date:'',
            time:'',
            bookingQuantity:0,
            enable:true,
            type_of_meal:'',
            priceLow:'',
            priceMax:'',
            Flat_no:'',
            Wing:'',
        }
    }
    componentDidMount = async() => {
        const location = await AsyncStorage.getItem('Location')
        
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                location : loc.completeAddress,
                longLat : loc.long_lat
            }) :
            this.setState({
                location : 'Please add your location'
            })
    }

    Input = () =>{
        if(this.state.type_of_booking === 'Number of hours'){
            return (
                <View style={{marginHorizontal:30 , marginTop:15 }}>
                    <TextInput
                        keyboardType={'numeric'}
                        placeholder='Enter Number of hours'
                        onChangeText={(text) => this.setState({
                            bookingQuantity:text
                        })}
                        style={style.textinput}
                    ></TextInput>
                </View>
            )
        }
        else if(this.state.type_of_booking === 'Number of meals'){
            return (
                <View style={{marginHorizontal:30 , marginTop:10 }}>

                <TextInput
                keyboardType={'numeric'}
                        placeholder='Enter Number of Meals'
                        onChangeText={(text) => this.setState({
                            bookingQuantity:text
                        })}
                        style={style.textinput}
                ></TextInput>
                </View>
            )
        }
        else if(this.state.type_of_booking === 'Number of days'){
            return (
                <View style={{marginHorizontal:30 , marginTop:10 }}>
                <TextInput
                keyboardType={'numeric'}
                        placeholder='Enter Number of days'
                        onChangeText={(text) => this.setState({
                            bookingQuantity:text
                        })}
                        style={style.textinput}
                ></TextInput>
                </View>
            )
        }
        else{
            return null
        }
         
    }
    sendRequest = async() =>{
        let token = await AsyncStorage.getItem('token')
        console.log(token)
        fetch('http://localhost:5000/api/v1/req/create',
        {
            method:"POST",
            headers:{
                "Authorization":token,
                "Content-Type":"application/json                "
            },
            body:JSON.stringify({
                "bookingType": this.state.type_of_booking,
                "bookingQuantity": this.state.bookingQuantity,
                "foodType": this.state.type_of_meal,
                "cuisine": this.state.Cuisine.toString(),
                "priceLow": this.state.priceLow,
                "priceMax": this.state.priceMax,
                "address": this.state.Flat_no + this.state.Wing + " Wing " +  this.state.location,
                "bookingDate": this.state.date,
                "bookingTime": this.state.time,
                "location": {
                    "coordinates": {
                    "latitude": this.state.longLat.lat,
                    "longitude": this.state.longLat.lng
                    }
                }      
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data.data._id)
            fetch('http://localhost:5000/api/v1/req/start/'+data.data._id , 
                {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    }
                }            
            ).then(response => response.json()).then((data) => 
                this.props.navigation.navigate('CurrentOrder')
            )
        })
    }

    render() {
        return (
            <View style={style.container}>
            <ScrollView scrollEnabled={this.state.enable}>
                <Text style={{ fontSize: 40, alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 50 }}>Create Request</Text>
                <TouchableOpacity style={{marginHorizontal:30 , backgroundColor:'white' , marginBottom:20 , height:50 , justifyContent:'center' , borderColor:'#dcdcdc' , borderWidth:1 , borderRadius:5}}
                    onPress ={() => this.setState({isVisible:true})}
                >
                    <Text style={{fontSize:20,paddingLeft:10}}>
                        {this.state.date ? this.state.date + this.state.time  :'Date And Time of Booking'}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode="datetime"
                    onConfirm={(date) => this.setState({
                        date:`${date.toDateString()} `,
                        time:`${date.getHours() % 12 || 12}:${date.getMinutes() <=9 ? '0'+date.getMinutes() : date.getMinutes()} ${date.getHours()/12 >= 1 ? 'PM' : 'AM'}`,
                        isVisible:false
                    })}
                    onCancel={() => console.log('Bhenchod')}
                />
                <View style={{marginBottom:20}}>
                <DropDownPicker
                    items={[
                        { label: 'Hourly Booking', value: 'Hourly' },
                        { label: 'Meal wise booking', value: 'Number of meals' },
                        { label: 'Day wise booking' , value: 'Number of days'}
                    ]}
                    placeholder = 'Type of booking'
                    containerStyle={{ height: 50 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.setState({
                        type_of_booking: item.value
                    })}
                    labelStyle={{
                        fontSize:20,
                        textAlign: 'left',
                        color: '#000'
                    }}

                />
                    <this.Input />
                
                </View>
                <DropDownPicker
                    items={[
                        { label: 'Jain', value: 'Jain' },
                        { label: 'Veg', value: 'Veg' },
                        { label: 'Non Veg' , value: 'Non Veg'}
                    ]}
                    placeholder = 'Food Type'
                    containerStyle={{ height: 50 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => this.setState({
                        type_of_meal: item.value
                    })}
                    labelStyle={{
                        fontSize:20,
                        textAlign: 'left',
                        color: '#000'
                    }}
                />
                <View style = {{marginTop:20}}>
                <DropDownPicker
                    items={[
                        { label: 'Punjabi',value:'Punjabi' },
                        { label: 'South Indian', value:'South Indian'},
                        { label: 'Italian' , value:'Italian'},
                        { label: 'Rajasthani ' , value:'Rajasthani '},
                        { label: 'Chinese' , value:'Chinese'},
                        { label: 'Continental' , value:'Continental'},
                    ]}
                    placeholder = 'Cuisine'
                    containerStyle={{ height: 50 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30, }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => {
                        this.setState({
                            Cuisine: item
                        })
                    }}
                    labelStyle={{
                        fontSize:20,
                        textAlign: 'left',
                        color: '#000'
                    }}
                    multiple={true}
                    multipleText={this.state.Cuisine.toString()}
                    min={0}
                    max={3}
                    onOpen={() => this.setState({enable:false})}
                    onClose={() => this.setState({enable:true})}
                />
                </View>
                <Text style = {style.text}>Price Range</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:20}}>
                <TextInput
                keyboardType={'numeric'}
                        placeholder='Min Price'
                        onChangeText={(text) => this.setState({
                            priceLow:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                 <TextInput
                keyboardType={'numeric'}
                        placeholder='Max Price'
                        onChangeText={(text) => this.setState({
                            priceMax:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <Text style = {style.text}>Address Details</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' ,marginTop:15}}>
                <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Flat No.'
                        onChangeText={(text) => this.setState({
                            Flat_no:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                 <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Wing'
                        onChangeText={(text) => this.setState({
                            Wing:text
                        })}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <TouchableOpacity onPress ={() => this.props.navigation.navigate('TrackOrder' , { longlat : this.state.longLat} )}>
                <Text style={style.textinput3}>{this.state.location}</Text>
                </TouchableOpacity>
                <Text style={{marginLeft:20,color:'red' , fontSize:15}}>*To change address please go to home screen</Text>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginVertical:30 , borderRadius:10}} onPress={() => this.sendRequest()} >
                    <Text style = {style.button}>Confirm Request</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        fontSize: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingRight: 10,
        borderColor: 'grey',
        marginHorizontal:30,
        fontWeight:'bold'
    },
    textinput: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff'
    },
    button: {
        fontSize: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingRight: 10,
        color: 'white'

    },
    textinput2: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        marginHorizontal:20,
        width:120
    },
    textinput3: {
        fontSize: 20,
        paddingLeft:10,
        borderColor:'grey' , 
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#fff',
        marginHorizontal:20,
        marginTop:15,
    },
})

import React from 'react';
import { Text, StyleSheet, ImageBackground, Image, View, TextInput, TouchableOpacity ,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage'

export default class CreateRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            type_of_booking : '',
            Cuisine:'',
            isVisible : false,
            date : null ,
            location:'',
        }
    }
    componentDidMount = async() => {
        const location = await AsyncStorage.getItem('Location')
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                location : loc.completeAddress
            }) :
            this.setState({
                location : 'Please add your location'
            })
    }

    Input = () =>{
        if(this.state.type_of_booking === 'hour'){
            return (
                <View style={{marginHorizontal:30 , marginTop:15 }}>
                    <TextInput
                        keyboardType={'numeric'}
                        placeholder='Enter Number of hours'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                    ></TextInput>
                </View>
            )
        }
        else if(this.state.type_of_booking === 'meal'){
            return (
                <View style={{marginHorizontal:30 , marginTop:10 }}>

                <TextInput
                keyboardType={'numeric'}
                        placeholder='Enter Number of Meals'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                ></TextInput>
                </View>
            )
        }
        else if(this.state.type_of_booking === 'day'){
            return (
                <View style={{marginHorizontal:30 , marginTop:10 }}>
                <TextInput
                keyboardType={'numeric'}
                        placeholder='Enter Number of days'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                ></TextInput>
                </View>
            )
        }
        else{
            return null
        }
         
    }

    render() {
        return (
            <ScrollView style={style.container}>
                <Text style={{ fontSize: 40, alignItems: 'center', alignSelf: 'center', fontWeight: 'bold', marginTop: 30, marginBottom: 50 }}>Create Request</Text>
                <TouchableOpacity style={{marginHorizontal:30 , backgroundColor:'white' , marginBottom:20 , height:50 , justifyContent:'center' , borderColor:'#dcdcdc' , borderWidth:1 , borderRadius:5}}
                    onPress ={() => this.setState({isVisible:true})}
                >
                    <Text style={{fontSize:20,paddingLeft:10}}>
                        {this.state.date ? this.state.date :'Date And Time of Booking'}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode="datetime"
                    onConfirm={(date) => this.setState({
                        date:`${date.toDateString()}  ${date.getHours() % 12 || 12}:${date.getMinutes() <=9 ? '0'+date.getMinutes() : date.getMinutes()} ${date.getHours()/12 >= 1 ? 'PM' : 'AM'}`,
                        isVisible:false
                    })}
                    onCancel={() => console.log('cancel')}
                />
                <View style={{marginBottom:20}}>
                <DropDownPicker
                    items={[
                        { label: 'Hourly Booking', value: 'hour' },
                        { label: 'Meal wise booking', value: 'meal' },
                        { label: 'Day wise booking' , value: 'day'}
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
                        { label: 'North Indian',value:'NI' },
                        { label: 'South Indian', value:'SI'},
                        { label: 'Italian' , value:'It'}
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
                />
                </View>
                <Text style = {style.text}>Price Range</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' , marginTop:20}}>
                <TextInput
                keyboardType={'numeric'}
                        placeholder='Min Price'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput2}
                ></TextInput>
                 <TextInput
                keyboardType={'numeric'}
                        placeholder='Max Price'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <Text style = {style.text}>Address Details</Text>
                <View style={{flexDirection:'row' , justifyContent:'center' ,marginTop:15}}>
                <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Flat No.'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput2}
                ></TextInput>
                 <TextInput
                keyboardType={'ascii-capable'}
                        placeholder='Wing'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput2}
                ></TextInput>
                </View>
                <TouchableOpacity onPress ={() => alert('Please change location from home')}>
                <Text style={style.textinput3}>{this.state.location}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginVertical:30 , borderRadius:10}} >
                    <Text style = {style.button}>Confirm Request</Text>
                </TouchableOpacity>
            </ScrollView>
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

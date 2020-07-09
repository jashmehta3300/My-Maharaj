import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TextInput , TouchableOpacity,LayoutAnimation,UIManager, Alert} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios"

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            OTP : true,
            token:'',
            mobile:'',
            OTP_value:''


        }
    }
    sendotp =async ()=>{                                                                //fetching the send sms api and handling with errors 
        if(this.state.mobile){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({OTP:false})
             await axios.post('http://localhost:5000/api/v1/auth/sms',{
                    mobile:this.state.mobile,
            })
            .catch((error) => console.log(error))
        }
        else{
            Alert.alert("Please enter your mobile no")
        }

    }
    verifyotp = async () =>{                         //verifying your otp and handling errors 
        if(this.state.OTP_value){
            console.warn('hi')
         await fetch("http://localhost:5000/api/v1/auth/verify",{
                method:"POST",
                body:{
                    token:this.state.OTP_value,
                    mobile:this.state.mobile
                },
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((response) =>response.json())
            .catch((error) =>{
                console.warn(error)
                Alert.alert('Login Failed')
            });

        }
        else{
            Alert.alert("Please enter the OTP")

        }
    }
 
render(){
    return(
        <View style = {style.container}>
            <Text style = {{fontSize:40 , alignItems:'center' , alignSelf:'center' , fontWeight:'bold' , marginTop:100 , marginBottom:100}}>Verifying your Details</Text>
            
            <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10}}>
            <Text style={style.text}>+91</Text>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'Phone Number'
              onChangeText={(text) => this.setState({mobile:text})}
              style={style.textinput}

            >
            </TextInput>
            </View>
        { this.state.OTP ? 
        <View>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.sendotp()}>
                <Text style = {style.button}>Send OTP</Text>
            </TouchableOpacity>
        </View>
            :
            <View>
            <View style = {{  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10 , marginTop:40}}>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'OTP'
              onChangeText={(text) => {this.setState({OTP_value:text})}}
              style={style.textinput}
            >
            </TextInput> 
            </View>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => {this.verifyotp()}}>
            <Text style = {style.button}>Confirm OTP</Text>
            </TouchableOpacity>
            </View>
        }
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        flex:1,        
    },

    text:{
        fontSize:25,
        borderRightWidth:1,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingRight:10 , 
        borderColor:'grey'
    } , 
    textinput:{
        fontSize:25,
        paddingLeft:10,
        
    },
    button:{
        fontSize:25,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingRight:10 ,
        color:'white' 
        
    } , 
})

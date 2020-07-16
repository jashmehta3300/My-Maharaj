import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";

class AdminLogin extends Component {
    constructor(props){
        super(props);
        this.state={
            OTP:true
        }
    }
    render() {
        return (
            <View style = {style.container}>
            <Text style = {{fontSize:40 , alignItems:'center' , alignSelf:'center' , fontWeight:'bold' , marginTop:100 , marginBottom:100}}>Admin Login</Text>
            
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
           <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.setState({OTP:false})}>
                <Text style = {style.button}>Send OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => {this.props.navigation.navigate('Registration')}}>
            <Text style = {style.button}>Create an Account</Text>
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
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} >
            <Text style = {style.button}>Resend OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => {this.props.navigation.navigate('MainAdmin')}}>
            <Text style = {style.button}>Confirm OTP</Text>
            </TouchableOpacity>
            </View>
        }
        </View>
        );
    }
}
export default AdminLogin;

const style = StyleSheet.create({
    container: {
        flex: 1,
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
});
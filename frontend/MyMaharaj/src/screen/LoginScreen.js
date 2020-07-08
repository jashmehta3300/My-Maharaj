import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TextInput , TouchableOpacity,LayoutAnimation,UIManager,AsyncStorage} from 'react-native';


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
            is_authenticated:false,
            token:''
        }
    }
    componentDidMount(){
        this.state.token=AsyncStorage.getItem('token')
        if(this.state.token){
            this.setState({is_authenticated:true})
        }
        
    }
    sendotp =async ()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({OTP:false})
        x=await fetch('http://localhost:5000/api/v1/auth/sms',{
            method :'POST',
            body:{
                mobile:"9082024100"
            }
        })
        console.log(x)

    }
    verifyotp= () =>{
        
    }
 
render(){
    return(
        <View style = {style.container}>
            <Text style = {{fontSize:40 , alignItems:'center' , alignSelf:'center' , fontWeight:'bold' , marginTop:100 , marginBottom:100}}>Login/Sign Up</Text>
            
            <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10}}>
            <Text style={style.text}>+91</Text>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'Phone Number'
              onChangeText={(text) => console.log(text)}
              style={style.textinput}

            >
            </TextInput>
            </View>
        { this.state.OTP ? 
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.sendotp()}>
                <Text style = {style.button}>Send OTP</Text>
            </TouchableOpacity>
            :
            <View>
            <View style = {{  borderWidth:1 , marginLeft:50, marginRight:50 , borderColor:'grey' , borderRadius:10 , marginTop:40}}>
            <TextInput
              keyboardType = {'numeric'}
              placeholder = 'OTP'
              onChangeText={(text) => console.log(text)}
              style={style.textinput}
            >
            </TextInput> 
            </View>
            <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress = {() => this.verifyotp}>
            <Text style = {style.button}>Confirm OTP</Text>
            </TouchableOpacity>
            </View>
        }
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('Registration')}}>
            <Text>SIGN UP</Text>
        </TouchableOpacity>
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

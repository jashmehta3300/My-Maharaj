import React,{useState, Component} from 'react';
import { 
    View, 
    Text, 
    Button, 
    Image,
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import DropDownPicker from "react-native-dropdown-picker"
import  AsyncStorage from "@react-native-community/async-storage"
import ImagePicker from 'react-native-image-picker'

export default class Registration extends Component {

constructor(){
    super();
        this.state={
            username: "",
            email:" ",
            password: " ",
            confirm_password: "",
            secureTextEntry: true,
            confirm_secureTextEntry: true,
            mobile:"",
            city:"",
            role:'maharaj',
            zipcode:'',
            address:'',
            cuisine:'',
            kin:'',
            yearsOfExp:'',
            token:"",
        }
    }




     updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        });
    }

     updateConfirmSecureTextEntry = () => {
        this.setState({
            confirm_secureTextEntry: !this.state.confirm_secureTextEntry
        });
    }
      signup = async () => {
          if(this.state.username && this.state.email){
             if(this.state.password==this.state.confirm_password){
                 if(this.state.mobile.length==10){
                 console.warn('authentication underway')
                   await  fetch("http://localhost:5000/api/v1/maharajAuth/register",{
                    method:"POST",
                    body:JSON.stringify({
                        name:this.state.username,
                        email:this.state.email,
                        password:this.state.password,
                        mobile:this.state.mobile,
                        zipcode:this.state.zipcode,
                        yearsOfExp:Number(this.state.yearsOfExp),
                        kin:this.state.kin,
                        address:this.state.address,
                        city:this.state.city,
                        cuisine:this.state.cuisine,
                        role:"maharaj"                       
                    }),
                    redirect:'follow',
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) =>{
                    if(data.success){
                        console.warn(data.token)
                        this.props.navigation.navigate('Verify')
                    }
                    else{
                        Alert.alert('Login fail',response.message.success)
                    }
            })
            .catch((error) =>{
                console.log(error)
            })
        }
        else{
            Alert.alert('Not a valid number')
        }
            }
            else{
                Alert.alert("Passwords dont match")
            }
        }
        else{
            Alert.alert('Username or Email missing')
        }
    }
    render(){
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({username:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Email Id</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({email:val})}}
                />
            </View>

            <Text style={[styles.text_footer,{marginTop:35}]}>Phone</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Mobile_No"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({mobile:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Cuisine</Text>
            <View style={{padding:5}}>  
            <FontAwesome 
                    name="cutlery"
                    color="#05375a"
                    size={20}
                />        
            <DropDownPicker
                    items={[
                        { label: 'North Indian',value:'North Indian' },
                        { label: 'South Indian', value:'South Indian'},
                        { label: 'Italian' , value:'Italian'},
                        {label:'Chinese', value:'Chinese'}
                    ]}
                    placeholder = 'Cuisine'
                    containerStyle={{ height: 50 }}
                    style={{ backgroundColor: '#fafafa' , marginHorizontal:30 }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => {
                        this.setState({
                            cuisine: item
                        })
                    }}
                    labelStyle={{
                        fontSize:20,
                        textAlign: 'left',
                        color: '#000'
                    }}
                    multiple={true}
                    multipleText={this.state.cuisine.toString()}
                    min={0}
                    max={3}
                />
                </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Address</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="map-pin"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({address:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>City</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="building"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="City"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({city:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>ZipCode</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="map-pin"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Zipcode"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({zipcode:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Years Of Experience</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="history"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Years of Experience"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({yearsOfExp:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Kin</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Kin"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({kin:val})}}
                />
            </View> 
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({password:val})}}
                />
                <TouchableOpacity
                    onPress={this.updateSecureTextEntry}
                >
                    {this.state.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={this.state.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({confirm_password:val})}}
                />
                <TouchableOpacity
                    onPress={this.updateConfirmSecureTextEntry}
                >
                    {this.state.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {this.signup()}}
                >
                <LinearGradient
                    colors={['black', 'black']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'white'
                    }]}>Register</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                    style={[styles.signIn, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Already have an account?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Verify')}
                    style={[styles.signIn, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Verify if already Registered</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
}
};


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'android' ? 5 : 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        overflow: "hidden"
    },
  });
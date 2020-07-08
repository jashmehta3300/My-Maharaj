import React,{useState, Component} from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export default class Registration extends Component {

constructor(props){
    super(props)
        this.state={
            username: '',
            email:'',
            password: '',
            confirm_password: '',
            secureTextEntry: true,
            confirm_secureTextEntry: true,
            mobile_no:'',
            city:'',
            country_code:'',
            role:'user',
            token:''
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
          let form = new FormData();
          form.append( 'name', this.state.name);
          form.append('email',this.state.email);
          form.append('city',this.state.city);
          form.append('role','user')
          form.append('password',this.state.password);
          form.append('countryCode',this.state.country_code);
          form.append('mobile',this.state.mobile_no);

          if(this.state.username && this.state.email){
             if(this.state.password==this.state.confirm_password){
                resposne= await fetch('http://localhost:5000/api/v1/auth/register',{
                    method:"POST",
                    body:form,
                })
                this.state.token=response.token
                AsyncStorage.setItem('token',this.state.token)
                AsyncStorage.getItem('token')
                .then((value) => {console.log(value)})
                console.log(resposne)
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
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({email:val})}}
                />
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Country Code</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Country_code"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({country_code:val})}}
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
                    keyboardType='numeric'
                    autoCapitalize="none"
                    onChangeText={(val) => {this.setState({mobile_no:val})}}
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
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'black'
                    }]}>Sign In</Text>
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
    }
  });
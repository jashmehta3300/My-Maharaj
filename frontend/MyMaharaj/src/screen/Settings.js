import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View,TouchableOpacity,Share} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import Icon from "react-native-vector-icons/FontAwesome5"

export default class Settings extends React.Component{

    constructor(props){
        super(props);
    }
     logout = async () => {
        console.log(AsyncStorage.getItem('token'))
        await AsyncStorage.removeItem('token').then((data) =>{console.log(data)})
        this.props.navigation.navigate('LoginScreen')
    }

    shareapp = () => {
        Share.share({
            message:'my maharaj app',
            url:'https://www.google.com/',
            title:'wow did you see that'
        },{
            dialogTitle:'share our app'
        }
        )
    }

render(){
    return(
        <View style = {style.container}>
            <View > 
                <TouchableOpacity style={style.tab} onPress={() =>{this.props.navigation.navigate('FAQ')}} >
                    <Text style={style.text}>FAQS</Text>
                    <Icon name="chevron-right" size={30}  color='#3e4547'/>
                </TouchableOpacity>
               
            </View>
            <View>
                <TouchableOpacity style={style.tab}>  
                        <Text style={style.text}>ContactUs</Text>
                        <Icon name="phone" size={30} color='#3e4547' onPress={() => {this.props.navigation.navigate('FAQ')}} />
                
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={style.tab}>  
                        <Text style={style.text}>Share MyMaharaj</Text>
                        <Icon name="share" size={30} color="#3e4547" onPress={() => {this.shareapp()}} />
                
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={style.tab}>  
                        <Text style={style.text}>Logout</Text>
                        <Icon name="sign-out-alt" size={30} color='#3e4547' onPress={() =>{this.logout()}} />
                
                </TouchableOpacity>
            </View>
            <Text style={style.Company}>
                MyMaharaj Inc.
            </Text>
        </View>
)}
}
const style = StyleSheet.create({
    container: {
        marginTop:10,
        flex:1,
    },

    text:{
        color:'black',
        fontSize:20,
        fontWeight:"400"
    

    },
    tab : {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:"#ababab"
    },
    Company :{
        alignSelf:'center',
        marginTop:300,
        marginBottom:20,
        fontWeight:"400",
        fontSize:25,
    }
})

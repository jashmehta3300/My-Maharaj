import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Registration extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style = {style.container}>
                <Text style = {{fontSize:40 , alignItems:'center' , alignSelf:'center' , fontWeight:'bold' , marginTop:50 , marginBottom:100}}>Registration</Text>
            
                <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:30, marginRight:30 , borderColor:'#ababab' , borderRadius:10 ,}}>
                    <Icon name="user" size = {30} style={{marginTop:5 ,marginBottom:5, paddingLeft:10 , paddingRight:10, borderRightWidth:1 ,  borderColor:'#ababab' , paddingTop:5}} />                    
                    <TextInput
                        placeholder = 'First Name'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                    >
                    </TextInput>
                </View>
                <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:30, marginRight:30 , borderColor:'#ababab' , borderRadius:10 , marginTop:20}}>
                    <Icon name="user" size = {30} style={{marginTop:5 ,marginBottom:5, paddingLeft:10 , paddingRight:10, borderRightWidth:1 ,  borderColor:'#ababab' , paddingTop:5}} />
                    <TextInput
                        placeholder = 'Last Name'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                    >
                    </TextInput>
                </View>
                <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:30, marginRight:30 , borderColor:'#ababab' , borderRadius:10 , marginTop:20}}>
                    <Icon name="map-marker" size = {30}  style={{marginTop:5 ,marginBottom:5, paddingLeft:12 , paddingRight:12, borderRightWidth:1 ,  borderColor:'#ababab' , paddingTop:5}} />
                    <TextInput
                        placeholder = 'City'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                    >
                    </TextInput>
                </View>
                <View style = {{flexDirection:'row' ,  borderWidth:1 , marginLeft:30, marginRight:30 , borderColor:'#ababab' , borderRadius:10 , marginTop:20}}>
                    <Icon name="envelope" size = {25} style={{marginTop:5 ,marginBottom:5, paddingLeft:9 , paddingRight:9, borderRightWidth:1 ,  borderColor:'#ababab' , paddingTop:7}} />
                    <TextInput
                        placeholder = 'Email Id'
                        onChangeText={(text) => console.log(text)}
                        style={style.textinput}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' , marginTop:30 , borderRadius:10}} onPress ={() => this.props.navigation.navigate('Main')} >
                <Text style = {style.button}>Register</Text>
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
            borderColor:'#ababab'
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
    
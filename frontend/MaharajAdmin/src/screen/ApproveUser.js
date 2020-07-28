import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TextInput
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

class ApproveUser extends Component {
    constructor(props){
        super(props);
        this.state={
            item:{},
            price:'',
            Admintoken:''
        }
    }
    async componentDidMount(){
        let Admintoken = await AsyncStorage.getItem('Admintoken')
        this.setState({Admintoken})
        const items=this.props.navigation.getParam('item')
        console.warn(items)
        this.setState({
            item:items
        })
    }

     approve = async () => {
        if(this.state.price.length>2){
            let token= await AsyncStorage.getItem('Admintoken')
            fetch('http://localhost:5000/api/v1/admin/setPrice/'+this.state.item._id,{
                method:"POST",
                body:{
                    amount:Number(this.state.price),
                    "per":"hour"
                },
                headers:{
                    "Authorization":"Bearer "+this.state.Admintoken
                }
            })
            .catch((error) => Alert.alert(error))
            fetch('http://localhost:5000/api/v1/admin/approveMaharaj/'+this.state.item._id,{
                method:"POST",
                body:{
                    "isApproved":true
                },
                headers:{
                    "Authorization":"Bearer "+this.state.Admintoken
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    this.props.navigation.navigate("Approve");
                }
            })
            .catch((error) => Alert.alert(error))
    }
    else{
        Alert.alert('Increase the Price of Maharaj')
    }
    }
    render() {
        return (
            <View style={styles.container}>
                    <View style={{ flexDirection: 'column' }}> 
                       <Text style={styles.boxText2}>Name :{this.state.item.name} </Text>
                       <Text style={styles.boxText2}>Email : {this.state.item.email}</Text>
                       <Text style={styles.boxText2}>Mobile : {this.state.item.mobile}</Text>
                       <Text style={styles.boxText2}>Address : {this.state.item.registeredAddress.address}</Text>
                   </View>
                    <TextInput
                    style={styles.input}
                    placeholder="Enter the amount per hour" 
                    onChangeText={(val) =>{this.setState({price:val})} }
                    keyboardType='numeric'
                    />
                <TouchableOpacity style={{alignSelf:'center' , backgroundColor:'#000' ,  borderRadius:10,marginTop:15}} onPress = {() => {this.approve()}}>
                    <Text style = {styles.button}>Approve Maharaj</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default ApproveUser;

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    boxText2: {
        color: 'black',
        margin: 10,
        fontSize:18,
        marginBottom:0

    },
    boxText: {
        color: 'black',
        margin: 10,
        fontSize:18,
        

    },
    input:{
        borderBottomColor:'black',
        borderBottomWidth:2,
    },
    button:{
        fontSize:25,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingRight:10 ,
        color:'white' 
        
    }
});
/*
                        <Text style={styles.boxText2}>Mobile : {this.state.item.mobile}</Text>
                        <Text style={styles.boxText2}>Address : {this.state.item.registeredAddress.address }</Text>
                        <Text style={styles.boxText2}>Zipcode : {this.state.item.registeredAddress.zipcode}</Text>
                        <Text style={styles.boxText2}>CreatedAt : {this.state.item.createdAt} </Text>
                        
                        */
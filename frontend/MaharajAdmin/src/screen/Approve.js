import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from "react-native";


class Approve extends Component {
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            Data:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:5000/api/v1/maharajAuth/maharajs",{
            method:"GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.warn(data)
            data = data.filter((approved) =>{
                 return approved.isApproved==false || approved.isApproved==null

            })
            this.setState({
                isloading:false,
                Data:data
            })
        })
        .catch((error) =>{
            console.warn(error)
        })
    }
    approve = () =>{
        fetch('')
    }
    render() {
        if(this.state.isloading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#00ff00"  />
                </View>
            )
        }
        else{
            return(
                <View>
                <Text></Text>
                    <FlatList 
                    data={this.state.Data}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) =>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ApproveUser',{'item':item})}}>
                        <View style={styles.box}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>Approve</Text>
                        </View>
                    </TouchableOpacity>}
                    />
                </View>
            )
        }
    }
}
export default Approve;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box:{
        borderBottomColor:'grey',
        borderBottomWidth:2,
        fontSize:30,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text:{
        fontSize:20
    }
});
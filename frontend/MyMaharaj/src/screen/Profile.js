import React from 'react';
import { Text, StyleSheet, ImageBackground , Image, View , TouchableOpacity , SafeAreaView , ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Profile extends React.Component{
    constructor(props){
        super(props)
    }

render(){
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf: "center", marginTop:80}}>
                <TouchableOpacity style={styles.profileImage}
                    onPress={() => this.chooseImage()}>
                </TouchableOpacity>
                
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Manav Jain</Text>
                <Text style={[styles.text3, { color: "#ababab", fontSize: 14 }]}>manavjain709@gmail.com</Text>
                <Text style={[styles.text3, { color: "#ababab", fontSize: 14 }]}>+91 9833320648</Text>
                <Text style={[styles.text3, { color: "#ababab", fontSize: 14 }]}>Mumbai</Text>
            </View>
            <TouchableOpacity style = {styles.button}
                onPress={() => this.signout()} >
                    <Icon style={{alignSelf: 'flex-end',}}
                name = "sign-out"
                size = {20}
                color = "#ababab"
            />
                    <Text style = {{color: '#ababab', textAlign:'center'}}> SIGN OUT</Text>
                </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>

)}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        fontFamily: "Roboto-Regular",
        color: "#000",
        fontSize: 20
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 25,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor:'yellow'
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
        paddingTop: 20
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    button: {
        borderRadius: 10,
        //width: 100,
       // backgroundColor: 'red',
      paddingTop:200,
      paddingLeft: 280,
      flexDirection: 'row'

    
    },
    text2: {
        fontSize: 22,
        fontFamily: 'FiraSansCondensed-Regular',
        color: 'white'
    },
    text3: {
        fontSize:16,
        fontFamily: 'SpaceMono-Regular',
        color: '#ababab'
    }
});


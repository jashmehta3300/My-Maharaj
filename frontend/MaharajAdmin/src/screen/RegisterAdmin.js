import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class RegisterAdmin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>RegisterAdmin</Text>
            </View>
        );
    }
}
export default RegisterAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
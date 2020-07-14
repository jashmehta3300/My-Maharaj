import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class FAQ extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FAQ</Text>
            </View>
        );
    }
}
export default FAQ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
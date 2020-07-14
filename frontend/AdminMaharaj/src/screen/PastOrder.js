import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class PastOrder extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PastOrder</Text>
            </View>
        );
    }
}
export default PastOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
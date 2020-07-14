import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ShowRequest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ShowRequest</Text>
            </View>
        );
    }
}
export default ShowRequest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
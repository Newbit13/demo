import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
    View,
    Text,
    Button
  } from 'react-native';
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
        <View>
            <Text>Hello, Navigation!</Text>
            <Button
            title="Go to Chat"
            onPress={() => this.props.navigation.navigate('Chat')}
            />
            {/* <Button
            title="ttt"
            onPress={() => console.log(123)}
            /> */}
        </View>
        );
    }
}

export default HomeScreen
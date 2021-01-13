import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
class ChatScreen extends React.Component {
    static navigationOptions = {
      title: 'Chat with Lucy',
    };
    render() {
      return (
        <View>
          <Text>Chat with Lucy</Text>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }

export default ChatScreen
import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  View,
  Text,
  Button,
  TextInput,
  FlatList
} from 'react-native';

const styles = StyleSheet.create({
  box:{
    backgroundColor: '#24a5ff',
    height:2000
  },
})


class ZeroScreen extends React.Component {
    static navigationOptions = {
      title: 'Zero',
    };
    render() {
      return (
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.box}></View>
            <Text>123</Text>
            <TextInput vale='123'/>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }
  }

export default ZeroScreen
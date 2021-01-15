import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    ScrollView
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import request from '../../util/request';
import LinearGradinet from 'react-native-linear-gradient';


const styles = StyleSheet.create({
    s:{}
});

class IndexScreen extends React.Component {
    static navigationOptions = {
        title: 'Index',
    };
    render() {
        return (
        <ScrollView style={styles.s}>
            <Text>Hello, Navigation!</Text>
            <View style={styles.center} backgroundColor='#ff0000'>
                
            </View>
        </ScrollView>
        );
    }
}



export default IndexScreen
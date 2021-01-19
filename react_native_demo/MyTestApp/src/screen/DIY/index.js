import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    ScrollView,
    NativeModules
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import request from '../../util/request';
import LinearGradinet from 'react-native-linear-gradient';


const styles = StyleSheet.create({
    scroll:{
        // flex:1,
        // height:100,
        backgroundColor: '#24a5ff',
    },
    normalBtn:{
        width:100,
        borderRadius:20,
        overflow:'hidden',
        // backgroundColor: '#e0708c'
    },
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
        <ScrollView style={styles.scroll}>
            <Text>Android原生模块!</Text>
            <View style={styles.normalBtn} backgroundColor='#ffff00'>
                <Button
                    title="触发功能"
                    // onPress={() => console.log(NativeModules.ToastExample)}
                    onPress={() => {
                        // console.log(typeof NativeModules.ToastExample.show);
                        NativeModules.ToastExample.show("我是通过原生模块调用的toast", NativeModules.ToastExample.LONG);
                        NativeModules.ToastExample.testCallBack(function(v){
                            console.log('这是回调的：',v);
                        });
                        console.log(1);
                    }}
                />
            </View>
        </ScrollView>
        );
    }
}



export default HomeScreen
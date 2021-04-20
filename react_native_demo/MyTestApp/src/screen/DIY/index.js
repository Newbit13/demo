import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    ScrollView,
    NativeModules,
} from 'react-native';

import { WebView } from 'react-native-webview';

import { TouchableOpacity } from 'react-native-gesture-handler';

import request from '../../util/request';
import LinearGradinet from 'react-native-linear-gradient';


const styles = StyleSheet.create({
    scroll: {
        // flex:1,
        // height:100,
        backgroundColor: '#24a5ff',
    },
    normalBtn: {
        width: 100,
        borderRadius: 20,
        overflow: 'hidden',
        // backgroundColor: '#e0708c'
    },
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
            // <WebView source={{ uri: 'https://www.icardfinancial.com/kaduofen_ankangwuyou/index.html#/member/rightsHome?orderId=1192104100013156481&encrypt=kNfH%2Byv8UeAPDXl35BO7slAEyWBBMUezu8LW2wNzsjzTnBo%2BCZBvi4TvAwW46yKewoG1TkPsdLt88vliKnUhIiIflFHLKaTd9AaX4KlOUe0%2BdOBWs3YnVlRlzaXBVDa67l4b6ufRaK2SoKyuBCf22cxc20nYGEVTtHHidtFElnA%3D&qd=baijinxinyong-sdk' }} />
            <WebView source={{ uri: 'https://url.cn/7wILQFbB' }} />
            // <ScrollView style={styles.scroll}>
            //     <Text>Android原生模块!</Text>
            //     <View style={styles.normalBtn} backgroundColor='#ffff00'>
            //         <Button
            //             title="触发功能"
            //             // onPress={() => console.log(NativeModules.ToastExample)}
            //             onPress={() => {
            //                 // console.log(typeof NativeModules.ToastExample.show);
            //                 NativeModules.ToastExample.show("我是通过原生模块调用的toast", NativeModules.ToastExample.LONG);
            //                 NativeModules.ToastExample.testCallBack(function (v) {
            //                     console.log('这是回调的：', v);
            //                 });
            //                 console.log(1);
            //             }}
            //         />
            //     </View>
                
            // </ScrollView>
        );
    }
}



export default HomeScreen
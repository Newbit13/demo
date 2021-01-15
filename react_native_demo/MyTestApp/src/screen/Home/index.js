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
    lg:{
        marginBottom:10,
        borderBottomColor: '#ff0000',
    },
    logo: {
        width: '100%',
        height: 158,
        backgroundColor: '#e0708c',
        borderRadius:20
    },
    bg:{
        width: '100%',
        height: 158,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexContainer:{
        width: '100%',
        height: 158,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#9b63cd'
    },
    half:{
        width: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0708c'
    },
    center:{
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff00ff'
    },
    mybtn:{
        width:100,
        // borderRadius:20无效
    }
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        return (
        <ScrollView style={styles.scroll}>
            <Text>Hello, Navigation!</Text>
            <View style={styles.center} backgroundColor='#ff0000'>
                <View style={styles.normalBtn} backgroundColor='#ffff00'>
                    <Button
                        title="Go to Chat"
                        onPress={() => this.props.navigation.navigate('Chat')}
                    />
                </View>
            </View>
            <View style={styles.center}>
                <Button
                    style={styles.mybtn}
                    title="Go to Zero"
                    onPress={() => this.props.navigation.navigate('Zero')}
                />
            </View>
            <LinearGradinet
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#9b63cd', '#e0708c']}
                style={styles.lg}
            >
                <Button 
                    title="request"
                    color="transparent"
                    onPress={() => {request();}}/>
            </LinearGradinet>
            <TouchableOpacity>
                <LinearGradinet
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#9b63cd', '#e0708c']}
                    style={styles.lg,styles.center}
                >
                    <Text>request</Text>
                </LinearGradinet>
            </TouchableOpacity>
            <Image 
                style={styles.logo}
                resizeMode='contain'
                source={require('../../static/bg.jpg')}/>
            <ImageBackground 
                style={styles.bg}
                imageStyle={{
                    borderRadius:40
                }}
                source={require('../../static/bg.jpg')}>
                <Text style={{color:'#e0708c',fontSize:60}}>123</Text>
            </ImageBackground>
            <View style={styles.flexContainer}>
                <View style={styles.half}>
                    <Text style={{color:'#000000',fontSize:60}}>123</Text>
                </View>
            </View>
        </ScrollView>
        );
    }
}



export default HomeScreen
import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
  
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
  
import LinearGradinet from 'react-native-linear-gradient';

const Adp = (props) => {
    const [num,updateNum] = useState(3);
    const intervalRef = useRef();
    useEffect(()=>{
        intervalRef.current = setTimeout(()=>{
        if(num < 1){
            props.handleFinish();
            clearInterval(intervalRef.current)
        }else{
            updateNum(num - 1);
        }
        },1000)
    },[num])

    useEffect(()=>{
        return ()=>{
        clearTimeout(intervalRef.current)
        }
    },[])

    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#9b63cd"/>
        <SafeAreaView>
            <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                <View stlye={styles.body}>
                <Text>这是广告页{num}s</Text>
                </View>
                <LinearGradinet
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#9b63cd', '#e0708c']}
                    // style={{width: 200, height: 200}}
                >
                <Button 
                    title="Learn More"
                    color="transparent"
                    accessibilityLabel="Learn" />
                </LinearGradinet>
            </ScrollView>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: Colors.lighter,
},
engine: {
    position: 'absolute',
    right: 0,
},
body: {
    backgroundColor: Colors.white,
}
});

export default Adp
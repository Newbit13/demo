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
  FlatList,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions,
  RefreshControl
} from 'react-native';

// const { Height } = Dimensions.get('window')
// console.log(Height);

const styles = StyleSheet.create({
  kb:{
    backgroundColor: "#00ffff",
    // backgroundColor: "transparent",
    // margin: 10,
    // height:500,
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center'
    // width:300
  },  
  box:{
    backgroundColor: '#24a5ff',
    width:'50%',
    height:200
  },
  scroll:{
    // flex:1,
    backgroundColor: '#24a5ff',
    // height:Height,
    // height:500,
  },
  container:{
    // flex:1,
    height:400,
    backgroundColor: '#ff0000',
    justifyContent:'center',
    alignItems:'center'
  },
  modal:{
    flex:0.5,
    marginTop: '50%',
    marginLeft:10,
    marginRight:10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  btnText:{
    backgroundColor: "#F194F0",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function ZeroScreen(){
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView style={{ flex: 1 ,backgroundColor: "#24a5ff",}}>
      <KeyboardAvoidingView
        style={{ flex: 1 ,backgroundColor: "#00ffff",}}
        keyboardVerticalOffset={100}
        behavior={"position"}
      >
        <View style={styles.container}>
          <TextInput value='123'/>
          <View style={styles.box}></View>
          <Text>123</Text>
          <TouchableHighlight
            activeOpacity={0.3}
            underlayColor="#F194FF"
            style={styles.openButton}
            onPress={()=>{
              setModalVisible(true)
            }}
          >
            <Text style={styles.btnText}>click me</Text>
          </TouchableHighlight>
          <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>{
              Alert.alert("Modal has been closed.");
              setModalVisible(false)
            }}
          >
            <View
              style={styles.modal}
            >
              <Text>hhhh</Text>
              <TouchableHighlight
                activeOpacity={0.4}
                underlayColor="#F194FF"
                style={styles.openButton}
                onPress={()=>{
                  setModalVisible(false)
                }}
              >
                <Text style={styles.btnText}>click me</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

ZeroScreen.navigationOptions = {
  title: 'Zero1',
};

export default ZeroScreen
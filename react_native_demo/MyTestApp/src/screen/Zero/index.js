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
  Dimensions
} from 'react-native';

const { Height } = Dimensions.get('window')

const styles = StyleSheet.create({
  box:{
    backgroundColor: '#24a5ff',
    width:'50%',
    height:200
  },
  scroll:{
    // height:"100%",
    // height:500,
  },
  container:{
    height:"100%",
    // height:500,
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


function ZeroScreen(){
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior="position" style={{backgroundColor: '#666666'}}>
      <ScrollView style={styles.scroll}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

ZeroScreen.navigationOptions = {
  title: 'Zero23333',
};

export default ZeroScreen
import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Button,
  FlatList
} from 'react-native';

const styles = StyleSheet.create({
  item:{
    backgroundColor: '#24a5ff',
    alignItems:'center',
    justifyContent:'center',
    height:20
    // marginTop:10
  },
  title:{
    color:'#ffffff'
  },
  separator:{
    height:5,
    backgroundColor: '#0000ff'
  },
  nodata:{
    // flex:1,
    height:200,
    // width:600,
    // textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#24a5ff'
  },
  flat:{
    height:200,
    backgroundColor: '#ff0000'
  },
  logo: {
    width:50,
    height:50,
    backgroundColor: '#e0708c',
  }
})

const DATA = [];

// for(var i = 0;i<20;i++){
//   DATA.push({
//     id:String(i),
//     title:i
//   })
// }

const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const renderItem = ({ item,index,separators }) => {
  return (
    <Item title={item.title} />
  )
};

const Separator = ()=>{
  return <View style={styles.separator}/>
}

const EmptyComp = ()=>{
  return (
    <View style={styles.nodata}>
      <Image 
        style={styles.logo}
        resizeMode='cover'
        source={require('../../static/bg.jpg')}/>
    </View>
  )
}

class ChatScreen extends React.Component {
    static navigationOptions = {
      title: 'Chat with Lucy',
    };
    render() {
      return (
        <View style={{height:200}}>
          <Button
            title="Go back"
            color='#006000'
            onPress={() => this.props.navigation.goBack()}
          />
          <FlatList 
            stlye={styles.flat}
            data={DATA}
            ItemSeparatorComponent = {Separator}
            ListEmptyComponent = {EmptyComp}
            renderItem={renderItem}
            keyExtractor={item => item.id} />
          <Text>End</Text>
        </View>
      );
    }
  }

export default ChatScreen
import React,{useState,useEffect,useCallback,useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ImageBackground,
    ScrollView,
    SectionList,
    SafeAreaView
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import request from '../../util/request';
import LinearGradinet from 'react-native-linear-gradient';

const DATA = [
    {
        ha:'dsadsa1',
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        ha:'dsadsa2',
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        ha:'dsadsa3',
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        ha:'dsadsa4',
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50,
        marginHorizontal: 16
      },
      item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
      },
      header: {
        fontSize: 32,
        backgroundColor: "#fff"
      },
      title: {
        fontSize: 24
      }
});

class SectionScreen extends React.Component {
    static navigationOptions = {
        title: 'Index',
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(a) => {
                        console.log(a);
                        let { item } = a;
                        return <Item title={item} />
                    }}
                    renderSectionHeader={(a) => {
                        // console.log(a);
                        let { section: { title,ha } } = a;
                        return <Text style={styles.header}>{title}-{ha}</Text>
                    }}
                />
            </SafeAreaView>
        );
    }
}



export default SectionScreen;
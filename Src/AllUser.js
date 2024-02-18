import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable,TouchableOpacity,TextInput,ScrollView,Animated,Modal,Alert} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import { addDoc, collection, getDocs,deleteDoc,doc,onSnapshot } from 'firebase/firestore';
import { db,firebase } from '../database/firebase';
import 'firebase/compat/storage';
import Navbar from './Navbar';
import { AntDesign } from '@expo/vector-icons';
import { faCirclePlus,faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const AllUser2 = () => {
    const [scaleValue] = useState(new Animated.Value(1))
  const navigation = useNavigation();
  const [fetchedData, setFetchedData] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchQuery,setSearchQery] = useState("")
  const [handleInputChange,sethandleInputChange] = useState("")
  const [inputValue,setinputValue] = useState("")
  const [originalData, setOriginalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  async function DeleteData(key) {
    try {
        Alert.alert(
            "Confirm Delete",
            "คุณต้องการลบใช่ไหม ?",
            [
                {
                  text: "Yes",
                  onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "Miniproject", key));
                        console.log("Document successfully deleted!");
                    } catch (error) {
                        console.error("Error removing document: ", error);
                    }
                }
                },
                { 
                  text: "No", 

                }
            ],
        );
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}


useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'Miniproject'), (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setFetchedData(data);
       setOriginalData(data);
  });

  return () => unsubscribe();
}, []);

function handleFilter(searchTerm) {
    if (searchTerm.trim() === "") {
      setFetchedData(originalData);
      console.log("Empty");
    } else {
      const SearchData = originalData.filter((user) =>
        user.Name.toUpperCase().includes(searchTerm.toUpperCase())
      );
      setFetchedData(SearchData);
      console.log("Filtered Data:", SearchData);
    }
  }



  return (
    <View style={{backgroundColor:"#fff"}}>
    <ScrollView>
    <View style={{height:1000}}>
    <View style={{top:60}}>
    {!isInputVisible && (
    <View >
      <Text style={[{marginLeft:30,fontFamily:'Kanit Medium',fontSize:23,top:1}]}>ข้อมูลผู้ใช้ทั้งหมด</Text>
    </View>
  )}
    {isInputVisible ? (
      <View>
        <TextInput
          style={[{ height: 50 }, { width: 300 },{paddingLeft:10},{marginLeft:30},{backgroundColor:"#dedede"},{borderRadius:10}]}
          placeholder="Search"
          onChangeText = {(event)=>{
            handleFilter(event)
            console.log(event)
          }}
        />
        <TouchableOpacity onPress={toggleInputVisibility}>
        <AntDesign name="close" size={24} color="black" style={[styles.iconlylightsearch,{marginLeft:85},{top:-35}]}/>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={toggleInputVisibility}>
        <Image
          style={[styles.iconlylightsearch,{marginLeft:100},{top:-20}]}
          contentFit="cover"
          source={require("../assets/iconlylightsearch4.png")}
        />
      </TouchableOpacity>
    )}

    <Pressable style={{top:550,marginLeft:290}} 
    onPress={() =>  navigation.navigate('AddUser')}>
    <FontAwesomeIcon icon={faCirclePlus} size={60} style={[{color:"#509bed"}]}/>
    </Pressable>
    
  </View>
    <Pressable style={{top:30}}>
    {fetchedData.map((item,key) => (
      <View>
      <View style={{ height: 0.7, backgroundColor: '#8f8f8f' }} />
        <Text
        style={[{marginLeft:30,marginTop:10}]}
        >
        {key+1}.  {item.Name}
        </Text>
        <Text style={[{marginLeft:30}]}>
        {item.Email}
        </Text>
        <Text style={[{marginLeft:30}]}>
        {item.Mobile}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end',bottom:40 }}>
        <Pressable
        style={{ marginRight: 10 }}
        onPress={() =>
          navigation.navigate('Edit', {
            id: item.id,
            Name: item.Name,
            Mobile: item.Mobile,
            Email: item.Email,
          })}>
        <FontAwesomeIcon icon={faPenToSquare} size={21} />
      </Pressable>

      <Pressable
        style={{ marginRight: 30 }}
        onPress={() => DeleteData(item.id)}>
        <FontAwesomeIcon icon={faTrashCan} size={21} style={{ color: '#e42121' }} />
      </Pressable>

    </View>
    </View>
    ))}
    <View style={{ height: 0.7, backgroundColor: '#8f8f8f' }} />
    </Pressable>

  <View>
  </View>
  </View>
  </ScrollView>
  <Navbar/>
    </View>
  )
}
const styles = StyleSheet.create({
    search: {
        borderRadius:10,
        backgroundColor: "#DCDBDB",
        marginLeft: 10,
        lineHeight: 50,
      },
      iconlylightsearch: {
        marginLeft: 99.5,
        height: 20,
        width: 20,
        left: "50%",
        top: -10,
        position: "absolute",
      },
    
})
export default AllUser2
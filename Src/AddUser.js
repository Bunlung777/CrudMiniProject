import { View, Text,TextInput,Button,StyleSheet,Pressable } from 'react-native'
import React,{useState,useRef} from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db,firebase } from '../database/firebase';
import { useNavigation } from "@react-navigation/native";
import Navbar from './Navbar';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const AddUser = () => {
    const navigation = useNavigation();
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile, setMobile] = useState('');
    
    async function create() {
        try {
          const Miniproject = collection(db, 'Miniproject');
          await addDoc(Miniproject, {
            Name: Name,
            Email: Email,
            Mobile: Mobile,
          });
          setName('');
          setEmail('');
          setMobile('');

          alert('Document created successfully!');
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }
      const navigateAndCreate = () => {
        create(); // เรียกฟังก์ชัน create() ก่อน
        navigation.navigate('AllUser2'); // จากนั้นนำทางไปยังหน้า AllUser2
      };
  return (
    <View style={{backgroundColor:"#fff",height:"100%"}}>
    <View style={{top:50,alignItems:"center"}}>
        <Text style={{fontSize:25,fontFamily:'Kanit Medium'}}>เพิ่มผู้ใช้งาน</Text>
    </View>
    <Pressable 
        style={{alignSelf:"flex-start",marginLeft:30,top:23}}
        onPress={()=>navigation.navigate('AllUser')}>
        <FontAwesomeIcon icon={faChevronLeft} size={21}/>
      </Pressable>
    <View style={{ height: 1, backgroundColor: 'black',top:60 }} />
    <View style={{top:200,marginLeft:100}}>
    <Text style={{top:5}}>Name:</Text>
    
    <TextInput
    placeholder='Name'
    style={styles.InputColor}
    onChangeText={setName}
    value={Name}
    />
    <Text style={{top:5}}>Email:</Text>
    <TextInput
    placeholder='Email'
    style={styles.InputColor}
    onChangeText={setEmail}
    value={Email}
    />
    <Text style={{top:5}}>Mobile:</Text>
    <TextInput
    placeholder='Mobile'
    style={styles.InputColor}
    onChangeText={setMobile}
    value={Mobile}
    />
    <Pressable style={styles.button} onPress={create}>
      <Text style={{color:'white',fontFamily:'Kanit Light'}}>บันทึก</Text>
    </Pressable>
    </View>
<Navbar/>
    </View>
  )
}
const styles = StyleSheet.create({

InputColor: {
marginLeft:70,
bottom:23,
borderRadius:10,
width:150,
borderColor:"#171717",
height:40,
backgroundColor:"#f2f3f5",
padding:10
},
button: {
  marginLeft:50,
  alignItems:"center",
  justifyContent: 'center',
  width:100,
  height:40,
  borderRadius: 4,
  elevation: 3,
  backgroundColor: 'black',
  borderRadius: 10,
  shadowColor: '#000000', // Shadow color (for iOS)
  shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
  shadowOpacity: 0.25, // Shadow opacity (for iOS)
  shadowRadius: 3.84, // Shadow radius (for iOS)
  elevation: 5, // Elevation (for Android)
}

})
export default AddUser
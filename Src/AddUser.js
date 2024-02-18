import { View, Text,TextInput,Button,StyleSheet } from 'react-native'
import React,{useState,useRef} from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db,firebase } from '../database/firebase';
import { useNavigation } from "@react-navigation/native";
import Navbar from './Navbar';
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
        <Text style={{fontSize:25}}>เพิ่มผู้ใช้งาน</Text>
    </View>

    <View style={{top:200,marginLeft:100}}>
    <Text>Name:</Text>
    
    <TextInput
    placeholder='Name'
    style={styles.InputColor}
    onChangeText={setName}
    value={Name}
    />
    <Text>Email:</Text>
    <TextInput
    placeholder='Email'
    style={styles.InputColor}
    onChangeText={setEmail}
    value={Email}
    />
    <Text>Mobile:</Text>
    <TextInput
    placeholder='Mobile'
    style={styles.InputColor}
    onChangeText={setMobile}
    value={Mobile}
    />
    <View style={{width:100,marginLeft:50}}>
    <Button
  title="บันทึก"
  color="#841584"
  style={{ width: 10, height: 10 }}
  onPress={() => 
    create()
    }
    />
    </View>
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
borderWidth: 1,
height:40 
}

})
export default AddUser
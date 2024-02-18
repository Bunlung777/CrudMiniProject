import { View, Text,TextInput,StyleSheet,Button, Pressable } from 'react-native'
import React,{useState} from 'react'
import { updateDoc,doc } from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { db,firebase } from '../database/firebase';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Navbar from './Navbar';
import { useFonts } from 'expo-font';
const Edit = ({route}) => {
    const navigation = useNavigation();
    const [updateName, setUpdateName] = useState(route.params.Name);
    const [updateEmail, setUpdateEmail] = useState(route.params.Email);
    const [updateMobile, setUpdateMobile] = useState(route.params.Mobile);
    const [fontLoaded] = useFonts({
      'Kanit Light': require('../assets/fonts/Kanit-Light.ttf'),
      'Kanit Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    });
    async function updateData(documentId, newData) {
        const UpdeteValue = doc(db, 'Miniproject', documentId);
        await updateDoc(UpdeteValue, newData);
        console.log('Document successfully updated!');
      }

    const update = async (e) => {
            const newData = {
                Name: updateName,
                Email: updateEmail,
                Mobile: updateMobile,
            };
            await updateData(route.params.id, newData);
        } 
    
  return (
    <View>
<View style={{backgroundColor:"#fff",height:"100%"}}>
    <View style={{top:50,alignItems:"center"}}>
        <Pressable 
        style={{alignSelf:"flex-start",marginLeft:30,top:28}}
        onPress={()=>navigation.navigate('AllUser')}>
        <FontAwesomeIcon icon={faChevronLeft} size={21}/>
        </Pressable>
        <Text style={{fontSize:25,fontFamily:'Kanit Medium'}}>แก้ไขข้อมูลผู้ใช้งาน</Text>
    </View>
    <View style={{ height: 1, backgroundColor: 'black',top:60 }} />
    <View style={{top:200,marginLeft:100}}>
    <Text style={{top:5}}>Name:</Text>
    
    <TextInput
    placeholder='Name'
    style={styles.InputColor}
    onChangeText={setUpdateName}
    defaultValue={updateName}
    />
    <Text style={{top:5}}>Email:</Text>
    <TextInput
    placeholder='Email'
    style={styles.InputColor}
    onChangeText={setUpdateEmail}
    defaultValue={updateEmail}
    />
    <Text style={{top:5}}>Mobile:</Text>
    <TextInput
    placeholder='Mobile'
    style={styles.InputColor}
    onChangeText={setUpdateMobile}
    defaultValue={updateMobile}
    />
    <Pressable style={styles.button} onPress={update}>
      <Text style={{color:'white',fontFamily:'Kanit Light'}}>บันทึก</Text>
    </Pressable>
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
    height:40,
    shadowColor: '#000000', // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    shadowOpacity: 0.25, // Shadow opacity (for iOS)
    shadowRadius: 3.84,
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
export default Edit
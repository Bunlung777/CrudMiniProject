import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import { FontFamily, FontSize, Border, Color, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const Navbar = () => {
    const navigation = useNavigation();
  return (
<View style={[styles.menuBar]}>
        <View style={[styles.homeParent]}>
          <View style={[styles.home1FlexBox]}>

          <Pressable onPress={() => navigation.navigate("AllMuseum")}>
            <FontAwesomeIcon icon={faUsers}               
            style={[styles.iconLayout2,{marginLeft:10,color:"#74C0FC"}]}
            size={25}/>
            <Text style={[styles.doctorsFlexBox]}>
              เพิ่มผู้ใช้งาน
            </Text>
            </Pressable>
          </View>

          
          <View style={[ styles.home1FlexBox]}>
          <Pressable onPress={() => navigation.navigate("AllUser2")}>
            <Image
              style={[ styles.iconLayout2,{marginLeft:5}]}
              contentFit="cover"
              source={require("../assets/icon-home.png")}
            />
            <Text style={[styles.doctorsFlexBox]}>
              หน้าหลัก
            </Text>
            </Pressable>
            </View>
            
          <View style={[ styles.home1FlexBox]}>
          <Pressable onPress={() => navigation.navigate("Notification1")}>
          <Image
              style={[ styles.iconLayout2,{marginLeft:5}]}
              contentFit="cover"
              source={require("../assets/vuesaxlinearnotification1.png")}
            />
            <Text style={[styles.doctorsFlexBox]}>
              แจ้งเตือน
            </Text>
            </Pressable>
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
    menuBar: {
        bottom: -25,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        elevation: 20,
        shadowOpacity: 2,
        shadowOffset: {
          width: 100,
          height: 10,
        },
        backgroundColor: Color.basicWhite100Main,
        width: wp(100),
        marginLeft: -200,
        left: "50%",
        position: "absolute",
        height:hp(12),
      },
      homeParent: {
        alignItems: "flex-end",
        alignSelf: "stretch",
        flexDirection: "row",
        height: 52,
        justifyContent: "center",
        marginTop:10
      },
      home1FlexBox: {
        flex: 1,
        marginRight:15,
        alignItems: "center",
      },  
      iconLayout2: {
        height: 24,
        width: 24,
      },
      doctorsFlexBox: {
        color: Color.neutrals400,
        marginTop: 8,
        height: hp(2),
        display: "flex",
        textAlign: "center",
        lineHeight: 14,
        fontSize: FontSize.overlineXSmallBold10_size,
        fontFamily: FontFamily.buttonMRegular,
        justifyContent: "center",
        alignItems: "center",
      }
})

export default Navbar
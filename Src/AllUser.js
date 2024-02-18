import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable,TouchableOpacity,TextInput,ScrollView,Animated,TouchableNativeFeedback,Easing} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db,firebase } from '../database/firebase';
import 'firebase/compat/storage';
import Navbar from './Navbar';
import { AntDesign } from '@expo/vector-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const AllUser = () => {
  const [scaleValue] = useState(new Animated.Value(1))
  const navigation = useNavigation();
  const [fetchedData, setFetchedData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchQuery,setSearchQery] = useState("")
  const [handleInputChange,sethandleInputChange] = useState("")
  const [inputValue,setinputValue] = useState("")
  const [originalData, setOriginalData] = useState([]);
  const [buttonColor, setButtonColor] = useState(["#ffffff", "#ffffff"]);
  const [pressedButton, setPressedButton] = useState(null);
  const [TypeData, setTypeData] = useState([]);
  const [gradientColors, setGradientColors] = useState(["#FFFFFF", "#FFFFFF"]);

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };



  useEffect(() => {
    fetchData();
  }, []);
  
  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "Miniproject"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFetchedData(data);
      setOriginalData(data);
      console.log("Success")
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }

  const Detail = (id,name) =>{
    navigation.navigate('DetailMuseum',{id:id,name:name})
  }

  function handleFilter(searchTerm) {
    if (searchTerm.trim() === "") {
      setFetchedData(originalData);
      // console.log("Empty");
    } else {
      const SearchData = originalData.filter((user) =>
        user.Name.toUpperCase().includes(searchTerm.toUpperCase())
      );
      setFetchedData(SearchData);
      // console.log("Filtered Data:", filteredData);
    }
  }

  function TypeFilter(TypeId) {
    const filteredData = originalData.filter((type) =>
      type.Type.toUpperCase().includes(TypeId.toUpperCase())
    );
    setFetchedData(filteredData);
    setPressedButton(TypeId);
  }

  const animatedButton = () =>{
    Animated.timing(scaleValue,{
      toValue:0.8,
      duration:200,
      useNativeDriver:true
    }).start(()=>{
      Animated.timing(scaleValue,{
        toValue:1,
        duration:200,
        useNativeDriver:true
      }).start();
    })
  }
  
  return (
    <View>
      <ScrollView>
    <View style={styles.allMuseum}>
      <Pressable
        style={[styles.groupParent, styles.groupPosition]}
        // onPress={() => navigation.navigate("DetailMuseum")}
      >
        {fetchedData.map((item) => (
        <View style={styles.doccardLayout1}>
        <View style={{ height: 2, backgroundColor: '#505050' }} />
          <View style={[styles.doccard, styles.doccardShadowBox]}>
            <View style={[styles.doccardChild, styles.doccardLayout1]} />
            <Pressable onPress={() =>  navigation.navigate('Detail', { id: item.id , name: item.Name, detail:item.Detail,img:imageUrls[index],Page:AllMuseum })}>

            </Pressable > 
            <View style={styles.workoutTextWrapper}>
              <View style={styles.workoutText}>
                <Text
                  style={[styles.drWilliemSmith, styles.dentistRoyalPosition]}
                >
                  {item.Name}
                </Text>
                <Text style={[styles.dentistRoyal, styles.textTypo1]}>
                {item.Email}
                </Text>
              </View>
            </View>
          </View>
        </View>))}
      </Pressable>
      <View style={[styles.frameParent, styles.statusLayout]}>
        <Pressable onPress={() => navigation.navigate("Filter")}>
      <Image
          style={[styles.iconlylightsearch,{marginLeft:150},{top:20}]}
          contentFit="cover"
          source={require("../assets/iconlylightfilter.png")}
        />
        </Pressable>
  {!isInputVisible && (
    <View>
      <Text style={[styles.text5]}>พิพิธภัณฑ์ทั้งหมด</Text>
    </View>
  )}

  <View>
    {isInputVisible ? (
      <View>
        <TextInput
          style={[styles.search, styles.text6Typo, { height: 50 }, { width: 300 },{paddingLeft:10}]}
          placeholder="Search"
          onChangeText = {(event)=>{
            handleFilter(event)
            console.log(event)
          }}
        />
        <TouchableOpacity onPress={toggleInputVisibility}>
        <AntDesign name="close" size={24} color="black" style={[styles.iconlylightsearch,{marginLeft:100},{top:-35}]}/>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity onPress={toggleInputVisibility}>
        <Image
          style={[styles.iconlylightsearch,{marginLeft:100}]}
          contentFit="cover"
          source={require("../assets/iconlylightsearch4.png")}
        />
      </TouchableOpacity>
    )}
    <Pressable style={{top:580,marginLeft:290}} 
    onPress={() =>  navigation.navigate('AddUser')}>
    <FontAwesomeIcon icon={faCirclePlus} size={60} style={[{color:"#509bed"}]}/>
    </Pressable>
  </View>
</View>
       
    </View>
    </ScrollView>
    <Navbar/>
    </View>

  );
};

const styles = StyleSheet.create({
  line: {
    height: 1, // ความสูงของเส้น
    width: '100%', // ความกว้างของเส้น (ในที่นี้ให้เท่ากับ 100% ของพื้นที่ทั้งหมด)
    backgroundColor: '#DCDBDB', // สีของเส้น
  },
  groupPosition: {
    left: 20,
    position: "absolute",
  },
  text6Typo: {
    fontFamily: FontFamily.buttonMRegular,
    fontSize: FontSize.overlineSmallSemi_size,
    textAlign: "left",
  },
  doccardShadowBox: {
    shadowColor: "rgba(29, 22, 23, 0.07)",
    borderRadius: Border.br_xl,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  doccardLayout1: {
    height: 114,
    width: 400,
  },
  dentistRoyalPosition: {
    width:200,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  textTypo1: {
    lineHeight: 16,
    fontSize: FontSize.overlineSmallSemi_size,
    fontFamily: FontFamily.buttonMRegular,
  },
  frameChildLayout: {
    width: 18,
    borderRadius: Border.br_12xs,
    top: 2,
    height: 18,
  },
  timeLightPosition: {
    left: 21,
    position: "absolute",
  },
  textClr: {
    color: Color.neutrals9001,
    textAlign: "left",
    position: "absolute",
  },
  doccardLayout: {
    marginTop: 12,
    height: 114,
    width: 335,
  },
  statusLayout: {
    height: 44,
    position: "absolute",
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  listFlexBox: {
    padding:1,
    height: 36,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    textAlign: "center",
    lineHeight: 18,
    letterSpacing: 0.1,
    fontSize: FontSize.buttonMRegular_size,
  },
  homeFlexBox: {
    flex: 1,
    alignItems: "center",
  },
  iconPosition: {
    top: 757,
    height: 24,
    width: 24,
    position: "absolute",
  },
  doccardChild: {
    marginTop: -57,
    marginLeft: -167.5,
    opacity: 0.2,
    left: "50%",
    top: "50%",
    borderRadius: Border.br_xl,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: Color.basicWhite100Main,
    height: 114,
  },
  maskGroupIcon: {
    top: 20,
    width: 74,
    height: 74,
    borderRadius:100,
  },
  drWilliemSmith: {
    color: Color.blackColor,
    fontFamily: FontFamily.buttonLSemi,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0.1,
    fontSize: FontSize.buttonMRegular_size,
    textAlign: "left",
    top: 0,
  },
  dentistRoyal: {
    top: 22,
    color: Color.gray1,
    fontFamily: FontFamily.buttonMRegular,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  frameChild: {
    left: 3,
    position: "absolute",
  },
  frameItem: {
    left: 39,
    position: "absolute",
  },
  frameInner: {
    width: 18,
    borderRadius: Border.br_12xs,
    top: 2,
    height: 18,
  },
  frameChild1: {
    left: 57,
    position: "absolute",
  },
  frameChild2: {
    left: 75,
    position: "absolute",
  },
  text: {
    marginLeft: 25,
    top: 1,
    fontFamily: FontFamily.buttonMRegular,
    lineHeight: 16,
    fontSize: FontSize.overlineSmallSemi_size,
    left: "50%",
  },
  starParent: {
    top: 42,
    height: 18,
    width: 138,
    left: 0,
    position: "absolute",
  },
  workoutText: {
    height: 60,
    width: 138,
  },
  workoutTextWrapper: {
    top: 27,
    left: 106,
    position: "absolute",
  },
  component1Icon: {
    top: 26,
    left: 282,
    width: 33,
    height: 33,
    position: "absolute",
  },
  doccard: {
    left: 0,
    top: 0,
    height: 114,
    width: 335,
    position: "absolute",
  },
  doccard1: {
    shadowColor: "rgba(29, 22, 23, 0.07)",
    borderRadius: Border.br_xl,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  doccard2: {
    left: 0,
    top: 0,
    height: 114,
    width: 335,
    position: "absolute",
  },
  doccard3: {
    shadowColor: "rgba(29, 22, 23, 0.07)",
    borderRadius: Border.br_xl,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  workoutText4: {
    width: 149,
    height: 60,
  },
  doccard4: {
    shadowColor: "rgba(29, 22, 23, 0.07)",
    borderRadius: Border.br_xl,
    overflow: "hidden",
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  groupParent: {
    top: 172,
    height: 573,
  },
  allMuseumChild: {
    top: 96,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro_100,
    borderTopWidth: 0.5,
    width: 376,
    height: 1,
    display: "none",
    left: 0,
    position: "absolute",
  },
  frameChild27: {
    marginTop: -5.5,
    left: 50,
    top: "50%",
    position: "absolute",
  },
  text5: {
    marginTop: -1,
    fontSize: FontSize.h6Semi_size,
    lineHeight: 28,
    width: 164,
    fontFamily: FontFamily.buttonLSemi,
    fontWeight: "600",
    top: "50%",
    left: 0,
  },
  icon: {
    marginTop: -12,
    marginLeft: 143.5,
  },
  iconlylightfilter: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
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
  frameParent: {
    top: 48,
    width: 335,
    height: 44,
    left: 20,
  },
  text6: {
    color: Color.basicWhite100Main,
    textAlign: "center",
    fontFamily: FontFamily.buttonLSemi,
    fontWeight: "600",
  },
  text7: {
    fontWeight: "700",
    fontFamily: FontFamily.headerH7Header18,
    lineHeight: 14,
    fontSize: FontSize.overlineXSmallBold10_size,
    color: Color.basicWhite100Main,
    textAlign: "left",
  },
  badge: {
    backgroundColor: Color.statusNegative500Main,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    display: "none",
    width: 18,
    height: 18,
    borderRadius: Border.br_xl,
  },
  listTab: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_13xl,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor:"#dbdbdb"
  },
  text8: {
    fontFamily: FontFamily.buttonMRegular,
  },
  listTab1: {
    paddingHorizontal: Padding.p_base,
    marginLeft: 10,
    borderRadius: Border.br_xl,
  },
  tabBar: {
    top: 116,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    flexDirection: "row",
    width: 375,
    left: 0,
    position: "absolute",
    backgroundColor: Color.basicWhite100Main,
  },
  timeLight: {
    top: 12,
    width: 54,
    height: 21,
    borderRadius: Border.br_xl,
    overflow: "hidden",
  },
  status: {
    height: 44,
    position: "absolute",
    left: "50%",
    top: 0,
    overflow: "hidden",
  },
  vuesaxlinearnotificationIcon: {
    top: 750,
    left: 298,
    position: "absolute",
  },
  iconHome1: {
    left: 175,
  },
  vuesaxlinearnotification: {
    left: 300,
    top: 758,
    position: "absolute",
  },
  buildingBankIcon: {
    left: 50,
    overflow: "hidden",
  },
  vectorIcon: {
    top: 759,
    left: 314,
    width: 8,
    height: 9,
    position: "absolute",
  },
  allMuseum: {
    shadowColor: "rgba(0, 0, 0, 0.03)",
    height: 1000,
    overflow: "hidden",
    width: "100%",
    elevation: 40,
    shadowRadius: 40,
    flex: 1,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: Color.basicWhite100Main,
  },
  menuBar: {
    bottom: -27,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 20,
    height: 90,
    shadowOpacity: 2,
    shadowOffset: {
      width: 100,
      height: 10,
    },
    backgroundColor: Color.basicWhite100Main,
    width: 400,
    marginLeft: -200,
    left: "50%",
    position: "absolute",
  },homeParent: {
      alignItems: "flex-end",
      alignSelf: "stretch",
      flexDirection: "row",
      height: 52,
      justifyContent: "center",
    },
    users: {
      alignItems: "center",
    },
    home1FlexBox: {
      flex: 1,
      marginRight:15,
      alignItems: "center",
    },
    doctors: {
      width: 63,
      color: Color.neutrals400,
    },
    doctorsFlexBox: {
      color: Color.neutrals400,
      marginTop: 8,
      height: 11,
      display: "flex",
      textAlign: "center",
      lineHeight: 14,
      fontSize: FontSize.overlineXSmallBold10_size,
      fontFamily: FontFamily.buttonMRegular,
      justifyContent: "center",
      alignItems: "center",
    },  iconLayout2: {
      height: 24,
      width: 24,
    }
});

export default AllUser;

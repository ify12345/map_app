import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HSearchInput } from '../../components/HForm';
import {LinearGradient} from 'expo-linear-gradient';
import HText from '../../components/HText';



const Weather = () => {
  return (
    <SafeAreaView style={styles.container}>
         <HSearchInput placeholder='Search Location' />
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.backgroundContainer}>
       
        <ImageBackground
          source={require('../../assets/images/pattern2.png')}
          style={styles.imageBackground}
        >
        <LinearGradient
          colors={['#C7F876', '#7DCA24']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }} 
        >
        <View style={{flexDirection:"column",padding:20, gap:40,alignItems:"center",justifyContent:'space-between',}}>  
          <View style={{flexDirection:"row", justifyContent:"space-between",width:"100%"}}>
              <View style={{flexDirection:"column", justifyContent:"space-between"}}>
                    <Text style={{fontSize:24}}>Ikeja</Text>
                    <Text style={{fontSize:15,fontWeight:"200"}}>Lagos, Nigeria</Text>
              </View>
              <Text style={{fontSize:12,fontWeight:"500"}}>27th October 2023</Text>
          </View>
          
          <Image
          source={require('../../assets/images/sunny.png')}
        />

          <Text style={{ fontSize: 60, fontWeight: "500" }}>
                30 °C <Text style={{ fontSize: 20 }}>cloudy</Text>
         </Text>

         <View style={{flexDirection:"row", width:"100%", justifyContent:"center",gap:12}}>
            <View style={styles.box}>
            <Image
              source={require('../../assets/icons/eye.png')}
            />
             <Text style={{fontSize:15,fontWeight:"200"}}>Visibilty</Text>
             <Text style={{fontSize:15,fontWeight:"600",color:"#5DB400"}}>50%</Text>
            </View>

            <View style={styles.box}>
            <Image
              source={require('../../assets/icons/water-drop.png')}
            />
             <Text style={{fontSize:15,fontWeight:"200"}}>Pressure</Text>
             <Text style={{fontSize:15,fontWeight:"600",color:"#5DB400"}}>30%</Text>
            </View>
            
         </View>
         <View style={{flexDirection:"row", width:"100%", justifyContent:"center",gap:12}}>
            <View style={styles.box}>
            <Image
              source={require('../../assets/icons/cloud-rain.png')}
            />
             <Text style={{fontSize:15,fontWeight:"200"}}>Wind</Text>
             <Text style={{fontSize:15,fontWeight:"600",color:"#5DB400"}}>6Km/H</Text>
            </View>

            <View style={styles.box}>
            <Image
              source={require('../../assets/icons/sunset.png')}
            />
             <Text style={{fontSize:15,fontWeight:"200"}}>Sunset</Text>
             <Text style={{fontSize:15,fontWeight:"600",color:"#5DB400"}}>5:34pm</Text>
            </View>
            <View style={styles.box}>
            <Image
              source={require('../../assets/icons/thermometer.png')}
            />
             <Text style={{fontSize:15,fontWeight:"200"}}>Humidity</Text>
             <Text style={{fontSize:15,fontWeight:"600",color:"#5DB400"}}>65%</Text>
            </View>
            
         </View>

        </View>    
        </LinearGradient>
        </ImageBackground>
        <View style={{flexDirection:"column", justifyContent:"space-between",width:"100%", gap:10}}>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <Text style={{fontSize:29}}>Today</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                    <HText fontSize="14" fontWeight="semibold">
                        Next 7 days
                    </HText>
                    <TouchableOpacity>
                        <Image source={require("../../assets/icons/right.png")}/>
                    </TouchableOpacity>
                </View>
              </View>

              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",gap:8,}}>
                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/sunrise.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                30 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>

                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/sunrise.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                30 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",gap:8,}}>
                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/moon.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                30 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>

                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/sunrise.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                30 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>
              </View>

              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",gap:8,}}>
                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/sunrise.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                14 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>

                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/moon.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                13 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",gap:8,}}>
                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/sunrise.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                14 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>

                  <TouchableOpacity style={styles.forecast}>
                        <View style={{backgroundColor:"#5DB400" , borderRadius: 16, height:45, width:45 }}>
                              

                        <ImageBackground
                            source={require('../../assets/images/moon.png')}
                            style={styles.imageBackground}
                        ></ImageBackground>

                        </View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                                13 °C 
                        </Text>
                        <HText fontSize="14" fontWeight="semibold" color='gray'>
                             09:00
                        </HText>
                    </TouchableOpacity>
              </View>
        </View>
      
      </View>
    
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  backgroundContainer: {
    flex: 1,
    paddingVertical: 20,
    flexDirection:"column",
    gap:20
   
    
    
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    position: 'relative',
    zIndex: 20,
    borderRadius: 30
  },
  gradient: {
    flex: 1,
    blur: 200,
    position: 'relative',
    zIndex: 1,
    borderRadius: 30,
    
  },
  box:{
    padding:14,
    backgroundColor:"#EDFDDA",
    flexDirection: "column",
    gap:14,
    alignItems:"center",
    borderRadius:20,
    width: 100,

  },
  forecast:{
    borderColor: "#5DB400",
    borderRadius: 16,
    borderWidth: 0.8,
    flexDirection: "row",
    gap: 18,
    padding: 10,
    alignItems:"center",
   

  }
});

export default Weather;

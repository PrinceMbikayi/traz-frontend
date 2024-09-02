import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import COLORS from '../constants/colors'
import Button from '../components/Button'

const LetsStartScreen = ({ navigation }) => {
  return (
    <ScrollView>
    <LinearGradient
        style={{
            flex: 1,
        }}
        colors={[COLORS.secondary, COLORS.primary]}
    >
        <View style={{ flex: 1 }}>
            <View>
                <Image
                    source={require('../assets/images/heroc4.jpg')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius:20,
                        position: 'absolute',
                        top: 50,
                        left: 10,
                        transform: [
                            { translateX: 20 },
                            { translateY: 50 },
                            { rotate: "-15deg"}
                        ]
                    }}
                 />

                <Image
                    source={require('../assets/images/hero2.jpg')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius:20,
                        position: 'absolute',
                        top: 10,
                        left: 100,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "-5deg"}
                        ]
                    }}
                 />

                <Image
                    source={require('../assets/images/hero3.jpg')}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius:20,
                        position: 'absolute',
                        top: 165,
                        left: -50,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "15deg"}
                        ]
                    }}
                 />

                <Image
                    source={require('../assets/images/hero4.jpg')}
                    style={{
                        height: 200,
                        width: 200,
                        borderRadius:20,
                        position: 'absolute',
                        top: 155,
                        left: 100,
                        transform: [
                            { translateX: 50 },
                            { translateY: 50 },
                            { rotate: "-15deg"}
                        ]
                    }}
                 />

                 {/* content */}

                 <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 480, 
                    width: "100%",
                 }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white,
                    }}>Traz</Text>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: 800,
                        color: COLORS.white,
                    }}>Te trouve l'objet perdu.</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Connectez-vous pour trouver les objets perdu</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Appelez, profitez d'envois de SMS sécurisés et privés</Text>
                    </View>

                    <Button 
                        title="Trouver vos objets maintemant"
                        onPress={() => navigation.navigate("MainTabs")}
                        style={{
                            marginTop: 60,
                            width: "100%"
                        }}
                    />
                 </View>
            </View>
        </View>
    </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default LetsStartScreen
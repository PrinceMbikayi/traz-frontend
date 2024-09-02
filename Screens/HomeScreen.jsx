import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logoimg}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('login')} activeOpacity={0.6} style={styles.menu}>
        <View style={{ 
            backgroundColor: "#a2a2a2",
            width: 400,
            height: 300,
            borderRadius: 5,
          }}>
            <Image 
              source={require('../assets/images/search1.png')}
              style={{
                width: 120,
                height: 120,
                position: "absolute",
                top: 30,
                marginLeft: 140,
              }}
            />
            <View style={{
              marginTop: 150,
              padding: 20,
            }}>
              <Text style={{
                //fontFamily: "arial",
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff"
              }}>J'ai perdu un objet</Text>
              <Text style={{
                //fontFamily: "arial",
                fontSize: 16,
                width: "80%",
                fontWeight: "bold",
                textAlign: "center",
                color: "#f2eeed",
                marginTop: 20,
                marginLeft: 35
              }}>Cliquez-ici pour signaler votre objet perdu</Text>
            </View>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('login')} activeOpacity={0.6} style={styles.body}>
        <View style={{
          backgroundColor: "#31A350",
          width: 400,
          height: 300,
          borderRadius: 5,
        }}>
                      <Image 
              source={require('../assets/images/find.png')}
              style={{
                width: 120,
                height: 120,
                position: "absolute",
                top: 30,
                marginLeft: 140,
              }}
            />
            <View style={{
              marginTop: 150,
              padding: 20,
            }}>
              <Text style={{
                //fontFamily: "arial",
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff"
              }}>J'ai trouvé un objet</Text>
              <Text style={{
                //fontFamily: "arial",
                fontSize: 16,
                width: "80%",
                fontWeight: "bold",
                textAlign: "center",
                color: "#f2eeed",
                marginTop: 20,
                marginLeft: 35
              }}>Cliquez-ici pour signaler votre objet trouvé</Text>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D3D3D3",
    },
    head: {
      backgroundColor: "#F5F5F5",
      width: "100%",
      height: 60,
      padding: 20,
      marginTop: 70
    },
    menu: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logoimg: {
      width: 80,
      height: 40,
      position: "absolute",
      top: 10,
      left: 15,
    }
})

export default HomeScreen
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import Button from '../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    console.log('Email:', email); // Ajoutez cette ligne
    console.log('Password:', password); // Ajoutez cette ligne
  
    try {
      const response = await axios.post('https://traz-backend.vercel.app/api/auth/login', {
        email,
        password,
      });
  
      console.log('API Response:', response.data); // Ajoute cette ligne
  
      if (response.status === 200) {
        //Alert.alert('Succès', 'Connexion réussie!');
        const { token } = response.data;
        if (token) {
          await AsyncStorage.setItem('userToken', token);
          console.log('Token stored:', token);
          navigation.navigate('TabsAuth');
        } else {
          Alert.alert('Erreur', 'Token non reçu.');
        }
      } else {
        Alert.alert('Erreur', response.data.message || 'Erreur lors de la connexion.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    }
  };  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginVertical: 22 }}>
        <View style={{ marginVertical: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          marginVertical: 12,
          color: COLORS.black,
          marginLeft: 20
        }}>
          Hey, Bon retour !
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
          Re-bonjour, trouvez encore vos objets!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Addresse Email</Text>

          <View style={{
            width: "90%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            marginLeft: 22,
          }}>
            <TextInput 
              placeholder='Entrez votre addresse Email'
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Code Pin</Text>

          <View style={{
            width: "90%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 22,
            marginLeft: 22,
          }}>
            <TextInput 
              placeholder='Ex: 1234'
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShow}
              keyboardType='numeric'
              style={{
                width: "100%",
              }}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShow(!isPasswordShow)}
              activeOpacity={0.6}
              style={{
                position: "absolute",
                right: 12,
              }}
              >
                {
                  isPasswordShow == true ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.black} />
                  )
                }
              </TouchableOpacity>
          </View>
        </View>

        <View style={{
          flexDirection: "row",
          marginVertical: 6,
          marginLeft: 22,
        }}>

         <TouchableOpacity
          onPress={() => navigation.navigate('forgotPass')}
          activeOpacity={0.8}
         >
          <Text style={{ color: "blue" }}>Mot de passe oublié</Text>
         </TouchableOpacity>
        </View>

        <Button 
          onPress={handleLogin}
          title="Se connecter"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
          <View 
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
              marginLeft: 22,
            }}
          />

          <Text style={{ fontSize: 14 }}>Où se connecter avec</Text>
          <View 
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
              marginRight: 22,
            }}
          />
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "center"
        }}>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <Image 
              source={require('../assets/images/facebook.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
              marginLeft: 22,
              marginRight: 22,
            }}
          >
            <Image 
              source={require('../assets/images/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection:"row",
          justifyContent: "center",
          marginVertical: 22,
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black}}>Vous n'avez pas de compte?</Text>
          <Pressable
            onPress={() => navigation.navigate("authScreen")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6,
            }}>S'inscrire</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default Login
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import Button from '../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
  
    try {
      const response = await axios.post('https://traz-backend.vercel.app/api/auth/login', {
        email,
        password,
      });
  
      console.log('API Response:', response.data); // Ajoute cette ligne
  
      if (response.status === 200) {
        Alert.alert('Succès', 'Connexion réussie!');
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
          Mot de passe oublier
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
          Saissisez votre adresse mail
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
        
        <View style={{
          flexDirection: "row",
          marginVertical: 6,
          marginLeft: 22,
        }}>

         <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          activeOpacity={0.8}
         >
          <Text style={{ color: "blue" }}>Se connecter</Text>
         </TouchableOpacity>
        </View>

        <Button 
          onPress={handleLogin}
          title="Envoyer"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default ForgotPassword
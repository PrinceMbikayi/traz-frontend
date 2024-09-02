import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import COLORS from '../constants/colors'
import Button from '../components/Button'
import axios from 'axios';


const ConfirmUser = ({ navigation, route }) => {
    
    const email = route?.params?.email;
    
    if (!email) {
        Alert.alert('Erreur', 'Email non fourni');
        navigation.goBack();
        return null; // ou redirigez l'utilisateur vers un autre écran
    }

    const [confirmationCode, setConfirmationCode] = useState('');

    const handleConfirm = async () => {
        try {
          const response = await axios.post('https://traz-backend.vercel.app/api/auth/confirm', {
            email,  // Assurez-vous que l'email est celui utilisé lors de l'inscription
            confirmationCode,
          });
      
          if (response.status === 200) {
            Alert.alert('Succès', 'Votre compte a été confirmé!');
            navigation.navigate('TabsAuth'); // Redirigez l'utilisateur vers l'écran de connexion
          } else {
            Alert.alert('Erreur', response.data.message || 'Erreur lors de la confirmation.');
          }
        } catch (error) {
          Alert.alert('Erreur', error.response?.data?.message || 'Erreur de serveur.');
        }
      };
      

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: "20%", }}>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <View style={{ marginVertical: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          marginVertical: 12,
          color: COLORS.black,
          marginLeft: 20
        }}>
          Confirmez votre compte
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
          Entrez le code reçu par mail
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Code</Text>

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
              placeholder='Ex: 12e4'
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={confirmationCode}
              onChangeText={setConfirmationCode}
            />
          </View>
        </View>

        <Button 
          onPress={handleConfirm}
          title="Confirmer"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ConfirmUser
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import Button from '../components/Button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const UpdateProfile = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Erreur', 'Token non disponible. Veuillez vous reconnecter.');
          navigation.navigate('login');
          return;
        }

        const response = await axios.get('https://traz-backend.vercel.app/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          const userData = response.data.user;
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhone(response.data.phone);
          setProfileImage(response.data.profileImage);
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les données utilisateur.');
        }
      } catch (error) {
        Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la récupération des données utilisateur.');
      }
    };

    fetchUserData();
  }, [navigation]);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erreur', 'Token non disponible. Veuillez vous reconnecter.');
        return;
      }

      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      
      if (profileImage) {
        formData.append('profileImage', {
          uri: profileImage,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });
      }
  

      const response = await axios.put('https://traz-backend.vercel.app/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        Alert.alert('Succès', 'Mise à jour du profil réussie!');
        navigation.navigate('Profile', { reload: true });
        // Mettre à jour le token si nécessaire
        const { token: newToken } = response.data;
        await AsyncStorage.setItem('userToken', newToken);
        console.log('Token updated:', newToken);
        // Naviguer ou mettre à jour l'état en conséquence
      } else {
        Alert.alert('Erreur', response.data.message || 'Erreur lors de la mise à jour du profil.');
      }
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur de serveur.');
    }
  };
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10, }}>
      <View style={{ flex: 1, marginVertical: 22 }}>
        <View style={{ marginVertical: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          marginVertical: 12,
          color: COLORS.black,
          marginLeft: 20
        }}>
          Mettre à Jour votre Profile
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
         Changez vos coordonnées!
          </Text>
        </View>

        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage ? { uri: profileImage } : require('../assets/images/user.png')} 
          style={{ width: 200, height: 200, borderRadius: 50, marginLeft: 110, marginBottom: 10, }} />
        </TouchableOpacity>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Prénom</Text>

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
              placeholder='Ex: Onyx'
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Nom</Text>

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
              placeholder='Ex: Onyx'
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
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
              placeholder='Ex: onyxngabo@tranz.com'
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
          }}>Téléphone</Text>

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
              placeholder='Ex: 0971922023'
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Password</Text>

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
              placeholder='Entrez votre password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShow}
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

        <Button 
          onPress={handleUpdateProfile}
          title="Mettre à Jour"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />

        <View style={{
          flexDirection: "row",
          justifyContent: "center"
        }}>
        </View>

        <View style={{
          flexDirection:"row",
          justifyContent: "center",
          marginVertical: 22,
        }}>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default UpdateProfile
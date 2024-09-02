import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, View, Text, Image } from 'react-native'
import Button from '../components/Button'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token);

      if (!token) {
        Alert.alert('Erreur', 'Le token est introuvable. Veuillez vous reconnecter.');
        navigation.navigate('login');
        return;
      }

      const response = await axios.get('https://traz-backend.vercel.app/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Données utilisateur depuis le backend:', response.data);

      setUserData(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les données utilisateur.');
    }
  };

  useEffect(() => {
    fetchUserData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData(); // Recharger les données de l'utilisateur à chaque fois que l'écran est focalisé
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    try {
      // Envoyer une requête au backend pour la déconnexion
      const response = await axios.post('https://traz-backend.vercel.app/api/auth/logout');

      if (response.status === 200) {
        // Supprimer le token du stockage local
        await AsyncStorage.removeItem('userToken');
        
        // Naviguer vers la page de connexion
        navigation.navigate('login');
        
        //Alert.alert('Succès', 'Déconnexion réussie!');
      } else {
        Alert.alert('Erreur', 'Erreur lors de la déconnexion.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur de serveur.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logoimg}
        />
      </View>
      {userData ? (
        <>
        <View style={{
          marginTop: 45,
        }}>
          <Image 
              source={userData.profileImage ? { uri: userData.profileImage } : require('../assets/images/user.png')}
              style={styles.profileImage}
              resizeMode="cover"
          />
          </View>

          <View>
            <Text style={{
              marginTop: 10,
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: 18,
            }}>
              Prénom: {userData.firstName}
            </Text>

            <Text style={{
              marginTop: 10,
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: 18,
            }}>
              Nom: {userData.lastName}
            </Text>

          <Text style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 18,
            color: '#000',
          }}>
            Email: {userData.email}
          </Text>

          <Text style={{
              marginTop: 10,
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: 18,
            }}>
              Téléphone: {userData.phone}
            </Text>
          </View>
        </>
      ) : <Text>Erreur: Aucune donnée utilisateur trouvée.</Text> }
      <Button 
        onPress={handleLogout}
        title="Se deconnecter"
        filled
          style={{
            marginTop: 30,
            marginBottom: 10,
            width: "90%",
            marginLeft: 22,
          }}
        />

        <View>
        <Button 
        onPress={() => navigation.navigate('updateProfile')}
        title="Mis à jour"
        filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: 385,
            marginLeft: 22,
          }}
        />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    alignItems: "center",
    backgroundColor: "#D3D3D3",
  },
  head: {
    backgroundColor: "#292929",
    width: "100%",
    height: 60,
    padding: 20,
  },
  logoimg: {
    width: 80,
    height: 40,
    position: "absolute",
    top: 10,
    left: 15,
  },
  profileImage: {
    width: 280,
    height: 280,
    borderRadius: 10,

    borderColor: '#ccc',
    marginBottom: 20,
  },
})

export default Profile
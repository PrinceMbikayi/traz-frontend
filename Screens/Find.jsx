import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image, Pressable, StatusBar, ScrollView } from 'react-native'
import COLORS from '../constants/colors'
import Button from '../components/Button'
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios"
import * as ImagePicker from 'expo-image-picker';

const Find = ({ navigation }) => {

  const [city, setCity] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentNature, setDocumentNature] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [otherDocumentName, setOtherDocumentName] = useState('');
  const [documentOwnerName, setDocumentOwnerName] = useState('');

    // Liste des options pour "Nature de l'objet"
    const documentNameData = [
      { label: 'Clés', value: 'Clés' },
      { label: 'Téléphone portable', value: 'Téléphone portable' },
      { label: 'Portefeuille', value: 'Portefeuille' },
      { label: 'Sac à main', value: 'Sac à main' },
      { label: 'Documents', value: 'Documents' },
      { label: 'Lunettes', value: 'Lunettes' },
      { label: 'Vêtements', value: 'Vêtements' },
      { label: 'Bijoux', value: 'Bijoux' },
      { label: 'Ordinateur portable', value: 'Ordinateur portable' },
      { label: 'Carte bancaire', value: 'Carte bancaire' },
      { label: 'Montre', value: 'Montre' },
      { label: 'Écouteurs', value: 'Écouteurs' },
      { label: 'Parapluie', value: 'Parapluie' },
      { label: 'Appareil photo', value: 'Appareil photo' },
      { label: 'Autre', value: 'Autre' },
    ];

      // Liste des types de documents spécifiques
    const documentNatureData = [
      { label: 'Carte d\'électeur', value: 'Carte d\'électeur' },
      { label: 'Passeport', value: 'Passeport' },
      { label: 'Permis de conduire', value: 'Permis de conduire' },
      { label: 'Attestation de mariage', value: 'Attestation de mariage' },
    ];

  // Fonction pour ouvrir la galerie d'images
  const selectImage = async () => {
    // Demander la permission d'accéder à la galerie
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Ouvrir la galerie
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };
    
    

    const handleSubmit = () => {
      const formData = new FormData();
      const selectedDocumentName = documentName === 'Autre' ? otherDocumentName : documentName;
      const selectedDocumentNature = documentName === 'Documents' ? documentNature : null;
      const selecteddocumentOwnerName = documentName === 'Documents' ? documentOwnerName : documentName;

      formData.append('documentName', selectedDocumentName);
      formData.append('documentNature', selectedDocumentNature);
      formData.append('documentOwnerName', selecteddocumentOwnerName);
      formData.append('fullName', fullName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('city', city);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      }
  
    axios.post('https://traz-backend.vercel.app/api/reports', formData)
      .then(response => {
        Alert.alert("Succès", "Votre commission sera versée par le propriétaire!", [
          { text: "OK", onPress: () => navigation.navigate("TabsAuth") }
        ]);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error.response?.data || error.message);
        Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la soumission.");
      });
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 20, }}>
      <View style={{ flex: 1 }}>
        <View>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          color: COLORS.black,
          marginLeft: 20
        }}>
          Signalez un objet trouver
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
          Informez-nous sur l'objet trouver!
          </Text>
        </View>

        <View style={{
          padding: 16,
          marginBottom: 12,
          height: 50,
          borderColor: COLORS.black,
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 22,
          marginLeft: 22,
          marginRight: 22,
          marginTop: 22,
        }}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={documentNameData}
            labelField="label"
            valueField="value"
            placeholder='Sélectionnez la nature'
            value={documentName}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setDocumentName(item.value);
              setIsFocus(false);
              setShowOtherInput(item.value === 'Autre');
              setShowDocumentInput(item.value === 'Documents');
              setShowNameInput(['Passeport', 'Carte d\'électeur', 'Permis de conduire', 'Attestation de mariage'].includes(item.value));
            }}
          />
        </View>

        {showOtherInput && (
          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              marginLeft: 22,
            }}>Précisez la nature de l'objet</Text>

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
                placeholder='Entrez la nature'
                placeholderTextColor={COLORS.black}
                style={{
                  width: "100%",
                }}
                value={otherDocumentName}
                onChangeText={setOtherDocumentName}
              />
            </View>
          </View>
        )}

      {showDocumentInput && (
                  <View style={{padding: 16,
                    marginBottom: 12,
                    height: 50,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingLeft: 22,
                    marginLeft: 22,
                    marginRight: 22,
                    marginTop: 22,
                  }}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={documentNatureData}
                      labelField="label"
                      valueField="value"
                      placeholder='Sélectionnez la nature du document'
                      value={documentNature}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDocumentNature(item.value);
                        setShowNameInput(true);
                      }}
                    />
            </View>
        )}

      {showNameInput && (
          <View style={{ marginBottom: 12 }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              marginLeft: 22,
            }}>Donnez le nom du document</Text>

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
                placeholder='Entrez la nature'
                placeholderTextColor={COLORS.black}
                style={{
                  width: "100%",
                }}
                value={documentOwnerName}
                onChangeText={setDocumentOwnerName}
              />
            </View>
          </View>
        )}

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Votre Nom et Prénom</Text>

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
              placeholder='Ex: Onyx Ngabo'
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: "100%",
              }}
              value={fullName}
              onChangeText={setFullName}
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
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22,
            marginLeft: 22,
          }}>

            <TextInput 
              placeholder='Entrez votre numéro de Téléphone'
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",

              }}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Ville</Text>

          <View style={{
            width: "90%",
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 22,
            marginLeft: 22,
          }}>

            <TextInput 
              placeholder='Entrez votre numéro de Téléphone'
              placeholderTextColor={COLORS.black}
              style={{
                width: "80%",

              }}
              value={city}
              onChangeText={setCity}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            marginLeft: 22,
          }}>Télécharger une image</Text>

        <View>
          <TouchableOpacity 
            onPress={selectImage}
            style={{
              padding: 16,
              marginBottom: 12,
              //height: 50,
              borderColor: COLORS.black,
              //borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 22,
              marginLeft: 22,
              marginRight: 22,
              width: "50%",
              height: 80,
            }}
          >

            <Image 
              source={imageUri ? { uri: imageUri } : require('../assets/images/photo.png')} 
              style={styles.imagePreview} 
              resizeMode="cover"
            />

          </TouchableOpacity>
        </View>
      
      </View>

        <View style={{
          flexDirection: "row",
          marginVertical: 6,
          marginLeft: 22,
        }}>
          
        </View>

        <Button 
          onPress={handleSubmit}
          title="Signaler"
          filled
          style={{
            marginTop: 30,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />

      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  imagePreview: {
    borderRadius: 8,
    marginLeft: 0,
    width: "130%",
    height: 80,
  }
})

export default Find
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Pressable, Alert, ScrollView } from 'react-native'
import COLORS from '../constants/colors'
import Button from '../components/Button'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


const DetailScreen = ({ navigation, route }) => {

    const { phone: passedPhone } = route.params || {};

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(passedPhone || '');
  const [showPhone, setShowPhone] = useState(false);

  const handlePay = () => {
    setShowPhone(true); // Affiche le numéro de téléphone
    // Vous pouvez également ajouter ici toute logique pour traiter le paiement
    console.log("Payer button clicked");
};

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, paddingTop: 5, }}>
    <View style={{ flex: 1, }}>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <View style={{ marginVertical: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          marginVertical: 12,
          color: COLORS.black,
          marginLeft: 20
        }}>
          Heureux de trouver votre Objet
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
         Vous serez facturé 5000 franc Congolais (Fc)
          </Text>
        </View>

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
              placeholder='Ex: Ngabo'
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

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

          <Text style={{ fontSize: 14 }}>Mode de Paiement</Text>
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
              source={require('../assets/images/airtel.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text>Airtel Money</Text>
          </TouchableOpacity>

          <TouchableOpacity
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
              source={require('../assets/images/mpsa.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text>M-PESA</Text>
          </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity
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
                marginTop: 30,
            }}
          >
            <Image 
              source={require('../assets/images/orange.jpg')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text>Orange Money</Text>
          </TouchableOpacity>
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

        <Button 
          onPress={handlePay}
          title="Payer"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            width: "90%",
            marginLeft: 22,
          }}
        />

            {showPhone && (
                <Text style={{
                    fontSize: 16,
                    color: COLORS.black,
                    marginLeft: 22,
                    marginTop: 12,
                }}>
                    Numéro trouvé : {phone}
                </Text>
)}
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})

export default DetailScreen
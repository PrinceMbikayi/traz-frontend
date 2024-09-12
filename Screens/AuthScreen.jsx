import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";
import COLORS from "../constants/colors";

const AuthScreen = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = async () => {
    if (!isChecked) {
      Alert.alert(
        "Termes et Conditions",
        "Vous devez accepter les termes et conditions pour vous inscrire."
      );
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("emali", email);
    formData.append("phone", phone);
    formData.append("password", password);

    if (image) {
      formData.append("profileImage", {
        uri: image,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        "https://traz-backend.vercel.app/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);

      if (response.status === 200) {
        const { user } = response.data;
        const { token } = user;

        // Alert.alert('Succès', 'Inscription réussie!');
        // console.log('Response data.user:', response.data.user);

        if (token) {
          console.log("Token:", token);
          await AsyncStorage.setItem("userToken", token + 1);
          console.log("Token stored:", token);
        } else {
          console.error("Error: Token is undefined.");
          Alert.alert("Erreur", "Le token est manquant.");
          return;
        }

        if (user) {
          console.log("User:", user);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
          console.error("Error: User data is undefined.");
          Alert.alert(
            "Erreur",
            "Les informations utilisateur sont manquantes."
          );
          return;
        }

        navigation.navigate("confirmUser", { email: email });
      } else {
        Alert.alert(
          "Erreur",
          response.data.message || "Erreur lors de l'inscription."
        );
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur de serveur."
      );
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
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 22 }}>
        <View style={{ flex: 1, marginVertical: 5 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
                marginLeft: 20,
              }}
            >
              Créer un compte
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
                marginLeft: 22,
              }}
            >
              Trouver ton objet aujourd'hui!
            </Text>
          </View>

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image ? { uri: image } : require("../assets/images/user.png")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: 160,
                marginBottom: 10,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                marginLeft: 22,
              }}
            >
              Prénom
            </Text>

            <View
              style={{
                width: "90%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginLeft: 22,
              }}
            >
              <TextInput
                placeholder="Ex: Onyx"
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                marginLeft: 22,
              }}
            >
              Nom
            </Text>

            <View
              style={{
                width: "90%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginLeft: 22,
              }}
            >
              <TextInput
                placeholder="Ex: Ngabo"
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                marginLeft: 22,
              }}
            >
              Addresse Email
            </Text>

            <View
              style={{
                width: "90%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginLeft: 22,
              }}
            >
              <TextInput
                placeholder="Ex: onyxngabo@tranz.com"
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                marginLeft: 22,
              }}
            >
              Téléphone
            </Text>

            <View
              style={{
                width: "90%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginLeft: 22,
              }}
            >
              <TextInput
                placeholder="Ex: 0971922023"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                }}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                marginLeft: 22,
              }}
            >
              Code Pin
            </Text>

            <View
              style={{
                width: "90%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                marginLeft: 22,
              }}
            >
              <TextInput
                placeholder="Ex: 1234"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShow}
                keyboardType="numeric"
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
                {isPasswordShow == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
              marginLeft: 22,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>J'accepte les termes et conditions</Text>
          </View>

          <Button
            onPress={handleRegister}
            title="S'inscrire"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              width: "90%",
              marginLeft: 22,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
                marginLeft: 22,
              }}
            />

            <Text style={{ fontSize: 14 }}>Où s'inscrire avec</Text>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
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
                source={require("../assets/images/facebook.png")}
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
                source={require("../assets/images/google.png")}
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Déjà un compte?
            </Text>
            <Pressable onPress={() => navigation.navigate("login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default AuthScreen;

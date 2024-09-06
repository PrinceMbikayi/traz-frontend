import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, Alert, Image, Pressable, ScrollView } from 'react-native'
import COLORS from '../constants/colors'
import Button from '../components/Button'
import{ Dropdown } from "react-native-element-dropdown"
import axios from "axios"

const Search = ({ navigation }) => {

  const [searchText, setSearchText] = useState(''); // Pour stocker le texte de recherche
  const [results, setResults] = useState([]); // Pour stocker les résultats de la recherche
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [documentNature, setDocumentNature] = useState('');
  const [documentOwnerName, setDocumentOwnerName] = useState('');

      // Liste des options pour "Nature de l'objet"
      const searchData = [
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
    const searchdocumentNatureData = [
      { label: 'Carte d\'électeur', value: 'Carte d\'électeur' },
      { label: 'Passeport', value: 'Passeport' },
      { label: 'Permis de conduire', value: 'Permis de conduire' },
      { label: 'Attestation de mariage', value: 'Attestation de mariage' },
    ];

  // Fonction pour gérer la recherche
  // const handleSearch = async () => {
  //   if (!searchText.trim()) {
  //     Alert.alert('Erreur', 'Veuillez entrer un texte de recherche.');
  //     return;
  //   }

  //   try {
  //     // Supposons que votre endpoint de recherche soit /api/objects/search
  //     const response = await axios.get(`http://localhost:5001/api/reports/search?query=${searchText.trim()}`);
      
  //     if (response.data.length === 0) {
  //       setNoResultsMessage(`Pas de résultat trouvé pour "${searchText.trim()}"`);
  //       setResults([]);
  //     } else {
  //       setNoResultsMessage('');
  //       setResults(response.data);
  //     } 
  //     } catch (error) {
  //       // Vérifiez si le backend retourne un message spécifique "Aucun rapport trouvé"
  //   if (error.response && error.response.data.message === "Aucun rapport trouvé") {
  //     setNoResultsMessage(`Pas de résultat trouvé pour "${searchText.trim()}"`);
  //     setResults([]);
  //   } else {
  //     // Pour toutes les autres erreurs, affichez un message générique
  //     console.error('Erreur lors de la recherche:', error.response ? error.response.data : error.message);
  //     Alert.alert('Erreur', 'Une erreur est survenue lors de la recherche.');
  //   }
  // }
  // };

  const handleSearch = async () => {
    if (showNameInput && !documentOwnerName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer le nom du document.');
      return;
    }
  
    let query = searchText.trim();  // Initialisez la requête avec le texte de recherche général
  
    // Si la nature du document est sélectionnée, ajustez la requête
    if (showNameInput && documentOwnerName.trim()) {
      query = documentOwnerName.trim();  // Utilisez le nom du document pour la recherche
    }
  
    if (!query) {
      Alert.alert('Erreur', 'Veuillez entrer un texte de recherche.');
      return;
    }
  
    try {
      // Supposons que votre endpoint de recherche soit /api/objects/search
      const response = await axios.get(`https://traz-backend.vercel.app/api/reports/search?query=${query}`);
      
      if (response.data.length === 0) {
        setNoResultsMessage(`Pas de résultat trouvé pour "${query}"`);
        setResults([]);
      } else {
        setNoResultsMessage('');
        setResults(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data.message === "Aucun rapport trouvé") {
        setNoResultsMessage(`Pas de résultat trouvé pour "${query}"`);
        setResults([]);
      } else {
        console.error('Erreur lors de la recherche:', error.response ? error.response.data : error.message);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la recherche.');
      }
    }
  };  

    // Fonction pour gérer le clic sur un résultat
    const handleItemPress = (item) => {
      navigation.navigate('DetailScreen', { phone: item.phone }); // Passez les détails de l'objet à l'écran de détails
    };

  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: COLORS.white, height: "100%" }}>
      <View style={{ flex: 1 }}>
        <View style={{  }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          color: COLORS.black,
          marginLeft: 20
        }}>
          Cherchez votre objet
        </Text>

        <Text style={{
          fontSize: 16,
          color: COLORS.black,
          marginLeft: 22,
        }}>
          Cheche ton objet aujourd'hui!
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
            data={searchData}
            labelField="label"
            valueField="value"
            placeholder='Sélectionnez objet'
            value={searchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSearchText(item.value);
              setIsFocus(false);
              setShowOtherInput(item.value === 'Autre');
              setShowDocumentInput(item.value === 'Documents');
              setShowNameInput(false); // Réinitialiser l'affichage du nom
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
                value={searchText}
                onChangeText={setSearchText}
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
                      data={searchdocumentNatureData}
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

        <View style={{
          flexDirection: "row",
          marginVertical: 6,
          marginLeft: 22,
        }}>
          
        </View>

        <Button 
          onPress={handleSearch}
          title="Rechercher"
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
            marginLeft: 22,
            padding: 10,
            marginTop: 20,
            marginRight: 22,
          }}
        >
        {noResultsMessage ? (
            <Text style={styles.noResultsText}>{noResultsMessage}</Text>
          ) : (
          <FlatList
            data={results}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
              <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.resultItem}>
              <Image 
                source={{ uri: item.imageUrl }} // Assurez-vous que `profileImageUrl` est l'URL de l'image dans vos données
                style={styles.resultImage} 
              />
                <Text style={styles.resultText}>Nom de l'objet: {item.documentName}</Text>
                <Text style={styles.resultText}>Nom de la personne: {item.fullName}</Text>
                <Text style={styles.resultText}>Ville: {item.city}</Text>
              </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
        </View>

      </View>
    </View>
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
  resultItem: {
    backgroundColor: '#606060', // Couleur de fond du bloc
    padding: 10,
    borderRadius: 8,
    marginBottom: 10, // Ajout d'un espace entre chaque bloc
  },
  resultText: {
    color: '#000000',
    marginBottom: 4,
  },
  separator: {
    height: 10, // Hauteur de l'espace entre les blocs
    backgroundColor: 'transparent', // Pour un espace vide entre les blocs
  },
  noResultsText: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 20,
  },
  resultImage: {
    width: 320,  
    height: 100, 
    borderRadius: 10,
    marginBottom: 10,
  },
})

export default Search
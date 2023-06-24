import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from "../Comps/Footer";
import { useNavigation } from '@react-navigation/native';

const logo = require("../icons/CaronaRapidaIcon.png");
const iconLogo = require("../icons/localizacao.png");
const Foto = require("../icons/foto.png");

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();
  
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        <Image style={styles.profileImage} source={Foto}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Carona para Luana</Text>
      <Image style={styles.carImage} source={logo} />

      <Text style={styles.locationText}>Localização da Carona</Text>
      <View style={styles.locationContainer}>
        <Image style={styles.locationIcon} source={iconLogo} />
        <Text style={styles.addressText}>Rua Antônio</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={handleCheckboxToggle}>
          <View style={[styles.checkboxInner, isChecked && styles.checkboxChecked]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCheckboxToggle}>
          <Text style={styles.checkboxText}>Utilizar localização atual de Luana</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Informe um ponto de encontro"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PainelCarona')}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  carImage: {
    width: 138,
    height: 138,
    marginBottom: 10,
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 14,
    height: 20,
    marginRight: 10,
  },
  addressText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FF2B2B',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF2B2B',
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: '#FF2B2B',
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#FF2B2B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cancelButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#FF2B2B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;

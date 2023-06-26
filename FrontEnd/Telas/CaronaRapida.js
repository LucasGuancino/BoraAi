import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from "../Comps/Footer";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const logo = require("../icons/CaronaRapidaIcon.png");
const iconLogo = require("../icons/localizacao.png");
const Foto = require("../icons/foto.png");

const App = ({ route  }) => {
  const navigation = useNavigation();
  const { userIdCarona } = route.params;
  const [caronaNome, setCaronaNome] = useState('');
  const [location, setLocation] = useState('');
  const [idUser, setIdUser] = useState('');
  const [caronaId, setCaronaId] = useState('');
  const [solicitanteId, setSolicitanteId] = useState('');

  const getUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        return user;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }; 

  const ConfirmarCarona = () => {
    const carona = {
      userId: idUser,
    };
    const url = `/carona/${caronaId}/confirmar/${solicitanteId}`;
    Axios.post(url, carona)
    .then((response) => {
      alert("A Carona foi aceita! Agora é só combinar com o seu carona e ir para a UTFPR!!");
      navigation.navigate('PainelCarona', { userIdCarona: idUser })
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  };

  const CancelarCarona = () => {
    const url = `/carona/${caronaId}/cancelar`;
    Axios.post(url)
    .then((response) => {
      alert("A carona com este usuário foi cancelada, sua carona voltou a ficar disponivel.");
      navigation.goBack();
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setIdUser(userData.id);
      } else {
        alert("Usuário não encontrado.");
      }
    };
    const fetchCarregarCarona = async() =>{
        try{
            const url = `/carona/pendentes/${userIdCarona}`;
            const response = await Axios.get(url);
            const carona = response.data[0];
            setLocation(carona.end_origem);
            setCaronaId(carona.id);
            setSolicitanteId(carona.solicitanteId);
        }catch (error){
            console.error(error);
        }
    }
    fetchUserData();
    fetchCarregarCarona();
    
  }, [idUser, userIdCarona]);

  useEffect(() =>{
    const fetchCarregarCaroneiro = async() =>{
      try{
          const url = `/user/${solicitanteId}`;
          const response = await Axios.get(url);
          const user = response.data;
          setCaronaNome(user.nome);
      }catch (error){
          console.error(error);
      }
    }
    fetchCarregarCaroneiro();
  }, [solicitanteId])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        <Image style={styles.profileImage} source={Foto}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Carona para {caronaNome}</Text>
      <Image style={styles.carImage} source={logo} />

      <Text style={styles.locationText}>Localização da Carona</Text>
      <View style={styles.locationContainer}>
        <Image style={styles.locationIcon} source={iconLogo} />
        <Text style={styles.addressText}>{location}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={ConfirmarCarona}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={CancelarCarona}>
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

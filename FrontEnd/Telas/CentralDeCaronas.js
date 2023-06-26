import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Footer from '../Comps/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const Foto = require("../icons/foto.png");
const Editar = require("../icons/Edit.png");
const Excluir = require("../icons/Delete.png");

const App = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [idUser, setIdUser] = useState('');
  const [CaronasPendente, setCaronasPendente] = useState([]);
  const [CaronaEmAndamento, setCaronaEmAndamento] = useState([]);
  const [UserData, setUserData] = useState({});

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

  const fetchCaronasPendente = async () => {
    try {
      const url = `/carona/pendentes/${idUser}`;
      const response = await Axios.get(url);
      setCaronasPendente(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCaronasEmAndamento = async () => {
    try {
      const url = `/carona/andamento/${idUser}`;
      const response = await Axios.get(url);
      setCaronaEmAndamento(response.data);
      console.log(CaronaEmAndamento);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await Axios.get(`/user/${userId}`);
      setUserData(prevState => ({
        ...prevState,
        [userId]: response.data,
      }));
    } catch (error) {
      console.error(error);
    }
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

    fetchUserData();
  }, []);

  useEffect(() => {
    if (idUser !== "") {
      fetchCaronasPendente();
    }
  }, [idUser, isFocused]);

  useEffect(() => {
    CaronasPendente.forEach((carona) => {
      fetchUserData(carona.solicitanteId);
    });
  }, [CaronasPendente]);

  useEffect(() => {
    if (idUser !== "") {
      fetchCaronasEmAndamento();
    }
  }, [idUser, isFocused]);

  useEffect(() => {
    CaronaEmAndamento.forEach((carona) => {
      fetchUserData(carona.solicitanteId);
    });
  }, [CaronaEmAndamento]);

  const deleteCarona = async (caronaId) => {
    try {
      const response = await Axios.delete(`/carona/${caronaId}`);
      alert("A Carona foi excluída com sucesso!");

      // Atualizar os dados novamente
      fetchCaronasPendente();
      fetchCaronasEmAndamento();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Solicitações de carona:</Text>
      </View>
      {CaronasPendente.map((carona, index) => {
        const userData = UserData[carona.solicitanteId] || {};
        const { nome } = userData;
        return (
          <View key={index} style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileInfoContainer} onPress={() => navigation.navigate('CaronaRapida', { userIdCarona: carona.userIdCarona })}>
              <Image
                style={styles.profileImage}
                source={Foto}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{nome}</Text>
                <Text style={styles.profileDescription}>{carona.end_origem}, chega às: {carona.hr_chegada}, pagamento: {carona.met_pagamento}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Suas Caronas</Text>
      {CaronaEmAndamento.map((carona, index) => {
        const userData = UserData[carona.solicitanteId] || {};
        const { nome } = userData;
        return (
          <View key={index} style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileInfoContainer} onPress={() => navigation.navigate('PainelCarona', { userIdCarona: carona.userIdCarona })}>
              <Image
                style={styles.profileImage}
                source={Foto}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{nome}</Text>
                <Text style={styles.profileDescription}>Ponto de encontro: {carona.end_origem}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditarCarona', { userIdCarona: carona.userIdCarona })}>
                <Image
                  style={styles.iconImage}
                  source={Editar}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteCarona(carona.id)}>
                <Image
                  style={styles.iconImage}
                  source={Excluir}
                />
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'red',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileDescription: {
    color: 'black',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: 'red',
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});

export default App;

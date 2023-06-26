import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Footer from '../Comps/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const Foto = require("../icons/foto.png");

const App = () => {
  const navigation = useNavigation();
  const [CaronaData, setCaronaData] = useState([]);
  const [CaronaEmAndamento, setCaronaEmAndamento] = useState([]);
  const [UserData, setUserData] = useState({});
  const [idUser, setIdUser] = useState('');

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

  const pedirCarona = (userIdCarona) => {
    if(userIdCarona === idUser){
      alert("Você não pode pedir uma carona para sí mesmo");
    }else{
      navigation.navigate('PedirCarona', { userIdCarona });
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const userData = await getUserData();
        if (userData) {
          setIdUser(userData.id);
        } else {
          alert("Usuário não encontrado.");
        }
      };

      const fetchCaronasAtivas = async () => {
        try {
          const response = await Axios.get("/carona/ativa");
          setCaronaData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
      fetchCaronasAtivas();
    }, [])
  );

  useEffect(() => {
    const fetchCaronasEmAndamento = async () => {
      try {
        const userIdSolicitante = parseInt(idUser);
        const url = `/carona/andamento/solicitante/${userIdSolicitante}`;
        const response = await Axios.get(url);
        setCaronaEmAndamento(response.data);
        console.log(CaronaEmAndamento);
      } catch (error) {
        console.error(error);
      }
    };

    if (idUser !== "") {
      fetchCaronasEmAndamento();
    }
  }, [idUser]);  
  
  useEffect(() => {
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

    CaronaData.forEach((carona) => {
      fetchUserData(carona.userIdCarona);
    });
  }, [CaronaData]);
  
  useEffect(() => {
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
  
    CaronaEmAndamento.forEach((carona) => {
      fetchUserData(carona.userIdCarona);
    });
  }, [CaronaEmAndamento]);

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Caronas Disponíveis</Text>
      </View>
      <View>
        {CaronaData.map((carona, index) => {
          const userData = UserData[carona.userIdCarona] || {};
          const { nome } = userData;

          return (
            <View key={index} style={styles.profileContainer}>
              <TouchableOpacity
                style={styles.profileInfoContainer}
                onPress={() => pedirCarona(carona.userIdCarona)}
              >
                <Image style={styles.profileImage} source={Foto} />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{nome}</Text>
                  <Text style={styles.profileDescription}>{carona.end_origem}, chega às: {carona.hr_chegada}, pagamento: {carona.met_pagamento}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Carona em Andamento</Text>
      {CaronaEmAndamento.map((carona, index) => {
        const userData = UserData[carona.userIdCarona] || {};
        const { nome } = userData;

        return (
          <View key={index} style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileInfoContainer} onPress={() => navigation.navigate('PainelCarona', { userIdCarona: carona.userIdCarona })}>
              <Image style={styles.profileImage} source={Foto} />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{nome}</Text>
                <Text style={styles.profileDescription}>{carona.end_origem}, chega às: {carona.hr_chegada}, pagamento: {carona.met_pagamento}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer} />
          </View>
        );
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
});

export default App;

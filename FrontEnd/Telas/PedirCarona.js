import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Footer from "../Comps/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";
import { useNavigation } from '@react-navigation/native';

const PedirCarona = ({ route  }) => {
  const navigation = useNavigation();
  const { userIdCarona } = route.params;
  const [caronaNome, setCaronaNome] = useState('');
  const [location, setLocation] = useState('');
  const [idUser, setIdUser] = useState('');
  const [caronaId, setCaronaId] = useState('');

  const handleCarona = () => {
    const carona = {
      userId: idUser,
    };
    const url = `/carona/${caronaId}/pegar`;
    Axios.post(url, carona)
    .then((response) => {
      alert("Solicitação de carona feita, assim que o caroneiro aceitar, ela aparecerá na tela de caronas em andamento.");
      navigation.goBack();
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  };


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
            const url = `/carona/ativa/${userIdCarona}`;
            const response = await Axios.get(url);
            const carona = response.data[0];
            setLocation(carona.end_origem);
            setCaronaId(carona.id);
        }catch (error){
            console.error(error);
        }
    }
    const fetchCarregarCaroneiro = async() =>{
        try{
            const url = `/user/${userIdCarona}`;
            const response = await Axios.get(url);
            const user = response.data;
            setCaronaNome(user.nome);
        }catch (error){
            console.error(error);
        }
    }

    fetchUserData();
    fetchCarregarCarona();
    fetchCarregarCaroneiro();
  }, [idUser, userIdCarona]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "80%",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../icons/foto.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
            }}
          />
          <Image
            source={require("../icons/seta-vermelha.png")}
            style={{
              width: 47,
              height: 47,
            }}
          />
        </View>
        <Text style={[styles.title, styles.textShadow]}>
          Carona de {caronaNome}
        </Text>
        <Image
          source={require("../icons/PedirCarona.png")}
          style={{ width: 223, height: 135 }}
        />
        <Text style={[styles.title, styles.textShadow, { width: "80%" }]}>
          Localização da Carona
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <Image
            source={require("../icons/localizacao.png")}
            style={{ width: 14, height: 20 }}
          />
          <Text style={styles.textShadow}> {location}</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={handleCarona}
        >
          <Text style={styles.buttonText}>Pedir Carona</Text>
        </TouchableOpacity>
      </View>
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: "black",
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 35,
    width: 275,
    marginVertical: 40,
    fontSize: 14,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "90%",
    fontSize: 19,
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#FF2B2B",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 35,
    width: 224,
    marginTop: 30,
    marginBottom: 90,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  shadow: {
    shadowColor: "black",
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
});

export default PedirCarona;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Footer from "../Comps/Footer";
import { useNavigation } from '@react-navigation/native';
import Axios from '../Comps/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
  const [nome, setUserName] = useState("");
  const [idUser, setIdUser] = useState('');
  const [caronasPegas, setCaronasPegas] = useState("");
  const [caronasFornecidas, setCaronasFornecidas] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userVeiculo');
      alert("Usuário Deslogado com sucesso.");
      navigation.navigate('Inicial');
    } catch (error) {
      console.error(error);
    }
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
        setUserName(userData.nome);
        setIdUser(userData.id);
      } else {
        alert("Usuário não encontrado.");
      }
    };
  
    const fetchAvaliacaoData = async () => {
      if (idUser) {
        const url = "/avaliacao/media/id";
        const updatedUrl = url.replace("id", idUser);
  
        try {
          const response = await Axios.get(updatedUrl);
          setAvaliacao(response.data.mediaAvaliacoes);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchCaronasData = async () =>{
      if (idUser) {
        const url = "/hist-caronas/user/id";
        const updatedUrl = url.replace("id", idUser);
        try {
          const response = await Axios.get(updatedUrl);
          const data = response.data;
          const primeiraCarona = data[0]; 
          const histcaronasFornecidas = primeiraCarona.caronasFornecidas;
          const histcaronasPegas = primeiraCarona.caronasPegas;
          setCaronasFornecidas(histcaronasFornecidas);
          setCaronasPegas(histcaronasPegas);
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    fetchUserData();
    fetchAvaliacaoData();
    fetchCaronasData();
  }, [idUser]);

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.container}>
        <Text style={[styles.title, styles.textShadow]}>{nome}</Text>
        <View style={{ alignContent: "flex-start" }}>
          <View style={styles.info}>
            <Image
              source={require("../icons/caronasPegas.png")}
              style={{ width: 90, height: 60 }}
            />
            <View>
              <Text style={[styles.infoTitle, styles.textShadow]}>
                Caronas pegas
              </Text>
              <Text style={[styles.infoData, styles.textShadow]}>
                {caronasPegas}
              </Text>
            </View>
          </View>
          <View style={styles.info}>
            <Image
              source={require("../icons/Veiculo.png")}
              style={{
                width: 90,
                height: 90,
              }}
            />
            <View>
              <Text style={[styles.infoTitle, styles.textShadow]}>
                Caronas Fornecidas
              </Text>
              <Text style={[styles.infoData, styles.textShadow]}>
                {caronasFornecidas}
              </Text>
            </View>
          </View>
          <View style={styles.info}>
            <Image
              source={require("../icons/Estrela.png")}
              style={{ width: 64, height: 64, marginRight: 36 }}
            />
            <View>
              <Text style={[styles.infoTitle, styles.textShadow]}>
                Avaliação
              </Text>
              <Text style={[styles.infoData, styles.textShadow]}>
                {avaliacao}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.quit} onPress={handleLogout}>
          <Image
            source={require("../icons/sair.png")}
            style={{ width: 100, height: 45, marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  infoTitle: {
    fontSize: 19,
    color: "#4F4F4F",
  },
  infoData: {
    color: "#FF2B2B",
    fontSize: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    marginTop: 40,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
});

export default Perfil;
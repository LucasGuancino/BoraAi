import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Footer from "../Comps/Footer";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";


const Foto = require("../icons/foto.png");
const logoIcon = require("../icons/Home.png");

const HomeCaroneiro = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [idUser, setIdUser] = useState('');
  const [Avaliacao, setAvaliacao] = useState('');
  const [histCaronas, setHistCaronas] = useState('');

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
  
    const fetchUserVeiculo = async () =>{
      if (idUser){
        const url = "/veiculo/id";
        const updatedUrl = url.replace("id", idUser);
        try{
          const response = await Axios.get(updatedUrl);
          const UserVeiculo  = response.data;
          await AsyncStorage.setItem('userVeiculo', JSON.stringify(UserVeiculo));
        }catch (error){
          console.error(error);
        }
      }
    }

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
          const caronasFornecidas = primeiraCarona.caronasFornecidas;
          setHistCaronas(caronasFornecidas);
        } catch (error) {
          console.error(error);
        }
      }
    }
    
    fetchUserData();
    fetchUserVeiculo();
    fetchAvaliacaoData();
    fetchCaronasData();
  }, [idUser]);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('HomeCarona')}>
          <Image style={styles.avatar} source={Foto} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Ver painel do Carona</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.item1}>Olá {userName}!</Text>
          <Text style={styles.descriptionText}>Vamos levar alguém para a UTFPR hoje?</Text>
        </View>
        <Image source={logoIcon} style={styles.logo} />
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('CriarCarona')}>
          <Text style={styles.buttonText}>Criar Carona</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CentralDeCaronas')}>
          <Text style={styles.buttonText}>Central de Caronas</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={require("../icons/Caronas.png")} style={styles.CaronaIcon} />
          <Text style={styles.caronasText}>Caronas</Text>
          <Text style={styles.countText}>{histCaronas}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("../icons/Estrela.png")} style={styles.EstrelaIcon} />
          <Text style={styles.caronasText}>Avaliação</Text>
          <Text style={styles.countText}>{Avaliacao}</Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start", 
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  content: {
    padding: 20,
    marginBottom: 10,
    width: 370,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  item: {
    marginBottom: 5,
  },
  logo: {
    alignSelf: "center",
    marginVertical: 30,
  },
  item1: {
    textAlign: "center",
    marginBottom: 10,
    width: 230,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    marginTop: 15,
    marginHorizontal: 50,
    backgroundColor: "#FF2B2B",
    padding: 15,
    borderRadius: 40,
    width: 240,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  CaronaIcon: {
    width: 50,
    height: 80,
  },
  EstrelaIcon: {
    width: 50,
    height: 50,
  },
  caronasText: {
    fontSize: 12,
    marginLeft: 10,
  },
  countText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default HomeCaroneiro;

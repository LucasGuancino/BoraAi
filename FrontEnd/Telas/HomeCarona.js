import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Footer from "../Comps/Footer";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const Foto = require("../icons/foto.png");
const logoIcon = require("../icons/HomeCarona.png");

const HomeCarona = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
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
    
    fetchUserData();
  }, [idUser]);

  const IrPaginaCaroneiro = async () => {
      if (idUser) {
        const url = "/veiculo/id";
        const updatedUrl = url.replace("id", idUser);
  
        try {
          const response = await Axios.get(updatedUrl);
          if(response.data){
            navigation.navigate('HomeCaroneiro');
          }else{
            alert("Este usuário não possui veículos cadastrados. Você sera redirecionado para a tela de Cadastro de Veiculo");
            navigation.navigate('CadastrarVeiculo');
          }
        } catch (error) {
          console.error(error);
        }
      }
  }; 
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileButton} onPress={IrPaginaCaroneiro}>
        <Image style={styles.avatar} source={Foto} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Ver painel do caroneiro</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.item}>
            <Text style={styles.item1}>Olá {userName}</Text>
            <Text style={styles.descriptionText}>Em busca de uma carona para a UTFPR?</Text>
          </View>
          <Image source={logoIcon} style={styles.logo} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Procurar')}>
            <Text style={styles.buttonText}>Procurar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  content: {
    marginHorizontal: 10,
    padding: 20,
    marginBottom: 10,
    width: 370,
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    alignSelf: "flex-start",
    marginLeft: 10,
    paddingTop: 30,
    paddingBottom: 10,
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
});

export default HomeCarona;
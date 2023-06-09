import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import Footer from '../Comps/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const Foto = require("../icons/foto.png");
const imgCarona = require("../icons/Carona.png");

const CriarCaronaScreen = ({ navigation }) => {
  const [origem, setOrigem] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [horarioChegada, setHorarioChegada] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
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
        setIdUser(userData.id);
      } else {
        alert("Usuário não encontrado.");
      }
    };
    
    fetchUserData();
  }, [idUser]);

  const confirmarDestino = () => {
    if(origem !== '' && horarioSaida !== '' && horarioChegada !== '' && metodoPagamento !== ''){
      const carona = {
        userIdCarona: idUser,
        end_origem: origem,
        hr_saida: horarioSaida,
        hr_chegada: horarioChegada,
        met_pagamento: metodoPagamento,
        ST_carona: "Ativa",
      };
    
      Axios.post("/Carona", carona)
        .then((response) => {
          alert("Carona criada com sucesso!");
          navigation.goBack();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
        setOrigem('');
        setHorarioSaida('');
        setHorarioChegada('');
        setMetodoPagamento('');
    }else {
      alert("Preencha todos os dados!");
    };

  };  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('HomeCarona')}>
        <Image style={styles.avatar} source={Foto} />
      </TouchableOpacity>

      <Text style={styles.infoText}>Informe os dados da carona:</Text>
      <View style={styles.logoContainer}>
        <Image source={imgCarona} style={styles.logo} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Sua Origem"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário de Saída"
        value={horarioSaida}
        onChangeText={setHorarioSaida}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário de Chegada"
        value={horarioChegada}
        onChangeText={setHorarioChegada}
      />

      <TextInput
        style={styles.input}
        placeholder="Método de Pagamento"
        value={metodoPagamento}
        onChangeText={setMetodoPagamento}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={confirmarDestino}>
        <Text style={styles.confirmButtonText}>Confirmar Destino</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    height: 55,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  confirmButton: {
    width: '90%',
    height: 55,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 231,
    height: 139,
  },
});

export default CriarCaronaScreen;

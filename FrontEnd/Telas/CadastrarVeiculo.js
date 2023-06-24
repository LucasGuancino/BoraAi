import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

const logo = require("../icons/Veiculo.png");

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [placa, setPlaca] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idUser, setIdUser] = useState('');
  const navigation = useNavigation();  

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

  const handleCadastro = () => {
    if (nome !== '' && placa !== '' && descricao !== '') {
      const veiculo = {
        userId: idUser,
        nomeDoVeiculo: nome,
        placa: placa,
        DescVeiculo: descricao,
      };

      Axios.post("/veiculo", veiculo)
        .then((response) => {
          alert("Veiculo cadastrado com sucesso!");
          navigation.navigate('PainelCaroneiro')
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      setNome('');
      setPlaca('');
      setDescricao('');
    } else {
      alert("Preencha todos os dados!");
    };

  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.title}>Cadastro de Veículos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Veiculo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa do Veículo"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 164,
    height: 189,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 55,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CadastroScreen;

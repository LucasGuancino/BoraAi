import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet, View, Linking } from 'react-native';
import carro from '../icons/carro.png';
import localizacao from '../icons/icon-localizacao.png';
import pagamento from '../icons/icon-pagamento.png';
import horario from '../icons/icon-horario.png';
import perfil from '../icons/foto.png';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

export default function PainelCarona({ route  }) {
  const navigation = useNavigation();
  const { userIdCarona } = route.params;
  const [origem, setOrigem] = useState('');
  const [horarioSaida, setHorarioSaida] = useState('');
  const [horarioChegada, setHorarioChegada] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [idUser, setIdUser] = useState('');
  const [solicitanteId, setSolicitanteId] = useState('');
  const [CaronaNome, setCaronaNome] = useState('');
  const [idCarona, setIdCarona] = useState('');
  const [CaroneiroNome, setCaroneiroNome] = useState('');
  const [nomeVeiculo, setNomeVeiculo] = useState('');
  const [placa, setPlaca] = useState('');
  const [descVeiculo, setDescVeiculo] = useState('');
  const [telefoneCarona, setTelefoneCarona] = useState('');
  const [telefoneCaroneiro, setTelefoneCaroneiro] = useState('');

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

  const EntrarEmContato = () => {
    let url;
    if(idCarona === idUser){
      url = `https://wa.me/55${telefoneCaroneiro}`;
    }else{
      url = `https://wa.me/55${telefoneCarona}`;
    }
    Linking.openURL(url);
  };

  const AvaliarCaroneiro = () =>{
    if(idCarona === idUser){
      navigation.navigate('Avaliacao', { userIdCarona: userIdCarona })
    }else{
      alert("Somente o carona pode finalizar.")
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
            const url = `/carona/andamento/${userIdCarona}`;
            const response = await Axios.get(url);
            const carona = response.data[0];
            setOrigem(carona.end_origem);
            setHorarioSaida(carona.hr_saida);
            setHorarioChegada(carona.hr_chegada);
            setMetodoPagamento(carona.met_pagamento);
            setSolicitanteId(carona.solicitanteId);
        }catch (error){
            console.error(error);
        }
    }
    const fetchCarregarInfoCarona = async() =>{
      try{
        const url = `/user/${userIdCarona}`;
        const response = await Axios.get(url);
        const user = response.data;
        setCaroneiroNome(user.nome);
        setTelefoneCaroneiro(user.telefone);
      }catch (error){
        console.error(error);
      }
    }
    const fetchCarregarInfoVeiculo = async() =>{
      try{
        const url = `/veiculo/${userIdCarona}`;
        const response = await Axios.get(url);
        const veiculo = response.data;
        setNomeVeiculo(veiculo.nomeDoVeiculo);
        setPlaca(veiculo.placa);
        setDescVeiculo(veiculo.DescVeiculo);
      }catch (error){
        console.error(error);
      }
    }
    fetchUserData();
    fetchCarregarCarona();
    fetchCarregarInfoCarona();
    fetchCarregarInfoVeiculo();
  }, [idUser, userIdCarona]);

  useEffect(() =>{
    const fetchCarregarCaroneiro = async() =>{
      try{
          const url = `/user/${solicitanteId}`;
          const response = await Axios.get(url);
          const user = response.data;
          setCaronaNome(user.nome);
          setIdCarona(user.id);
          setTelefoneCarona(user.telefone);
      }catch (error){
          console.error(error);
      }
    }
    fetchCarregarCaroneiro();
  }, [solicitanteId])

  return (
    <View style={estilos.container}>
      <View style={estilos.perfilContainer}>
        <Image source={perfil} style={estilos.perfil} />
      </View>

      <Text style={estilos.tituloCarona}>
        {idCarona === idUser ? `Carona com ${CaroneiroNome}` : `Carona com ${CaronaNome}`}
      </Text>

      <Text style={estilos.subtitulo}>Informações da Carona:</Text>

      <View style={estilos.infoContainer}>
        <View style={estilos.itemContainer}>
          <View style={estilos.iconeContainer}>
            <Image source={carro} style={estilos.icone} />
          </View>
          <View style={estilos.descricaoContainer}>
            <Text style={estilos.titulo}>Carro</Text>
            <Text style={estilos.descricao}>
              {nomeVeiculo} - {placa} {'\n'}{descVeiculo}
            </Text>
          </View>
        </View>

        <View style={estilos.itemContainer}>
          <View style={estilos.iconeContainer}>
            <Image source={localizacao} style={estilos.icone} />
          </View>
          <View style={estilos.descricaoContainer}>
            <Text style={estilos.titulo}>Ponto de saída</Text>
            <Text style={estilos.descricao}>
              {origem}
            </Text>
          </View>
        </View>

        <View style={estilos.itemContainer}>
          <View style={estilos.iconeContainer}>
            <Image source={horario} style={estilos.icone} />
          </View>
          <View style={estilos.descricaoContainer}>
            <Text style={estilos.titulo}>Horário</Text>
            <Text style={estilos.descricao}>{horarioSaida} - {horarioChegada}</Text>
          </View>
        </View>

        <View style={estilos.itemContainer}>
          <View style={estilos.iconeContainer}>
            <Image source={pagamento} style={estilos.icone} />
          </View>
          <View style={estilos.descricaoContainer}>
            <Text style={estilos.titulo}>Pagamento</Text>
            <Text style={estilos.descricao}>{metodoPagamento}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={estilos.botao}
        onPress={EntrarEmContato}
      >
        <Text style={estilos.botaoTexto}>Entrar em contato</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botao}
        onPress={AvaliarCaroneiro}
      >
        <Text style={estilos.botaoTexto}>Encerrar carona</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilContainer: {
    position: 'absolute',
    top: 30, // Altere o valor aqui para ajustar a posição vertical
    left: 20,
  },
  perfil: {
    width: 50,
    height: 50,
  },
  tituloCarona: {
    marginTop: 80,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  iconeContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icone: {
    width: 60,
    height: 60,
  },
  descricaoContainer: {
    marginLeft: 10,
  },
  titulo: {
    color: '#4F4F4F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descricao: {
    color: '#FF2B2B',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botao: {
    width: '70%',
    height: 40,
    backgroundColor: '#FF2B2B',
    padding: 10,
    borderRadius: 100,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import robo from '../icons/robo.png';
import perfil from '../icons/foto.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../Comps/Axios";

export default function Avaliacao({ route  }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const navigation = useNavigation();
  const { userIdCarona } = route.params;
  const [caronaId, setCaronaId] = useState('');
  const [solicitanteId, setSolicitanteId] = useState('');
  const [idUser, setIdUser] = useState('');

  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
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

  const FinalizarCarona = () => {
    let avaliacao;
    if(idUser === solicitanteId){
      avaliacao = {
        userId: userIdCarona,
        ST_avaliacao: selectedRating,
      };  
    }else{
      avaliacao = {
        userId: solicitanteId,
        ST_avaliacao: selectedRating,
      };  
    }
    Axios.post("/avaliacao", avaliacao);
    const url = `/carona/${caronaId}/inativa/${solicitanteId}`;
    Axios.put(url)
    .then((response) => {
      alert("Carona Finalizada! Obrigado por usar o BoraAi!!");
      navigation.navigate('HomeCarona')
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
            const url = `/carona/andamento/${userIdCarona}`;
            const response = await Axios.get(url);
            const carona = response.data[0];
            setCaronaId(carona.id);
            setSolicitanteId(carona.solicitanteId);
        }catch (error){
            console.error(error);
        }
    }
    fetchUserData();
    fetchCarregarCarona();
    
  }, [idUser, userIdCarona]);

  return (
    <View style={estilos.container}>
      <View style={estilos.content}>
        <Text style={estilos.texto}>Uhuuul, parece que a carona foi um sucesso!!</Text>

        <Image source={robo} style={estilos.robo} />
        <Text style={estilos.texto}>Que tal deixar sua avaliação?</Text>

        <View style={estilos.estrelinha}>
          <TouchableOpacity
            style={[estilos.starIcon, selectedRating >= 1 && estilos.activeStar]}
            onPress={() => handleRatingPress(1)}
          >
            <Icon name={selectedRating >= 1 ? 'star' : 'star-o'} size={40} color="#FF2B2B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.starIcon, selectedRating >= 2 && estilos.activeStar]}
            onPress={() => handleRatingPress(2)}
          >
            <Icon name={selectedRating >= 2 ? 'star' : 'star-o'} size={40} color="#FF2B2B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.starIcon, selectedRating >= 3 && estilos.activeStar]}
            onPress={() => handleRatingPress(3)}
          >
            <Icon name={selectedRating >= 3 ? 'star' : 'star-o'} size={40} color="#FF2B2B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.starIcon, selectedRating >= 4 && estilos.activeStar]}
            onPress={() => handleRatingPress(4)}
          >
            <Icon name={selectedRating >= 4 ? 'star' : 'star-o'} size={40} color="#FF2B2B" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.starIcon, selectedRating >= 5 && estilos.activeStar]}
            onPress={() => handleRatingPress(5)}
          >
            <Icon name={selectedRating >= 5 ? 'star' : 'star-o'} size={40} color="#FF2B2B" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilos.botao} onPress={FinalizarCarona}>
          <Text style={estilos.botaoTexto}>Encerrar Carona</Text>
        </TouchableOpacity>
      </View>

      <Image source={perfil} style={estilos.perfil} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  estrelinha: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  starIcon: {
    marginHorizontal: 'auto',
    fontSize: 40,
  },
  activeStar: {
  },
  perfil: {
    position: 'absolute',
    top: 16,
    left: 25,
    width: 50,
    height: 50,
  },
  texto: {
    marginVertical: 25,
    marginHorizontal: 20,
    width: 300,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  robo: {
    width: 120,
    height: 86,
  },
  botao: {
    width: 210,
    height: 40,
    backgroundColor: '#FF2B2B',
    padding: 10,
    borderRadius: 100,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
  },
});

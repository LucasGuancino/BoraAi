import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import robo from '../icons/robo.png';
import perfil from '../icons/foto.png';
import seta from '../icons/seta-vermelha.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function Avaliacao() {
  const [selectedRating, setSelectedRating] = useState(0);
  const navigation = useNavigation();

  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
    console.log(rating);
  };

  return (
    <View>
      <Image source={perfil} style={estilos.perfil} />
      <Image source={seta} style={estilos.seta} />
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

      <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('HomeCaroneiro')}>
        <Text style={estilos.botaoTexto}>Encerrar Carona</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  estrelinha: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  starIcon: {
    marginHorizontal: 'auto',
    borderWidth: 1,
    borderColor: '#fff',
    color: '#FF2B2B',
    fontSize: 40,
  },
  activeStar: {
    backgroundColor: '#FF2B2B',
  },

  perfil: {
    marginVertical: 16,
    marginHorizontal: 25,
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
  seta: {
    width: 40,
    height: 40,
    marginTop: -60,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  robo: {
    width: 120,
    height: 86,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: 210,
    height: 32,
    backgroundColor: '#FF2B2B',
    padding: 10,
    borderRadius: 100,
    marginBottom: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
  },
});

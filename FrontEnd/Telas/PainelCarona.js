import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import carro from '../icons/Veiculo.png';
import localizacao from '../icons/icon-localizacao.png';
import pagamento from '../icons/icon-pagamento.png';
import horario from '../icons/icon-horario.png';
import perfil from '../icons/Perfil.png';
import seta from '../icons/seta-vermelha.png';
import { useNavigation } from '@react-navigation/native';

export default function PainelCarona() {
  const navigation = useNavigation();
  return (
    <View>
      <Image source={perfil} style={estilos.perfil} />
      <Text style={estilos.texto}>
        Carona com Gabriella Marreto {'\n'}Informações da Carona:
      </Text>

      <Image source={seta} style={estilos.seta} />

      <Image source={carro} style={estilos.carro} />
      <Text style={[estilos.titulo, estilos.tituloCarro]}>Carro</Text>
      <Text style={[estilos.descricao, estilos.descricaoCarro]}>
        carro - ano {'\n'}cor - placa
      </Text>

      <Text style={[estilos.titulo, estilos.tituloLocalizacao]}>
        Ponto de saída
      </Text>
      <Image source={localizacao} style={[estilos.localizacao, estilos.icone]} />
      <Text style={[estilos.descricao, estilos.descricaoLocalizacao]}>
        Descrição do endereço de saída
      </Text>

      <Text style={[estilos.titulo, estilos.tituloHorario]}>Horário</Text>
      <Image source={horario} style={[estilos.horario, estilos.icone]} />
      <Text style={[estilos.descricao, estilos.descricaoHorario]}>
        H. saida - H. chegada
      </Text>

      <Text style={[estilos.titulo, estilos.tituloPagamento]}>Pagamento</Text>
      <Image source={pagamento} style={[estilos.pagamento, estilos.icone]} />
      <Text style={[estilos.descricao, estilos.descricaoPagamento]}>
        Tipo de pagamento
      </Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => console.log('Botão pressionado')}
      >
        <Text style={estilos.botaoTexto}>Entrar em contato</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('Avaliacao')}
      >
        <Text style={estilos.botaoTexto}>Encerrar carona</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  perfil: {
    marginVertical: 16,
    marginHorizontal: 25,
    width: 50,
    height: 50,
  },
  texto: {
    marginVertical: -70,
    marginHorizontal: 92,
    width: '100%',
    fontSize: 13,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  seta: {
    width: 40,
    height: 40,
    marginTop: 20,
    right: 2,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  icone: {
    left: 4,
    width: 45,
    height: 45,
    marginLeft: 20,
    marginBottom: 20,
  },
  carro: {
    marginTop: 45,
    width: 120,
    height: 40,
    marginBottom: 14,
    marginLeft: 20,
  },
  titulo: {
    color: '#4F4F4F',
    position: 'absolute',
    width: '100%',
    height: 27,
    left: 152,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#FF2B2B',
    position: 'absolute',
    width: 160,
    height: 27,
    left: 152,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tituloCarro: {
    marginTop: 92,
  },
  tituloLocalizacao: {
    marginTop: 150,
  },
  tituloHorario: {
    marginTop: 218,
  },
  tituloPagamento: {
    marginTop: 281,
  },
  descricaoCarro: {
    marginTop: 110,
  },
  descricaoLocalizacao: {
    marginTop: 168,
  },
  descricaoHorario: {
    marginTop: 235,
  },
  descricaoPagamento: {
    marginTop: 300,
  },
  botao: {
    width: '70%',
    height: 32,
    backgroundColor: '#FF2B2B',
    padding: 10,
    borderRadius: 100,
    marginBottom: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
  },
});

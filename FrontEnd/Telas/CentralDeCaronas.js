import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../Comps/Footer';

const Foto = require("../icons/foto.png");
const Editar = require("../icons/Edit.png");
const Excluir = require("../icons/Delete.png");

const App = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Solicitações de carona:</Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileInfoContainer} onPress={() => navigation.navigate('CaronaRapida')}>
          <Image
            style={styles.profileImage}
            source={Foto}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nome do Usuário 1</Text>
            <Text style={styles.profileDescription}>Descrição do Usuário 1</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Suas Caronas</Text>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileInfoContainer} onPress={() => navigation.navigate('PainelCarona')}>
          <Image
            style={styles.profileImage}
            source={Foto}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nome do Usuário 2</Text>
            <Text style={styles.profileDescription}>Descrição do Usuário 2</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CriarCarona')}>
            <Image
              style={styles.iconImage}
              source={Editar}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.iconImage}
              source={Excluir}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'red',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileDescription: {
    color: 'black',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: 'red',
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});

export default App;

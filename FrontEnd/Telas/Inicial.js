import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const logoIcon = require("../icons/logo.png");

const Inicial = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={logoIcon} style={styles.logo} />
      <Text style={styles.title}>BoraAi</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastrar')}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Todos os direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    width: 225,
    height: 224,
    marginBottom: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#FF2B2B",
    marginBottom: 20
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#FF2B2B",
    padding: 10,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontSize: 18
  },
  footer: {
    color: "black",
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "bold"
  }
});

  
export default Inicial;
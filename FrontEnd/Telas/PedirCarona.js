import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Footer from "../Comps/Footer";
import Checkbox from "expo-checkbox";

const PedirCarona = () => {
  const [caronaNome, setCaronaNome] = useState("Mara da Silva");
  const [distance, setDistance] = useState("2");
  const [curentLocation, setCurentLocation] = useState(false);
  const [meetLocation, setCurentMeetLocation] = useState("");
  const [userName, setCurentUserName] = useState("Luana");
  const [location, setLocation] = useState(
    "Av Mundial do Palmeiras , Zona Sul"
  );

  const handleCarona = () => {
    console.log("pedir carona");
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "80%",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../icons/foto.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
            }}
          />
          <Image
            source={require("../icons/seta-vermelha.png")}
            style={{
              width: 47,
              height: 47,
            }}
          />
        </View>
        <Text style={[styles.title, styles.textShadow]}>
          Carona de {caronaNome}
        </Text>
        <Image
          source={require("../icons/PedirCarona.png")}
          style={{ width: 223, height: 135 }}
        />
        <Text style={[styles.title, styles.textShadow, { width: "80%" }]}>
          Localização da Carona
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <Image
            source={require("../icons/localizacao.png")}
            style={{ width: 14, height: 20 }}
          />
          <Text style={styles.textShadow}>{location}</Text>
        </View>
        <Text
          style={[
            styles.textShadow,
            { fontSize: 10, color: "#FF2B2B", marginTop: 5 },
          ]}
        >
          Está a {distance}Km de você
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
          }}
        >
          <Checkbox
            style={{ marginTop: 10 }}
            value={curentLocation}
            onValueChange={setCurentLocation}
          />
          <Text style={[styles.textShadow, { marginTop: 10 }]}>
            Usar localização atual de {userName}
          </Text>
        </View>

        <TextInput
          style={[styles.input, styles.shadow]}
          placeholder="Informar um ponto de encontro"
          value={meetLocation}
          onChangeText={(v) => setMeetLocation(v)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={handleCarona}
        >
          <Text style={styles.buttonText}>Pedir Carona</Text>
        </TouchableOpacity>
      </View>
      <Footer></Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: "black",
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 35,
    width: 275,
    marginVertical: 40,
    fontSize: 14,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "90%",
    fontSize: 19,
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#FF2B2B",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 35,
    width: 224,
    marginTop: 30,
    marginBottom: 90,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  shadow: {
    shadowColor: "black",
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
});

export default PedirCarona;
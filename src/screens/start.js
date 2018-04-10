import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Start extends Component {

  start() {
    Actions.list()
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/bg.png')} style={styles.backgroundImage}>

          <View flex={5} style={styles.centralizar}>
            <Image source={require("../images/logo.png")} resizeMode={'contain'} style={styles.logo} />
          </View>

          <View flex={6} style={styles.centralizar}>
            <View style={[styles.boxBotao]}>
              <TouchableOpacity style={[styles.botao]} onPress={() => this.start()}>
                <Text style={[styles.textoBotao]}>
                  INICIAR
                    </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height
  },
  logo: {
    marginTop: 100,
    width: width / (3 / 2),
    height: height / (3 / 2)
  },
  boxBotao: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#3480a6',
    height: 50,
    width: 300,
    borderRadius: 6,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  centralizar: {
    justifyContent: "center",
    alignItems: "center"
  }
});

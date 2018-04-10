import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Alert, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import axios from 'axios';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import AppConfig from '../config'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Card extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            card: []
        }
    }

    componentDidMount(){
        var self = this;
        this.setState({itemId: this.props.itemId});
        self.setState({ loading: true }, () => {
            axios.get(AppConfig.host+'/'+this.props.itemId)
            .then(function (response) {
                self.setState({ card: response.data.card, 
                                loading: false });
                console.log("this.state.card.length >>", self.state.card);
                
            })
            .catch(function (error) {
                self.setState({loading: false});
                Alert.alert("Ops", AppConfig.geralErro)
            });
        })
    }

    render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={require('../images/bg.png')} style={styles.backgroundImage}>
          <Spinner visible={this.state.loading} animation='slide' textContent={"Carregando..."} textStyle={{ color: '#FFF' }} />
          <View style={styles.item}>
            <Image source={{uri: this.state.card.imageUrl}} resizeMode={'contain'} style={{width:width/2, height:height/2 }} />
            {this.state.card.imageUrl ?    
            <ScrollView>   
                <Text style={styles.txtDetails}> NOME: {this.state.card.name} </Text>
                <Text style={styles.txtDetails}> CUSTO DE MANA: {this.state.card.manaCost} </Text>
                <Text style={styles.txtDetails}> CORES: {this.state.card.colors} </Text>
                <Text style={styles.txtDetails}> TIPO: {this.state.card.type} </Text>
                <Text style={styles.txtDetails}> DESCRIÇÃO: {this.state.card.text} </Text>
                { this.state.card.loyalty ?
                <Text style={styles.txtDetails}> LEALDADE: {this.state.card.loyalty} </Text> 
                : null }
            </ScrollView>
            :
            null    
            }
                
            
          </View>
            <View style={[styles.boxBotao]}>
                <TouchableOpacity style={[styles.botao]} onPress={() => Actions.pop()}>
                    <Text style={[styles.textoBotao]}>
                        Voltar para listagem
                    </Text>
                </TouchableOpacity>
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
    txtDetails:{
        fontSize: 14,
        color: 'black',
    },
    boxBotao: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        justifyContent: "center", 
        alignItems: "center"
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
      item:{
        backgroundColor: '#FFF',
        borderWidth: 0.8,
        borderColor: '#999',
        height: height-180,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10, 
        alignItems: 'center',
        justifyContent: 'center'
    }
    
});

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ImageBackground, Dimensions, Button, ScrollView, ListView, Alert, ActivityIndicator } from "react-native";
import {Actions, Scene, Router} from 'react-native-router-flux';
import axios from 'axios';
import AppConfig from '../config';
import Spinner from 'react-native-loading-spinner-overlay';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, 
            cards: []
        };
        this.choice = this.choice.bind(this);
    }

    componentDidMount() {
        var self = this;
        self.setState({ loading: true }, () => {
            axios.get(AppConfig.host)
                .then(function (response) {
                    self.setState({ cards: response.data.cards, 
                                    loading: false });
                })
                .catch(function (error) {
                    self.setState({loading: false});
                    Alert.alert("Ops", AppConfig.geralErro);
                })
        })
    }

    choice(item){
        Actions.card({itemId: item.id});
    }

    _renderCars = () => {
        var topics = [];
        this.state.cards.map(function(item, i){
            topics.push(
                <View key={item.id} style={styles.item}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Image source={{uri: item.imageUrl}} resizeMode={'contain'} style={{width:width/2, height:height/2}} />
                        </View>
                        
                        <View style={styles.detailsCard}>
                            <Text style={styles.txtTitle}>{item.name}</Text>
                            <Text>Tipo: {item.type}</Text>
                            <Text>Cor:{item.colors}</Text>
                            <Text style={styles.contador}>1/75</Text>
                        </View>
                    </View>
                    <View style={[styles.boxBotao]}>
                        <TouchableOpacity style={[styles.botao]} onPress={() => this.choice(item)}>
                            <Text style={[styles.textoBotao]}>
                                Escolho essa carta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


            )
        }, this);
        return topics;
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/bg.png')} style={styles.backgroundImage}>
                    
                    <Spinner visible={this.state.loading} textContent={"Carregando..."} textStyle={{ color: '#FFF' }} />

                    <Text style={styles.contadorTopo}> Total de cartas: 75/100 </Text>
                    <ScrollView>
                        {this._renderCars()}
                    </ScrollView>

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
    boxBotao: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
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
    box: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    },
    item:{
        backgroundColor: '#FFF',
        borderWidth: 0.8,
        borderColor: '#999',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsCard: {
        paddingTop: 40,
        marginLeft:10,
        flex:1
    },
    txtTitle:{
        color: '#4682B4',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },
    contador:{
        textAlign: 'center',
        color: '#4682B4',
        fontSize: 24,
        fontWeight: 'bold', 
        marginTop: 20
    },
    contadorTopo: {
        marginTop: 10, 
        marginBottom: 10,
        textAlign:'center', 
        fontWeight: 'bold'
    }
});

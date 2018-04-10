import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions, ScrollView, Alert } from "react-native";
import { Actions, Scene, Router } from 'react-native-router-flux';
import axios from 'axios';
import AppConfig from '../config';
import Spinner from 'react-native-loading-spinner-overlay';
import cor from "../constants/colors";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cards: [],
            cardsLength: '',
            nCards: 0
        };
        this.choice = this.choice.bind(this);
    }

    componentDidMount() {
        var self = this;
        self.setState({ loading: true }, () => {
            axios.get(AppConfig.host)
                .then(function (response) {
                    self.embaralhar(response.data.cards);
                })
                .catch(function (error) {
                    self.setState({ loading: false });
                    Alert.alert("Ops", AppConfig.geralErro);
                })
        })
    }

    embaralhar(array) {
        var self = this;
        var indice_atual = array.length, valor_temporario, indice_aleatorio;
        while (0 !== indice_atual) {
            indice_aleatorio = Math.floor(Math.random() * indice_atual);
            indice_atual -= 1;

            valor_temporario = array[indice_atual];
            array[indice_atual] = array[indice_aleatorio];
            array[indice_aleatorio] = valor_temporario;
        }
        self.setState({
            cards: array,
            cardsLength: array.length,
            loading: false
        });
    }

    choice(item) {
        Actions.card({ itemId: item.id });
    }

    _renderCards() {
        var topics = [];
        var cardsSlice = this.state.cards.slice(0, 75);
        cardsSlice.map(function (item, i) {
            topics.push(
                <View key={item.id} style={styles.item}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={{ uri: item.imageUrl }} resizeMode={'contain'} style={{ width: width / 2, height: height / 2 }} />
                        </View>
                        <View style={styles.detailsCard}>
                            <Text style={styles.txtTitle}>{item.name}</Text>
                            <Text>Tipo: {item.type}</Text>
                            <Text>Cor: {item.colors}</Text>
                            <Text style={styles.contador}> {i + 1} de 75</Text>
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

                    <Spinner visible={this.state.loading} animation='slide' textContent={"Aguarde, estamos embaralhando suas cartas..."} textStyle={{ color: '#FFF', textAlign: 'center' }} />
                    {this.state.cardsLength > 0 ?
                        <Text style={styles.contadorTopo}> Total de cartas: 75/{this.state.cardsLength} </Text>
                    : null}
                    <ScrollView>
                        {this._renderCards()}
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
        backgroundColor: cor.azulEscuro,
        height: 50,
        width: 300,
        borderRadius: 6,
        marginBottom: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textoBotao: {
        color: cor.branco,
        fontSize: 16,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: cor.branco,
        borderWidth: 0.8,
        borderColor: cor.cinza,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsCard: {
        paddingTop: 40,
        marginLeft: 10,
        flex: 1
    },
    txtTitle: {
        color: cor.azulClaro,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6
    },
    contador: {
        textAlign: 'center',
        color: cor.a,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20
    },
    contadorTopo: {
        color: cor.azulEscuro,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

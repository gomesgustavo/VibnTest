import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Button} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Catalogo extends Component {
    constructor(){
        super();
        this.state = {
         
        }
    }

  render() {
    return (
       <Text>Componente</Text>
    );
  }
}

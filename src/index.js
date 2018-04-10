import React, { Component } from 'react';
import {  StyleSheet,  Alert,  BackHandler,  InteractionManager,  StatusBar,  View,  TouchableOpacity} from 'react-native';
import {  Route,  Router,  Reducer,  Actions,  Scene,  ActionConst} from 'react-native-router-flux';
import cor from "./constants/colors";

//rotas
import Start from "./screens/start";
import List from "./screens/list";
import Card from "./screens/card";

export default class Index extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar backgroundColor={cor.azulClaro} barStyle="light-content" />
        <Router createReducer={reducerCreate}  getRouteStyle={getRouteStyle} navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} >
          <Scene key="root">
            <Scene key="tabbar" initial={true}> 
               <Scene key="start" initial component={Start} hideNavBar={true} />            
            </Scene>
            <Scene key="list" component={List} hideNavBar={false} title="Selecione uma carta" />
            <Scene key="card" component={Card} hideNavBar={false} title="Carta escolhida" />
          </Scene>
        </Router>
      </View>
    )
  }
}

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

const getRouteStyle = (props, computedProps) => {
  const style = {
    flex:             1,
    backgroundColor: cor.branco,
    shadowColor:      null,
    shadowOffset:     null,
    shadowOpacity:    null,
    shadowRadius:     null,
    textAlign: 'center',
    alignSelf:'center'
  };
  return style;
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: cor.azulEscuro,
    borderBottomWidth: 0,
    elevation: 2
  },
  navTitle: {
    color: cor.branco,
    fontWeight: '600',
    fontSize: 18
  }
})

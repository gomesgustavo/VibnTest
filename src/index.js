import React, { Component } from 'react';
import {  StyleSheet,  Alert,  BackHandler,  InteractionManager,  StatusBar,  View,  TouchableOpacity} from 'react-native';
import {  Route,  Router,  Reducer,  Actions,  Scene,  ActionConst} from 'react-native-router-flux';

//rotas
import Start from "./screens/start";
import List from "./screens/list";
import Card from "./screens/card";

export default class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />
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
    backgroundColor: 'white',
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
    backgroundColor: '#3480a6',
    borderBottomWidth: 0,
    elevation: 2
  },
  navTitle: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18
  }
})

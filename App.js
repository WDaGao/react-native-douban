/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';
import Home from './components/tabBar/Home.js'
import User from './components/tabBar/User.js'
import Cart from './components/tabBar/Cart.js'
import Search from './components/tabBar/Search.js'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: "home"
    }
  }

  componentDidMount(){
    
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="主页"
            renderIcon={() => <Icon name="home" size={25} color="gray"/>}
            renderSelectedIcon={() => <Icon name="home" size={25} color="#0079ff"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title="搜索"
            accessibilityLabel="sousuo"
            renderIcon={() => <Icon name="search" size={25} color="gray"/>}
            renderSelectedIcon={() => <Icon name="search" size={25} color="#0079ff"/>}
            onPress={() => this.setState({ selectedTab: 'search' })}>
            <Search></Search>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'cart'}
            title="购物车"
            renderIcon={() => <Icon name="shopping-cart" size={25} color="gray"/>}
            renderSelectedIcon={() => <Icon name="shopping-cart" size={25} color="#0079ff"/>}
            badgeText="0"
            onPress={() => this.setState({ selectedTab: 'cart' })}>
            <Cart></Cart>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'user'}
            title="我的"
            renderIcon={() => <Icon name="user" size={25} color="gray"/>}
            renderSelectedIcon={() => <Icon name="user-o" size={25} color="#0079ff"/>}
            onPress={() => this.setState({ selectedTab: 'user' })}>
            <User></User>
          </TabNavigator.Item>
        </TabNavigator>
        <Cart></Cart>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

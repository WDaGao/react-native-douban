import React, { Component } from "react";
import { Modal, Text,Image, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
export default class Cart extends Component {
  state = {
    modalVisible: false,
    num:1
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount(){
    this.setModalVisible(true);
  }
  xiayibu=()=>{
    let num = this.state.num++;
    if(num<=5){
        this.setState({
            num:num
        })
    }else{
        this.setModalVisible(!this.state.modalVisible);
    }  
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("必填，且会在 modal 处于开启状态时阻止BackHandler事件");
          }}>
          <View>
            <View>
                <View style={{width:'100%',height:'100%'}}>
                    <Swiper showsButtons={true} loop={false}>
                        <Image source={require('../../images/1.jpg')}
                        style={{width:'100%',height:'100%'}}/>
                        <Image source={require('../../images/2.jpg')}
                        style={{width:'100%',height:'100%'}}/>
                        <Image source={require('../../images/3.jpg')}
                        style={{width:'100%',height:'100%'}}/>
                        <Image source={require('../../images/4.jpg')}
                        style={{width:'100%',height:'100%'}}/>
                        <Image source={require('../../images/5.jpg')}
                        style={{width:'100%',height:'100%'}}/>
                    </Swiper>
                </View>
                <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}
                    style={{position:'absolute',top:10,right:10}}
                >
                    <Icon name='close' size={30} color='#888' />
                </TouchableHighlight>
                {/* <TouchableHighlight
                    onPress={() => {
                    this.xiayibu();
                    }}
                    style={{position:'absolute',bottom:10,right:10}}
                >
                    <Text>下一步<Icon name='right' size={16} color='#888' /></Text>
                </TouchableHighlight> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
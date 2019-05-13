import React, { Component } from "react";
import {View, Button, Image,StyleSheet} from "react-native";
import ImagePicker from 'react-native-image-picker'
var photoOptions = {
  //底部弹出框选项
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
export default class User extends Component {
  constructor(props) {
    super(props);
        this.state = {
          imgURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557719416857&di=53df8cf3b056a3120406703e3ffa2b17&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F69ad7a731f43d4b8729f1a2fbe65c43801ca0f033250-EV1vMf_fw658'
        }
      }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri:this.state.imgURL}} 
        style={{ width: 200, height: 200, borderRadius:100 }}></Image>
        <Button title="拍照" onPress={this.cameraAction}></Button>
      </View>
    )
  }
  cameraAction = () => {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      console.log('response' + response);
      if (response.didCancel) {
        return
      }
      this.setState({
        imgURL: response.uri
      });
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
    alignItems:'center',
    marginTop:70
  }
});
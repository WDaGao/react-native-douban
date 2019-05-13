import React,{Component} from 'react'
import {View,Text,Alert} from 'react-native'

export default class Search extends Component{


    componentDidMount(){
        Alert.alert(
          '通知',
          '由于本应用正处于开发阶段，有些功能暂未开通使用，给您带来不便的使用体验非常抱歉',
          [
            
            {text: '不原谅',onPress: () =>this.noYuanLiang()},
            {text: '原谅他'}
          ],
          { cancelable: false }
        )
      }
      noYuanLiang(){
        Alert.alert(
          '桑心',
          '没有想到你居然是这样的人',
          [
            {text: '确定'}
          ],
          { cancelable: false }
        )
      }
    render(){
        return <View>
            <Text>这是Search组件</Text>
        </View>
    }
}
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text,Share, View ,Button} from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux'
import App from './App.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieList from './components/movie/MovieList.js'
import MovieDetail from './components/movie/MovieDetail.js'
import tuijian from './components/tuijian/TuiJian.js'
import dujitang from './components/dujitang/DuJiTang.js'
import New from './components/news/News.js'
import GoShop from './components/goShop/GoShop.js'
import Mh from './components/mh/Mh.js'
import ZhangJie from './components/mh/ZhangJie.js';
import MhImg from './components/mh/MhImg.js';
import NewDetail from './components/news/NewDetail.js'

export default class Main extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
        onShare = async() => {
            try {
              const result = await Share.share({
                message:
                  'https://i.csdn.net/#/uc/profile',
              })
        
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              alert(error.message);
            }
          }
    render() {      
        return <Router sceneStyle={{backgroundColor:'#fff'}}>
            <Stack key="root">
                <Scene key="app" component={App} title="首页" 
                renderRightButton={<Icon onPress={this.onShare} name="ellipsis-v" size={25} color="gray" style={{padding:20}}/>}
                />
                <Scene key="MovieList" component={MovieList} title="高清影院"/>
                <Scene key="MovieDetail" component={MovieDetail} title="电影详情"/>
                <Scene key="tuijian" component={tuijian} title="图片分享"/>
                <Scene key="dujitang" component={dujitang} title="搞笑段子"/>
                <Scene key="news" component={New} title="新闻资讯"/>
                <Scene key="goshop" component={GoShop} title="去购物"/>
                <Scene key="mh" component={Mh} title="漫画街"/>
                <Scene key="zj" component={ZhangJie} title="章节"/>
                <Scene key="mhImg" component={MhImg} title="章节"/>
                <Scene key="newDetail" component={NewDetail} title="新闻详情"/>
            </Stack>
        </Router>


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

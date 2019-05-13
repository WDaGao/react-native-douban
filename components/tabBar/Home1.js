import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import Swiper from 'react-native-swiper';
const ip="http://47.100.175.31";

export default class Home extends Component {

    constructor(props){
        super(props)
        this.state={
            bannerList:[]
        }
    }

    componentWillMount(){
        fetch(`${ip}/datas/product/index.php`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    bannerList:data.carouselItems
                })
            })
    }

    render() {
        return <View>
            <View style={styles.wrapper}>
                <Swiper style={styles.wrapper} autoplay={true} showsButtons={true}>
                    {this.state.bannerList.map((item,i)=>{
                        return <View key={i}>
                                <Image source={{uri:ip+'/'+item.img}} style={{width:'100%',height:'100%'}}></Image>
                            </View>
                    })}
                </Swiper>
            </View>
            <View>
                <View>
                    <Image source={require('../../images/menu1.png')} style={{width:60,height:60}}></Image>
                    <Text>新闻资讯</Text>
                </View>
                <View>
                    <Image source={require('../../images/menu2.png')} style={{width:60,height:60}}></Image>
                    <Text>新闻资讯</Text>
                </View>
                <View>
                    <Image source={require('../../images/menu3.png')} style={{width:60,height:60}}></Image>
                    <Text>商品购买</Text>
                </View>
                <View>
                    <Image source={require('../../images/menu4.png')} style={{width:60,height:60}}></Image>
                    <Text>新闻资讯</Text>
                </View>
                <View>
                    <Image source={require('../../images/menu5.png')} style={{width:60,height:60}}></Image>
                    <Text>新闻资讯</Text>
                </View>
                <View>
                    <Image source={require('../../images/menu6.png')} style={{width:60,height:60}}></Image>
                    <Text>新闻资讯</Text>
                </View>
            </View>    
        </View>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height:200
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})
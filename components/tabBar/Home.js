import React,{Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
const ip="http://47.100.175.31";
export default class Home extends Component{
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

    render(){
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
            <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                <TouchableHighlight onPress={this.goNew} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu1.png')} style={styles.Image}></Image>
                        <Text>新闻资讯</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goDuJiTang} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu2.png')} style={styles.Image}></Image>
                        <Text>搞笑段子</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goShop} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu3.png')} style={styles.Image}></Image>
                        <Text>商品购买</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goMh} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu4.png')} style={styles.Image}></Image>
                        <Text>百年漫画</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goMovieList} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu5.png')} style={styles.Image}></Image>
                        <Text>热映电影</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.goTuiJian} style={styles.box} underlayColor="#fff">
                    <View>
                        <Image source={require('../../images/menu6.png')} style={styles.Image}></Image>
                        <Text>更多推荐</Text>
                    </View>
                </TouchableHighlight>
            </View>    
            <View style={{padding:20,backgroundColor:'#eee',marginTop:20}}>
                <Text style={{}}>通知</Text>
            </View>
            <View style={{padding:20}}>
                <Text style={{lineHeight:20}}>下面功能准备实现小说和音乐功能，因时间有限，暂时没有准备对应接口，后期有时间了再来完善这些功能</Text>
            </View>
        </View>
    }

    //function
    goMovieList=()=>{
        Actions.MovieList() 
    }
    goTuiJian=()=>{
        Actions.tuijian() 
    }
    goDuJiTang=()=>{
        Actions.dujitang() 
    }
    goNew=()=>{
        Actions.news()
    }
    goShop=()=>{
        Actions.goshop()
    }
    goMh=()=>{
        Actions.mh()
    }
}




const styles = StyleSheet.create({
    box:{
        width:"33.33%",
        alignItems:'center',
        marginTop:15
    },
    Image:{
        marginBottom:10,
        width:60,
        height:60
    },
    wrapper: {
        height:200
    }
})
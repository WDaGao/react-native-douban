import React,{Component} from 'react'
import {View,Text,Image,
    ActivityIndicator,
    StyleSheet,Button,
    ScrollView,Alert} from 'react-native'

export default class MovieDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            movieDetail:[],
            casts:[]
        }
    }

    componentWillMount(){
        fetch(`https://api.douban.com/v2/movie/subject/${this.props.gid}?apikey=0b2bdeda43b5688921839c8ecb20399b`)
            .then(res=>res.json())
            .then(data=>{
                let zhuyan=[];
                for(var i=0;i<data.casts.length;i++){
                    zhuyan.push(data.casts[i].name)
                }
                this.setState({
                    movieDetail:data,
                    isLoading:false,
                    casts:zhuyan
                })
            })
    }
    handlePress=()=>{
        Alert.alert(
            '警告',
            '哎呀出错了，在线播放功能暂时正在维护中，具体开放时间需要等通知',
            [
              {text: '确定'}
            ],
            { cancelable: false }
          )
    }
    loadMovie() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <View>
                <View style={styles.titleBox}>
                    <View style={styles.Image}>
                        <Image source={{uri:this.state.movieDetail.images.large}} 
                        style={{width:100,height:130}}/>
                    </View>
                    <View style={styles.Right}>
                        <Text style={styles.Text}>电影：<Text>{this.state.movieDetail.title}</Text></Text>
                        <Text style={styles.Text}>导演：<Text>{this.state.movieDetail.directors[0].name}</Text></Text>
                        <Text style={styles.Text}>主演：<Text>{this.state.casts.join('/')}</Text></Text>
                        <Text style={styles.Text}>类型：<Text>{this.state.movieDetail.genres.join('/')}</Text></Text>
                        <Text style={styles.Text}>年代：<Text>{this.state.movieDetail.year}</Text></Text>
                    </View>
                </View>
                <View style={styles.List}>
                    <Text>(1)号服务器-[高清]</Text>
                </View>
                <View style={styles.btn}> 
                    <Button onPress={this.handlePress} title="第1集" color="#f60"></Button>
                </View>
                <View style={styles.List}>
                    <Text>视频简介：</Text>
                </View>
                <View style={styles.content}>
                    <Text style={{lineHeight:24,marginTop:10}}>
                        {this.state.movieDetail.summary}
                    </Text>
                </View>
            </View>
        }
    
    }

    render(){
        return <ScrollView>
            {this.loadMovie()}
        </ScrollView>
    }
}
const styles = StyleSheet.create({
    titleBox:{
        display:"flex",
        padding:10,
        flexDirection:"row",
        borderBottomWidth:2,
        borderColor:"#aaa"
    },
    Image:{
        width:100
    },
    Right:{
        flex:1
    },
    Text:{
        marginTop:3,
        marginLeft:5,
        flexWrap:'wrap'
    },
    List:{
        backgroundColor:"#eee",
        width:"100%",
        padding:10,
        marginTop:5
    },
    btn:{
        width:100,
        margin:10
    },
    content:{
        
    }
})
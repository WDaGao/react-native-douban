import React, { Component } from 'react'
import {
    View, Text,
    ActivityIndicator,
    Image, FlatList,
    TouchableHighlight,Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            noPage: 1,
            totalPage: 0,
            pageSize: 10,
            isLoading: true
        }
    }
    componentWillMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        const start = (this.state.noPage - 1) * (this.state.pageSize)
        const url = `https://api.douban.com/v2/movie/in_theaters?start=${start}&count=${this.state.pageSize}&apikey=0b2bdeda43b5688921839c8ecb20399b`
        fetch(url).then((res) => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    movies:this.state.movies.concat(data.subjects),
                    totalPage: Math.ceil(data.total / this.state.pageSize)
                })
            })
    }
    loadMovie() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <FlatList
                data={this.state.movies}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
                onEndReachedThreshold={0.5}
                onEndReached={this.loadNextPage}
            />
        }
    }
    renderItem=(item)=>{
        return <TouchableHighlight onPress={this.goMovieDeail.bind(this,item.id)} underlayColor="#fff">
                <View style={{flexDirection:'row',
                             padding:10,margin:10,
                             marginBottom:0,
                             borderWidth:1,
                             borderColor:"#ccc",
                             elevation:3
                             }}>
                    <Image source={{uri:item.images.small}} style={{width:100,height:140}}/>
                    <View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>电影名称：<Text>{item.title}</Text></Text></View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>电影类型：<Text>{item.genres.join(',')}</Text></Text></View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>上映年份：<Text>{item.year}年</Text></Text></View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>豆瓣评分：<Text>{item.rating.average}分</Text></Text></View>
                    </View>
                </View>
        </TouchableHighlight>
    }
    loadNextPage=()=>{
        if((this.state.noPage+1)>this.state.totalPage){
            Alert.alert(
                '警告',
                '哎呀，已经到底了，客官您不能在拖了',
                [
                  {text: '确定'}
                ],
                { cancelable: false }
              )
                return
            }
        this.setState({
            noPage:this.state.noPage+1
        },function(){
            this.getMovieList()
        })
    }
    goMovieDeail=(id)=>{
        Actions.MovieDetail({gid:id})
    }
    render() {
        return <View>
            {this.loadMovie()}
        </View>
    }
}

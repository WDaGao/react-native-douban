import React, { Component } from 'react'
import {
    View, Text,
    ActivityIndicator,
    Image, FlatList,
    TouchableHighlight,Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class Mh extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mhList: [],
            isLoading: true
        }
    }
    componentWillMount() {
        this.getMhList();
    }

    getMhList = () => {
        const url = `http://47.100.175.31/mh/mh_list.php`
        fetch(url).then((res) => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    mhList:this.state.mhList.concat(data.data)
                })
            })
    }
    loadMh() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <FlatList
                data={this.state.mhList}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
                // onEndReachedThreshold={0.5}
                // onEndReached={this.loadNextPage}
            />
        }
    }
    renderItem=(item)=>{
        return <TouchableHighlight onPress={this.goMhDeail.bind(this,item.id)}  underlayColor="#fff">
                <View style={{flexDirection:'row',
                             padding:10,margin:10,
                             marginBottom:0,
                             borderWidth:1,
                             borderColor:"#ccc",
                             elevation:3
                             }}>
                    <Image source={{uri:item.titleImg}} style={{width:100,height:140}}/>
                    <View style={{flex:1}}>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>漫画：<Text>{item.title}</Text></Text></View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5}}>类型：<Text>{item.biaoqian}</Text></Text></View>
                        <View style={{marginTop:12,display:'flex'}}><Text style={{lineHeight:20, marginLeft:10,marginRight:5}}>简介：<Text>{item.content}</Text></Text></View>
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
            this.getMhList()
        })
    }
    goMhDeail=(id)=>{
        Actions.zj({mid:id})
    }
    render() {
        return <View>
            {this.loadMh()}
        </View>
    }
}

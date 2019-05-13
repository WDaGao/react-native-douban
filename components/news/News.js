import React, { Component } from 'react'
import {
    View, Text,
    ActivityIndicator,
    Image, FlatList,
    TouchableHighlight,Alert,ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newList: [],
            noPage: 1
        }
    }
    componentWillMount() {
        this.getNewList();
    }

    getNewList = () => {
        let url = `https://api.apiopen.top/getWangYiNews?page=${this.state.noPage}&count=6`
        fetch(url).then((res) => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    newList:this.state.newList.concat(data.result)
                })
            })
    }
    loadNew() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <FlatList
                data={this.state.newList}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
                onEndReachedThreshold={0.5}
                onEndReached={this.loadNextPage}
            />
        }
    }
    renderItem=(item)=>{
        return <TouchableHighlight onPress={this.goNewDetail.bind(this,item.path)} underlayColor="#fff">
                <View style={{
                             padding:10,margin:10,
                             marginBottom:0,
                             borderWidth:1,
                             borderColor:"#ccc",
                             elevation:3
                             }}>
                    <View style={{ flexDirection:'row',flexWrap:'wrap'}}>
                        <Image source={{uri:item.image}} style={{width:140,height:100}}/>
                        <View style={{flex:1, display:'flex', marginTop:12}}>
                            <Text style={{marginLeft:10,marginRight:5, fontSize:16, fontWeight:'bold'}}><Text>{item.title}</Text></Text>
                            <Text style={{marginLeft:10,marginTop:20}}><Text>{item.passtime}</Text></Text>
                        </View>
                    </View>
                    {/* <View>
                        <View style={{marginTop:12}}><Text style={{marginLeft:10,marginRight:5,lineHeight:20}}><Text>{item.content}</Text></Text></View>
                    </View> */}
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
            this.getNewList()
        })
    }
    goNewDetail=(url)=>{
        Actions.newDetail({url:url})
    }
    render() {
        return <View>
            {this.loadNew()}
        </View>
    }
}

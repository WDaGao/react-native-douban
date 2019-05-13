import React, { Component } from 'react'
import {
    View, Text,
    ActivityIndicator,
    TextInput, FlatList,
    TouchableHighlight,ScrollView,Button
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class ZhangJie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zhangjie: [],
            isLoading: true,
            pno:1,
            InputValue:''
        }
    }
    componentWillMount() {
        this.getzhangjie();
    }

    getzhangjie = () => {
        const url = `http://47.100.175.31/mh/mh_zhangjie.php?vid=${this.props.mid}`
        fetch(url).then((res) => res.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    zhangjie:data.data
                })
            })
    }
    loadMh() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <FlatList style={{display:'flex',flexWrap:'wrap', flexDirection:'row'}}
                data={this.state.zhangjie}
                numColumns={3}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
            />
        }
    }
    renderItem=(item)=>{
        return <TouchableHighlight onPress={this.goImg.bind(this,item.zid,this.state.pno)}  underlayColor="#fff">
                        <View style={{width:100,height:30,margin:10,
                            borderWidth:1,backgroundColor:'#eee',alignItems:'center'
                            }}>
                        <Text style={{lineHeight:30}}>{item.zhangjie}</Text>
                    </View>
            </TouchableHighlight>
    }
    goImg=(id,pno)=>{
        Actions.mhImg({zid:id,pno:pno})
    }
    render() {
        return <ScrollView>
            <View>
                {this.loadMh()}
            </View>
            {this.isInputShow()}
        </ScrollView>
    }
    isInputShow=()=>{
        if(this.state.zhangjie.length>2){
            return <View style={{alignItems:'center',marginTop:20}}><Text>已经是全部章节了</Text></View>
        }else{
            return <View>
                    <TextInput
                    keyboardType={'numeric'} placeholder='请输入要跳转的页码号'
                    onChangeText={this.onChange}></TextInput>
                    <Button onPress={this.onClick} title='跳转'></Button>
                </View>
        }
    }
    onChange=(e)=>{
        this.setState({
            InputValue:parseInt(e)
        })
    }
    onClick=()=>{
        Actions.mhImg({zid:this.state.zhangjie[0].zid,pno:this.state.InputValue})
    }
}

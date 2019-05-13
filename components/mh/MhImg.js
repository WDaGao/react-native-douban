import React, { Component } from 'react'
import {
    View, Text,
    ActivityIndicator,
    Image, FlatList,Alert,
    StyleSheet,ScrollView,Dimensions,Button
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class MhImg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zhangjie: [],
            isLoading: true,
            noPage:props.pno,
            totalPage:0
        }
        
    }
    

    componentWillMount() {
        this.getzhangjie();
    }

    getzhangjie = () => {
        const url = `http://47.100.175.31/page/list3.php?pno=${this.state.noPage}&zid=${this.props.zid}`
        fetch(url).then((res) => res.json() )
            .then(data => {
                this.setState({
                    isLoading: false,
                    zhangjie:data.data,
                    totalPage:data.pageCount
                })
            })
    }
    loadMh() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return <FlatList style={{display:'flex',flexWrap:'wrap', flexDirection:'row'}}
                data={this.state.zhangjie}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
            />
        }
    }
    renderItem=(item)=>{
        return <View>
                <Image defaultSource={require('../../images/loading.gif')}
                resizeMode={'cover'} resizeMethod='scale'
                source={{uri:item.img}} style={[styles.header_top_wrap_img]}></Image>
            </View>
    }
    render() {
        return <ScrollView>
             <View>
                {this.loadMh()}
            </View>
            <View style={{display:'flex',flexDirection:'row-reverse'}}>
                <Text style={{lineHeight:20,marginRight:10,color:'#000'}}>当前第{this.state.noPage}页</Text>
                <Text style={{lineHeight:20,marginRight:10,color:'#000'}}>总共{this.state.totalPage}页</Text>
            </View>
            <Button onPress={this.loadNextPage} title='下一页' color='#4CAF50'></Button> 
        </ScrollView>
    }
    loadNextPage=()=>{
        if((this.state.noPage+1)>this.state.totalPage){
            Alert.alert(
                '警告',
                '本章节已经完毕',
                [
                  {text: '确定'}
                ],
                { cancelable: false }
              )
                return
            }
        this.setState({
            zhangjie: [],
            noPage:this.state.noPage+1
        },function(){
            this.getzhangjie()
        })
    }
}

const win = Dimensions.get('window');
const hen = Dimensions.get('window');
const styles = StyleSheet.create({
    header_top_wrap_img: {
        width: win.width,
        height: hen.height,
      },
    })
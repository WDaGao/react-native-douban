import React,{Component} from 'react'
import {View,Text,FlatList,Share,Button,
        Image,ActivityIndicator,StyleSheet,
        ScrollView,RefreshControl} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class DuJiTang extends Component{
    constructor(){
        super()
        this.state={
            data:[],
            img:null,
            isLoading:true,
            refreshing:false
        }
    }
    componentWillMount(){
        this.getList()
    }
    //获取数组
    getList(){
        fetch('https://www.apiopen.top/satinGodApi?type=4&page=0')
        .then(res=>res.json())
            .then(data=>{
                this.setState({
                    isLoading:false,
                    data:this.state.data.concat(data.data),
                    refreshing:false
                })
        })
    }
    //加载数组
    loadList(){
        if(this.state.isLoading){
            return <ActivityIndicator size="large" color="#0000ff" />
        }else{
            return <FlatList
                data={this.state.data}
                keyExtractor={(item,i)=>i}
                renderItem={({ item }) =>this.renderItem(item)}
                ItemSeparatorComponent={this._separator}
            >
            </FlatList>
        }
    }
    loadNextPage=()=>{
            this.getList()
    }
    //边框线
    _separator(){
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }
    //上拉加载
    onRefresh=()=>{
        this.setState({
            refreshing:true,
            data:[]
        })
        this.getList()
    }
    onShare = async(gif) => {
        try {
          const result = await Share.share({
            message:gif
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
    renderItem=(item)=>{
        return <View style={styles.listBox}>
            <View>
                <View style={styles.box}>
                    <Image source={{uri:item.header}}
                     style={{width:50,height:50,borderRadius:25}}></Image>
                    <Text style={styles.name}>{item.username}</Text>
                </View>
                <Text  style={{marginTop:20,fontSize:16,color:'#000'}}>{item.text}</Text>
                <Image source={{uri:item.gif}} defaultSource={require('../../images/loadImg.jpg')} style={{width:360,height:400,marginTop:20}}></Image>
                <View style={styles.iconList}>
                    <Text><Icon name="thumbs-o-up" size={14} color="#000"></Icon>{item.up}</Text>
                    <Text style={styles.iconRight}><Icon name="thumbs-o-down" size={14} color="#000"></Icon>{item.down}</Text>
                    <Text style={styles.iconRight}><Icon name="commenting-o" size={14} color="#000"></Icon>{item.comment}</Text>
                    <Text onPress={this.onShare.bind(this,item.gif)} style={styles.iconRight}><Icon name="share" size={14} color="#000"></Icon>分享</Text>
                    <View style={{flex:1, display:'flex',flexDirection:'row-reverse'}}>
                        <Text style={styles.content}>{item.passtime}</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor:"#eee",margin:5}}>
                <Text style={{margin:5,color:"#000",fontSize:14, fontWeight:'bold'}}>{item.top_commentsName}</Text>
                <Text style={{margin:5,color:"#555",marginTop:0,fontSize:12,lineHeight:20}}>{item.top_commentsContent}</Text>
                <Text style={{margin:5,color:"#999",marginTop:0,fontSize:10,lineHeight:20}}>查看全部{item.comment}条评论</Text>
            </View>
        </View>
    }

    render(){
        return <ScrollView 
            refreshControl={  //设置下拉刷新组件
                <RefreshControl
                refreshing={this.state.refreshing}  
                onRefresh={this.onRefresh}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                tintColor='white'
                title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                />
            }
        >
            <View>
                {this.loadList()}
            </View>
            <Button onPress={this.loadNextPage} title="点击加载更多"></Button>
        </ScrollView>
    }
    
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        textAlign:'center',
        backgroundColor:'#ccc',
        padding:10

    },
    box:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        marginLeft:10,
        fontSize:14
    },
    listBox:{
        padding:10
    },
    content:{
        margin:10
    },
    iconList:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginTop:10
    },
    iconRight:{
        marginLeft:5
    },
    add:{
        
    }
})
import React, {Component} from 'react'
import {Share,View,Text, Button} from 'react-native'

export default class GoShop extends Component {
    constructor(props){
        super(props)
        this.state={
            newList:[]
        }
    }

    componentWillMount() {
        this.getNewList();
    }

    getNewList = () => {
        let url = 'http://47.100.175.31/datas/product/list2.php?pon=2'
        fetch('http://47.100.175.31/data/page/list.php?zid=5').then((res) => res.json())
            .then(data => {
                console.warn(data);
                this.setState({
                    newList:this.state.newList.concat(data.data)
                })
            })
    }

   onShare = async() => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
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
  };

  render() {
    return (<View style={{alignItems:'center'}}>
        <Text>暂未找到合适接口！等后续添加</Text>
      </View>
    );
  }

}
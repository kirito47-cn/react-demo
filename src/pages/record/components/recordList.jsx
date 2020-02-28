import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getRecord } from '@/store/record/action'
import { is, fromJS } from 'immutable';
import API from '@/api/api';
import './recordList.less';

class RecordList extends Component{
  
  // state = {
  //   recordData: [],
  // }
  
  /**
   * 初始化获取数据
   * @param  {string} type 数据类型
   */
  // getRecord = async type => {
  //   try{
  //     let result = await API.getRecord({type});
  //     // console.log(result)

  //     this.setState({recordData: result.data||[]})
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
 getRecordfromRedux = async type =>{
   try {
      await this.props.getRecord(type)
   } catch (error) {
     console.log(error)
   }
 }
  componentWillReceiveProps(nextProps){
    // 判断类型是否重复
    let currenType = this.props.location.pathname.split('/')[2];
    let type = nextProps.match.params.type
    if(currenType !== type){
      this.props.getRecord(type);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentWillMount(){
    let type = this.props.location.pathname.split('/')[2];
    // console.log(this.props.recordData)
    this.getRecordfromRedux(type);
  }

  render(){
 
    return (
      <div>
        <ul className="record-list-con">
        {
        
          this.props.recordData.payload.map((item, index) => {
            return <li className="record-item" key={index}>
              <section className="record-item-header">
                <span>创建时间：{item.created_at}</span>
                <span>{item.type_name}</span>
              </section>
              <section className="record-item-content">
                <p><span>用户名：</span>{item.customers_name} &emsp; {item.customers_phone}</p>
                <p><span>商&emsp;品：</span>{item.product[0].product_name}</p>
                <p><span>金&emsp;额：</span>{item.sales_money} &emsp; 佣金：{item.commission}</p>
              </section>
              <p className="record-item-footer">等待管理员审核，审核通过后，佣金将结算至账户</p>
            </li>
          })
        }
        </ul>
      </div>
    );
  }

}

// export default RecordList;

export default connect(state => ({
  recordData: state.recordData,
}), {
  getRecord
})(RecordList);
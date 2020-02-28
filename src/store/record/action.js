import * as pro from './action-type';
import API from '@/api/api';



export const getRecord = (recordType)=>{

  return async (dispatch) =>{
      try {
        let result  = await API.getRecord({type:recordType})
        /**
          * result
              data: [{sales_id: 527, register_user_id: 385, sales_money: 12, customers_name: "测试",…},…]
              totalPage: 1
              currentPage: 1
         */
        dispatch({
          type:pro.GETRECORD,
          payload:result
        })
      } catch (error) {
        console.log(error)
      }
  }

}
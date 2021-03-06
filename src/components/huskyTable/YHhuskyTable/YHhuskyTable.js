/**
 * 已完成功能：editdelete,editCancle，add。search
 * 未完成：
 * editCancle.可调不同的check事件
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../huskyTable.less';

import INHuskyTable from '../huskyTable';
import SearchBox from '../searchBox';
import EditableCell from '../editableCell';
import AddNewItemComponent from './AddNewItem';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';


const Search = Input.Search;

function HuskyTable({dispatch,huskyTableM, }) {
    /*** 编辑时触发函数
     * 参数：key，key是datasourcs
     * 功能：将model的dataSource的editable更新，整个dataSource更新。
     */
    const edit = (record) => {
        dispatch({
            type: 'YHhuskyTableM/updateState',
            payload: {
                editUserObj:record,
                isAddNewItem: true,
            }
        })
        // dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSource: newDataSource,dataSourceBuffer:newDataSource,isEditLock: true}});
        
    };


    /***编辑成功的确认事件
     * 参数是点击确认按钮的key
     * 功能：将model的dataSource，dataSourceBuffer的整个值更新为dataSourceBuffer缓存,将isEditLock改为false，释放
     */
    const checkConfim = (newDataSource) => {
        dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSource: newDataSource , dataSourceBuffer:newDataSource,isEditLock: false,isNewItem: false} });
    };


    /***
     * 编辑取消事件 
     * 参数是点击取消按钮的key
     * 功能：将model的dataSource，dataSourceBuffer的整个值更新为回退为实际的值,将isEditLock改为false，释放
     */
    const checkCancle = (flag,newDataSource) => {
        // console.log('huskyTableM.isNewItem',huskyTableM.isNewItem)
        flag && dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSource: newDataSource, dataSourceBuffer: newDataSource, isEditLock: false, } });

        !flag && dispatch({ type: 'YHhuskyTableM/updateState', payload: { isNewItem: false, isEditLock: false } });
            
    };

    /***
     * 当input改变时
     */
    const onCellChange = (dataSourceBuffer) => {
        dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer,} });
    }

    /**
     * 删除表格中的条目
     */
    const handleDelete = (id) => {        
        // dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSourceBuffer: dataSourceBuffer, dataSource: dataSourceBuffer, isEditLock: false } });
        dispatch({
          type: 'YHhuskyTableM/requestDeleteItem',
          payload: id
        });
    }

    /***
     * 增加表格事件
     */
    const handleAdd = (newDataSource) => {
        dispatch({
            type: 'YHhuskyTableM/updateState',
            payload: {
                isAddNewItem: true,
                editUserObj:undefined,
            }
        })
    }

    /***
     * @name handleSubmitNewItem 
     * @param values 新增的数据
     * @description 确认增加表格条目事件表格事件
     */
    const handleSubmitNewItem = (values) => {
        dispatch({
          type: 'YHhuskyTableM/requestAddNewItem',
          payload: {
              name: values.name,
              noUser:values.noUser,
              sex:values.sex, 
              attr:values.attr,
              deptName:values.deptName,
              pwd:values.pwd,
          }
        });
    }
    /***
     * @name handleCancelAddNewItem 
     * @description 取消新item弹出框
     */
    const handleCancelAddNewItem = () => {
        dispatch({
            type: 'YHhuskyTableM/updateState',
            payload: { isAddNewItem: false, }
        });
    }
    /***
     * @name handleSubmitNewItem 
     * @param values 新增的数据
     * @description 确认增加表格条目事件表格事件
     */
    const handleSubmitEditItem = (values) => {
        dispatch({
          type: 'YHhuskyTableM/requestEditItem',
          payload: {
              id: huskyTableM.editUserObj.id,
              name: values.name,
              noUser:values.noUser,
              sex:values.sex, 
              attr:values.attr,
              deptName:values.deptName,
              pwd:values.pwd,
          }
        });
    }


    /***
     * 搜索表格事件，传入搜索的字段
     */
    const searchClick = (newDataSource) => {
        dispatch({ type: 'YHhuskyTableM/updateState', payload: { dataSourceBuffer: newDataSource,} });
    }
    

    const onChangeTable=(current)=>{
        dispatch({ type: 'YHhuskyTableM/updateState', payload: { paginationCurrent: current,} })
    }
    const emitEmptyhandle = () => {
        dispatch({type: 'YHhuskyTableM/updateState',payload: {searchValue: '' ,} })
    }

    const onChangeSearchValue=(value)=>{
        dispatch({type: 'YHhuskyTableM/updateState',payload: {searchValue: value ,}});
    }

    // const isCanOrderChange=(prams) => {
    //     dispatch({type: 'YHhuskyTableM/updateState',payload: {isCanOrder: prams,}});        
    // }   
    
    return (
        <div>
        <INHuskyTable 
        columns={huskyTableM.columns} isEditLock={huskyTableM.isEditLock} dataSource={huskyTableM.dataSource} 
        isNewItem={huskyTableM.isNewItem} dataSourceBufferProp={huskyTableM.dataSourceBuffer} paginationCurrent={huskyTableM.paginationCurrent} 
        paginationPageSize={huskyTableM.paginationPageSize} 
        searchValue={huskyTableM.searchValue} dataSourceLength={huskyTableM.dataSourceLength}
        editProps={edit} checkConfimProps={checkConfim} checkCancleProps={checkCancle}
        onCellChangeProps={onCellChange} handleDeleteProps={handleDelete} handleAddProps={handleAdd}
        searchClickProps={searchClick} onChangeTableProps={onChangeTable} emitEmptyhandleProps={emitEmptyhandle}
        onChangeSearchValueProps={onChangeSearchValue} inputPlaceholder={huskyTableM.inputPlaceholder} searchOptionIndex={huskyTableM.searchOptionIndex} 
        isNormal={true} tableLoading={huskyTableM.tableLoading}/>
        {
            huskyTableM.isAddNewItem
            ?
            <div className={styles["mask"]}>
                <div className={styles["model"]} >
                    <AddNewItemComponent AddNewItemLoading={huskyTableM.AddNewItemLoading} 
                    handleSubmitNewItem={handleSubmitNewItem} handleCancelAddNewItem={handleCancelAddNewItem} 
                    handleSubmitEditItem={handleSubmitEditItem}
                    editUserObj={huskyTableM.editUserObj}></AddNewItemComponent>
                    
                </div>
            </div>
            :
            null
        }
        </div>

    );
}

HuskyTable.propTypes = {
};

export default connect(({YHhuskyTableM}) => ({huskyTableM:YHhuskyTableM}))(HuskyTable);


  
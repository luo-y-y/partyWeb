import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'components'
import { Form,Select, Input, InputNumber, Radio, Modal, Table } from 'antd'
const Option = Select.Option;
import { Row, Col, Card,Divider,Avatar,message } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  dispatch,
  users,
  dataFormat,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      onOk();
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel(){
      dispatch({
        type: `${dataFormat.nameSpace}/updateState`,
        payload: {v:{
          add:false,
          edit:false,
          view:false
        }},//隐藏弹窗
      })
    },
    title:'请选择需要绑定到此角色的用户'
  }

  const columns1 =[
    {
      title: '用户名',
      dataIndex: 'userName',
    }, {
      title: '手机号',
      dataIndex: 'tel',
    }, {
      title: '头像',
      dataIndex: 'headUrl',
      noEdit:true,//是否渲染到编辑字段
      render:(text, record, index)=>{
        return(<Avatar src={`http://192.168.23.212/${text}`} />);
        },
     }
  ];
  const Pagination = {
    pageSize:5,
  }
  const rowSelection = {
    type:'radio',
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({
        type: `role_user_list/updateState`,
        payload: {selectedUsersRows:selectedRows},//更新选中列表
      })
    },
    getCheckboxProps: record => ({
      //disabled: record.code === 'admin', // 管理员角色选中
    }),
  };
  return (
    <Modal {...modalOpts}>
      <Table dataSource={users} pagination={Pagination} size="small" columns={columns1} rowSelection={rowSelection}  rowKey={record => record.id} />
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)

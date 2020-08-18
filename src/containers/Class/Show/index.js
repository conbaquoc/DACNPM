import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Input, Typography, Button, Modal, DatePicker, Spin } from 'antd';
import { Link } from 'react-router-dom';
import Label from '../../../components/RestField/Label';
import RestList from '../../rest/List';
// import RestShow from '../../rest/List';
// import TextField from '../../../components/RestField/TextField';
import { getOneClassAction, startRollcallAction } from '../../../redux/class/actions';
import EventWrapper from './styles';

class DetailClass extends Component {
  state = {
    visible: false,
    apiHistory: `rollcall/${this.props.match.params.id}/history`,
  };
  componentDidMount() {
    this.props.getClassInfo(this.props.match.params.id)
  }

  showModal = () => {
    this.setState({
      visible: true,
      // apiHistory: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.startRollcall(values);
        this.setState({
          visible: false,
          // apiHistory: `rollcall/${this.props.match.params.id}/history`
        });
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      apiHistory: `rollcall/${this.props.match.params.id}/history`
    });
  };

  render() {
    const { currentClass, form, loading, rollcallHistorySuccess } = this.props;
    const {apiHistory} = this.state;
    const { getFieldDecorator } = form;
    // console.log(currentClass.subject);
    
    const apiUrl = `classes/${this.props.match.params.id}/students`;
    // const apiHistory= `rollcall/${this.props.match.params.id}/history`
    // if(rollcallHistorySuccess === true) {
    //   this.setState({
    //     apiHistory: `rollcall/${this.props.match.params.id}/history`
    //   })
    // }
    return (
      <EventWrapper>
        <Typography.Title level={4}>Danh sách sinh viên</Typography.Title>
        <RestList
          // title="Danh sách lớp học"
          // filter={<Filter />}
          resource= {apiUrl}
          hasCreate={false}
          initialFilter={{ limit: 30, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
        >
          <Label
            source="id"
            title="ID sinh viên"
            width="10%"
          />
          <Label
            source="fullName"
            title="Tên sinh viên"
          />
          <Label
            source="email"
            title="Email"
          />
          
          <Label
            source="class"
            title="Lớp"
          />
          <Label
            source="phone"
            title="SĐT"
          />
          
        </RestList>
        <Typography.Title level={4}>Thông tin lớp học phần</Typography.Title>
        <p>
          Mã lớp học:
          {currentClass.classCode || ''}
        </p>
        <p>
          Số buổi:
          {currentClass.numOfSession || ''}
        </p>
        <p>
          Thời khóa biểu:
          {currentClass.tkb || ''}
        </p>
        <p>
          Trạng thái:
          {currentClass.status === 'active' ? 'Khả dụng': 'Đã xóa'}
        </p>
        <Button type="primary" icon="plus" size="large"  onClick={this.showModal}>Bắt đầu buổi học</Button>
        <Modal
          title="Bắt đầu buổi học"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item label="Mã lớp học:">
              {getFieldDecorator("classCode",{
                rules: [
                  { required: true, message: 'Vui lòng nhập mã lớp học' },
                ],
                initialValue: currentClass.classCode
                })(
                <Input placeholder="Mã lớp học" disabled />,
              )}
            </Form.Item>
            <Form.Item label="Buổi thứ:">
              {getFieldDecorator("session",{
                rules: [
                  { required: true, message: 'Vui lòng nhập buổi' },
                ],
                })(
                <Input placeholder="Buổi thứ" />,
              )}
            </Form.Item>
            <Form.Item label="Thời gian vào lớp">
              {getFieldDecorator('checkInTime')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </Form.Item>
            <Form.Item label="Thời gian kết thúc">
              {getFieldDecorator('timeEnd')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </Form.Item>
            <Form.Item label="Khoảng thời gian điểm danh:">
              {getFieldDecorator("rangeCheckIn",{
                })(
                <Input placeholder="Số phút" />,
              )}
            </Form.Item>
          </Form>
        </Modal>
        <br/>
        <Typography.Title level={4}>Danh sách điểm danh</Typography.Title>
        {loading ? <Spin/> : (
          <RestList
          // title="Danh sách lớp học"
          // filter={<Filter />}
          resource= {apiHistory}
          hasCreate={false}
          initialFilter={{ limit: 61, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
        >
          <Label
            source="studentId"
            title="ID sinh viên"
            width="10%"
          />
          
          <Label
            source="studentFullName"
            title="Tên sinh viên"
          />
          <Label
            source="session"
            title="Buổi"
          />
          <Label
            source="rollCallCode"
            title="Code lớp học"
          />
          <Label
            source="type"
            title="Phân loại"
            render={(value) => {
              if(!value) { return ""}
              if(value === "1") {return 'Khuôn mặt'}
              if(value === "2") { return 'Vân tay'}
            }}
          />
          <Label
            source="timeStart"
            title="Thời gian bắt đầu"
            render={(value) => moment(value).format('DD/MM/YYYY HH:mm:ss')}
          />
          <Label
            source="timeEnd"
            title="Thời gian kết thúc"
            render={(value) => moment(value).format('DD/MM/YYYY HH:mm:ss')}
          />
          <Label
            source="studentStatus"
            title="Tình trạng sinh viên"
            render={(value => {
              if(!value && value !== 0) {return ""}
              if(value === 0) {return "Vắng"}
              if(value === 1) { return "Đã điểm danh"}
              if(value === 2) {return "Trễ điểm danh"}
            })}
          />
          <Label
            source="classStatus"
            title="Trạng thái lớp học"
            render={(value => {
              if(value === 0) {return "Chưa vào lớp"}
              if(value === 1) { return "Đã vào lớp"}
              if(value === 2) {return "Kết thúc điểm danh"}
              if(value === 3) { return "Đã kết thúc"}
              if(value === 4) { return "Đã hủy"}
            })}
          />
          <Label
            source="checkInTime"
            title="Thời gian điểm danh"
            render={(value) => value ? moment(value).format('DD/MM/YYYY HH:mm:ss'): 'Chưa điểm danh'}
          />
          
        </RestList>
        )}
        
      </EventWrapper>
    );
  }
}

DetailClass.propTypes = {
  onChange: PropTypes.func,
};

const mapStateToProps = state => {
  // const { data } = state.staff;
  const { currentClass, loading, rollcallHistorySuccess } = state.classes;
  return {
    // data,
    currentClass,
    loading,
    rollcallHistorySuccess
  };
};

const mapDispatchToProps = dispatch => ({
  getClassInfo: code => {
    dispatch(getOneClassAction(code))
  },
  startRollcall: values => {
    dispatch(startRollcallAction(values))
  }
})
export default connect(mapStateToProps, mapDispatchToProps )(Form.create()(DetailClass));

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import Label from '../../../components/RestField/Label';
// import Filter from '../components/Filter';
// import RestSwitch from '../../../components/RestField/Switch';
// import ActionGroup from '../../../components/RestActions/ActionGroup';
// import EditButton from '../../../components/RestActions/EditButton';
// import DeleteButton from '../../../components/RestActions/DeleteButton'
import RestList from '../../rest/List';
// import Filter from '../components/Filter';
// import { EVENT_TAGS } from '../../../configs/constants';
import EventWrapper from './styles';

class ListClass extends Component {
  componentDidMount() {}

  render() {
    const { data } =this.props;
    const apiUrl = `staffs/${data.id}/class`
    return (
      <EventWrapper>
        <RestList
          title="Danh sách lớp học"
          // filter={<Filter />}
          resource={apiUrl}
          hasCreate={false}
          initialFilter={{ limit: 10, skip: 0, order: '-createdAt', filter: {} }}
          {...this.props}
        >
          <Label
            source="subject.title"
            title="Tên lớp học"
            width="40%"
            render={( value, record) => {
            return <Link to={`/classes/${record.classCode}/show`}>{value}</Link>
          }}
          />
          <Label
            source="classCode"
            title="Mã lớp học"
          />
          
          <Label
            source="numOfSession"
            title="Số buổi học"
          />
          <Label
            source="tkb"
            title="Thời khóa biểu"
          />
          
        </RestList>
      </EventWrapper>
    );
  }
}

ListClass.propTypes = {
  onChange: PropTypes.func,
};

const mapStateToProps = state => {
  const { data } = state.staff;
  return {
    data,
  };
};
export default connect(mapStateToProps, )(ListClass);

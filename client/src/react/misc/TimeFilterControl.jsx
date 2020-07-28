import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {transactionActions} from '../../redux/actions';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class ConnectedTimeFilterControl extends React.Component {
  constructor(props) {
    super(props);

    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();


    this.state = {
        month: currentMonth,
        year: currentYear,
        yearValue: currentYear
    }

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleYearChange(e) {
    const newValue = e.target.value;
    this.setState({yearValue: newValue});

    const temp = moment(newValue, 'YYYY', true) // parse the value in strict mode to check if valid date
    if (temp.isValid() && newValue !== this.state.year) {
      this.setState({year: newValue});

      let {yearValue, ...newFilter} = this.state; // Separate values from year & month
      newFilter.year = newValue;
      console.log(newFilter);
      this.props.getTransactions(newFilter);
    }
  }

  handleMonthChange(e) {
    let newValue = e.target.value;

    this.setState({month : newValue});

    let {yearValue, ...newFilter} = this.state; // Separate values from year & month
    newFilter.month = newValue;
    console.log(newFilter);
    this.props.getTransactions(newFilter);
  }

  render() {
    return (
      <span>
        <select label='Month' onChange={this.handleMonthChange}>
          {this.createMonthOptions()}
        </select>
        <input
          label='Year'
          placeholder='Year'
          type='number'
          value={this.state.yearValue}
          onChange={this.handleYearChange}
        >
        </input>
        {true && <span></span>}
      </span>
    )
  }

  createMonthOptions() {
    const today = new Date().getFullYear
    const optionNames = ['All'].concat(monthNames);
    const monthOptions = optionNames.map((name, index) => {
      if (index===this.state.month) {
        return (
          <option
            key={index}
            value={index}
            selected
          >
            {name}
          </option>
        )
      } else {
        return (
          <option
            key={index}
            value={(index === 0) ? -1 : index} // Api expects the "all" option to be -1
          >
            {name}
          </option>
        )
      }
    });

    return monthOptions
  }
}

const mapDispatch = {
  getTransactions: transactionActions.getTransactions,
}

const TimeFilterControl = connect(null, mapDispatch)(ConnectedTimeFilterControl);

export default TimeFilterControl;
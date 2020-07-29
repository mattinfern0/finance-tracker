import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {transactionActions, transViewActions} from '../../redux/actions';

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
    console.log("TimeFilterControl constructing")
    super(props);

    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();
   


    this.state = {
        monthValue: currentMonth,
        year: currentYear,
        yearValue: currentYear.toString(),
        monthDisabled: false // Dsiable if there is no year filter
    }

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleYearChange(e) {

    let newValue = e.target.value;
    console.log(newValue)
    if (newValue.length <= 4) {
      console.log("Running")
      this.setState({yearValue: newValue});
      let newFilter = {}

      const temp = moment(newValue, 'YYYY', true) // parse the value in strict mode to check if valid date
      if (newValue.length === 0) {
        this.setState({
          year: -1,
          monthDisabled: true
        });

        console.log(newFilter);
        this.props.getTransactions(newFilter);
      } else if (temp.isValid() && parseInt(newValue) !== this.state.year) {
        this.setState({
          year: newValue,
          monthDisabled: false
        });

        newFilter.year = parseInt(newValue);
        if (this.state.monthValue !== 0) {
          newFilter.month = this.state.monthValue;
        }

        console.log(newFilter);
        this.props.changeFilter(newFilter);
      }

     
    }
  }

  handleMonthChange(e) {
    console.log(this.state);
    let newValue = parseInt(e.target.value);

    this.setState({month : newValue});

    let newFilter = {};
    if (this.state.year !== -1) {
      newFilter.year = this.state.year;
    }

    // Don't add the new month value to the filter if option is "All"
    if (newValue !== 0) {
      newFilter.month = newValue;
    }
    console.log(newFilter);
    this.props.changeFilter(newFilter);
  }

  render() {
    return (
      <span>
        <select 
          label='Month'
          onChange={this.handleMonthChange}
          disabled={this.state.monthDisabled}
        >
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
      if (index===this.state.monthValue) {
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
            value={index}
          >
            {name}
          </option>
        )
      }
    });

    return monthOptions
  }
}

function mapStateToProps(state) {
  return {
    filterMonth: state.transView.filterMonth,
    filterYear: state.transView.filterYear
  }
}

const mapDispatch = {
  getTransactions: transactionActions.getTransactions,
  changeFilter: transViewActions.changeFilter,
}

const TimeFilterControl = connect(mapStateToProps, mapDispatch)(ConnectedTimeFilterControl);

export default TimeFilterControl;
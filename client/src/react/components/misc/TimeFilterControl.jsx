import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {transactionActions, transViewActions} from '../../../redux/actions';

const allMonthOption = 'All of'

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
   
    this.state = {
        yearValue: -1,

        monthDisabled: false, // Dsiable if there is no year filter
        yearInputFocused: false,

    }

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.getYearDisplayValue = this.getYearDisplayValue.bind(this);
  }

  handleYearChange(e) {

    let newValue = e.target.value;
    console.log(newValue)
    if (newValue.length <= 4) {
      console.log("Running")
      this.setState({yearValue: newValue});
      let newFilter = {
        month: this.props.filterMonth
      }

      const temp = moment(newValue, 'YYYY', true) // parse the value in strict mode to check if valid date
      if (newValue.length === 0) {
        this.setState({monthDisabled: true});

        newFilter.year = -1;
        this.props.changeFilter(newFilter);
      } else if (temp.isValid() && parseInt(newValue) !== this.props.filterYear) {
        this.setState({monthDisabled: false});

        newFilter.year = parseInt(newValue);

        this.props.changeFilter(newFilter);
      }
    }
  }

  handleMonthChange(e) {
    console.log(this.state);
    let newValue = parseInt(e.target.value);


    let newFilter = {
      year: this.props.filterYear
    };

    if (newValue === 0) {
      newFilter.month = -1;
    } else {
      newFilter.month = newValue;
    }

    console.log(newFilter);
    this.props.changeFilter(newFilter);
  }

  render() {
    return (
      <span className='form-time-filter'>
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
          value={this.getYearDisplayValue()}
          onChange={this.handleYearChange}
          onFocus={() => {this.setState({yearInputFocused : true, yearValue: this.props.filterYear})}}
          onBlur={() => {this.setState({yearInputFocused : false})}}
        >
        </input>
        {true && <span></span>}
      </span>
    )
  }

  getYearDisplayValue() {
    if (!this.state.yearInputFocused) {
      const filterYear = this.props.filterYear;

      // Convert -1 to empty string
      if (filterYear === -1) {
        return '';
      } else {
        return filterYear
      }
    } else {
      return this.yearValue;
    }
  }

  createMonthOptions() {
    const optionNames = [allMonthOption].concat(monthNames);
    const monthOptions = optionNames.map((name, index) => {
      if (index===this.props.filterMonth) {
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
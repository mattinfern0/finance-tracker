import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {transactionActions} from '../../redux/actions';

class ConnectedTimeFilterControl extends React.Component {
  constructor(props) {
    super(props);

    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();


    this.state = {
        month: -1,
        year: currentYear,
        yearValue: currentYear
    }

    this.handleYearChange = this.handleYearChange.bind(this);
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

  render() {
    return (
      <span>
        <select>

        </select>
        <input
          type='number'
          value={this.state.yearValue}
          onChange={this.handleYearChange}
          max={new Date().getFullYear()}
        >
        </input>
      </span>
    )
  }
}

const mapDispatch = {
  getTransactions: transactionActions.getTransactions,
}

const TimeFilterControl = connect(null, mapDispatch)(ConnectedTimeFilterControl);

export default TimeFilterControl;
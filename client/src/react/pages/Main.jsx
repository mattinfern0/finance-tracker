import React from 'react';
import { TransactionsView, Sidebar, Header } from '../layouts';

import { connect } from 'react-redux';
import { transactionActions, transViewActions } from '../../redux/actions';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Main extends React.Component {
  componentDidMount() {
    console.log("Main component mounted")

    const today = new Date();
    const newFilter = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    this.props.changeFilter(newFilter);

  }

  render() {
    return (
      <div className="wrapper-main">
        <Header />
        <Sidebar />
        <TransactionsView />
        <ToastContainer 
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={2}
          transition={Slide}
        />
      </div>
    );
  }
}

const mapDispatch = {
  getTransactions: transactionActions.getTransactions,
  changeFilter: transViewActions.changeFilter,
}



export default connect(null, mapDispatch)(Main);
import React, { useEffect } from 'react';
import { TransactionsView, Sidebar, Header } from '../layouts';

import { useDispatch } from 'react-redux';
import { transViewActions } from '../../redux/actions';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tracker() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Main component mounted")

    const today = new Date();
    const newFilter = {
      month: today.getMonth() + 1,
      year: today.getFullYear()
    };

    dispatch(transViewActions.changeFilter(newFilter));
  });

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

// export default connect(null, mapDispatch)(Main);
export default Tracker
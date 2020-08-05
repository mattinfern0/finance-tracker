import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { transViewActions } from '../../redux/actions';
import { MainLayout, TransactionsView } from '../layouts';

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
      <MainLayout>
          <TransactionsView />
      </MainLayout>
  );
}

// export default connect(null, mapDispatch)(Main);
export default Tracker
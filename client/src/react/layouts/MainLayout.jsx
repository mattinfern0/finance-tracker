import React from 'react';
import { Sidebar, Header } from '.';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout(props) {
  return (
    <div className="wrapper-main">
      <Header />
      <Sidebar />
      <div className="wrapper-content">
        {props.children}
      </div>
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
export default MainLayout
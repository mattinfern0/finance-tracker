import React, { useState } from 'react';
import './DropDownContainer.css'

/*
Props:
  buttonComponent
  contentComponent
  className
*/
function DropDownContainer(props) {
  const [contentVisible, setContentVisible] = useState(false);

  const onBtnClick = () => {
    setContentVisible(!contentVisible);
  }

  const theButton = React.cloneElement(
    props.buttonComponent,
    { onClick: onBtnClick },
  );  

  return (
    <div className={"drop-down ".concat(props.className)}>
      {theButton}
      {contentVisible && props.contentComponent}
    </div>
  );
}

export default DropDownContainer;

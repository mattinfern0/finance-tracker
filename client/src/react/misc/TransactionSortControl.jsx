import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { sortFuncs } from '../../utils';
import { transViewActions } from '../../redux/actions';

const optionInfo = [
  {name: 'Most Recent', func: sortFuncs.byNewestDate},
  {name: 'Oldest', func: sortFuncs.byOldestDate},
  {name: 'Least Expensive', func: sortFuncs.byCheapestAmount},
  {name: 'Most Expensive', func: sortFuncs.byMostExpensiveAmount},
];

function TransactionSortControl() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const sortFunc = optionInfo[e.target.value].func;
    console.log(sortFunc);
    setValue(e.target.value);
    dispatch(transViewActions.changeSortMethod(sortFunc));
  };

  const options = optionInfo.map((info, index) => {
    return (
      <option
        key={index}
        value={index}
      >
        {info.name}
      </option>
    )
  });

  return (
    <span>
      {'Sort By: '}
      <select value={value} onChange={onChange}>
        {options}
      </select>
    </span>
  );
}

export default TransactionSortControl;

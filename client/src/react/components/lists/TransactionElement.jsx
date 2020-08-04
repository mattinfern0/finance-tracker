import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionActions, transViewActions } from '../../../redux/actions';
import { EditTransaction } from '../forms'

function TransactionElement(props) {
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const isEditing = useSelector(state => state.transView.editing);
  const transaction = props.transaction;

  const handleEdit = () => {
    setShowEditForm(true);
    dispatch(transViewActions.editingOn());
  }

  const editRevert = () => {
    setShowEditForm(false);
    dispatch(transViewActions.editingOff());
  }

  const handleDelete = () => {
    dispatch(transactionActions.deleteTransaction(transaction.id));

  }

  let showButtonsFinal = showButtons && !isEditing;
  console.log(`showButtonsFinal; ${showButtonsFinal}`);
  console.log(`showButtons ${showButtons}`);
  console.log(`isEditing ${isEditing}`);

  if (showEditForm) {
    return (
      <div>
        <EditTransaction 
          initialTransInfo={transaction}
          revertFunc={editRevert}
        />
      </div>
    )
  }
  

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
    >
      <span className="transaction-amount">
        ${transaction.amount.toFixed(2)}
      </span>
      <span className="transaction-title">
        {transaction.title}
      </span>
      <span className="transaction-date">
        {transaction.date.format('M/D/YYYY')}
      </span>
      {showButtonsFinal && (
        <span>
          <button 
            type="button"
            className="button-edit"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button 
            type="button"
            className="button-delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </span>
      )}
    </div>
  );
}


export default TransactionElement;
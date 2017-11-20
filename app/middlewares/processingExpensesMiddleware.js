/**
 * Created by Aleksandr_Medvedev on 8/22/17.
 */

import { handleError } from './httpRequestMiddleware';
import { POLL_PROCESSING_EXPENSES_TIMEOUT } from 'app/constants/constants';

import * as ActionTypes from 'app/constants/actionTypes';
import * as ExpenseActions from 'app/actions/ExpenseActions';

// ========================================== //
// Middleware
// ========================================== //

export default store => next => action => {
  const { processingExpenses } = store.getState();
  if (action.type === ActionTypes.START_EXPENSES_PROCESSING_POLL && !processingExpenses.started) {
    // Should be asynchronous to proceed after start flag is set to true
    setTimeout(() => store.dispatch(ExpenseActions.pollExpenseProcessing()), 0);
    return next(action);
  }

  if (!processingExpenses.started || action.type !== ActionTypes.POLL_EXPENSES_PROCESSING) {
    return next(action);
  }

  const { processingList } = store.getState().expenseLoading;
  if (processingList && processingList.length) {
    let pollDataPromise = Promise.resolve(null);
    processingList.forEach(item => {
      pollDataPromise = pollDataPromise.then(
        () => store.dispatch(ExpenseActions.getExpenseByGuid(item))
      );
    });

    pollDataPromise = pollDataPromise.then(() => setTimeout(
      () => store.dispatch(ExpenseActions.pollExpenseProcessing()),
      POLL_PROCESSING_EXPENSES_TIMEOUT,
    ));
    pollDataPromise = pollDataPromise.catch(error => {
      store.dispatch(ExpenseActions.stopExpenseProcessingPoll());

      /**
       * There is a need in a synthetic action here, since there is no way to bring original action
       * to this stage.
       */
      const hackAction = ExpenseActions.getExpenseByGuid('hack');
      handleError(store)(hackAction)(error);
    });

    return pollDataPromise;
  } else {
    return store.dispatch(ExpenseActions.stopExpenseProcessingPoll());
  }

};

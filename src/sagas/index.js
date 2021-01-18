import { all, call, spawn } from 'redux-saga/effects';
import {
  watchEditReminder,
  watchNewReminder,
  watchSubmitReminder,
} from './reminder';

function* keepAlive(...sagas) {
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.groupCollapsed(
              `%cSaga ${saga.name} crashed and will be restarted...`,
              `
                font-size: 600;
                color: #DC2626;
                background-color: #FECACA;
                padding: 0.125rem 0.25rem;
                border-radius: 0.125rem;
              `
            );
            console.error(e);
            console.groupEnd();
          }
        }
      })
    )
  );
}

export default function* rootSaga() {
  const sagas = [
    watchNewReminder,
    watchEditReminder,
    watchSubmitReminder
  ];

  yield keepAlive(...sagas);
}

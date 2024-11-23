import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'store';

import { BrowserRouter as Router } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import calendarPlugin from 'dayjs/plugin/calendar';
import updateLocalePlugin from 'dayjs/plugin/updateLocale';

import 'dayjs/locale/ru';
import 'dayjs/locale/en';

import 'config/i18n';

import reportWebVitals from 'reportWebVitals';
import swConfig from 'serviceWorkerConfig';
import * as serviceWorker from 'serviceWorker';

import App from 'components/App';

import * as userSettingsUtils from 'utils/userSettings';

import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setReleaseInfo('MUI X cracked hahaha');
LicenseInfo.setLicenseKey('feel free to write here any bullshit you want');

const userSettings = userSettingsUtils.get();
dayjs.locale(userSettings.language || 'ru');
dayjs.extend(relativeTimePlugin);
dayjs.extend(calendarPlugin);
dayjs.extend(updateLocalePlugin);

dayjs.updateLocale('ru', {
  calendar: {
    lastWeek: 'D MMMM[, в ]HH:mm:ss',
    sameDay: '[Сегодня, в ]HH:mm:ss',
    lastDay: '[Вчера, в ]HH:mm:ss',
    sameElse: 'DD.MM.YYYY[ в ]HH:mm:ss',
  },
});
dayjs.updateLocale('en', {
  calendar: {
    lastWeek: 'D MMMM[, at ]hh:mm:ss A',
    sameDay: '[Today, at ]hh:mm:ss A',
    lastDay: '[Yesterday, at ]hh:mm:ss A',
    sameElse: 'MM/DD/YYYY[ at ]hh:mm:ss A',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
serviceWorker.register(swConfig);

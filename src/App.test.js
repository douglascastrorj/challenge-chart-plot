import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store';

import { generateChart } from './store/actions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});



it('test action creator', () => {
  const dispatch = jest.fn();
  generateChart([])(dispatch);
  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch).toHaveBeenCalledWith({
    type: 'generate_chart',
    payload: {
      done: false,
      chart: {}
    }
  });
});

it('test action creator', () => {
  const events = [{ "type": "start", "timestamp": 123, "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"] }, { "type": "span", "timestamp": 123, "start": 20, "end": 100 }, { "type": "data", "timestamp": 23, "os": "linux", "browser": "chrome", "min_response_time": 0.11, "max_response_time": 0.2 }, { "type": "data", "timestamp": 23, "os": "linux", "browser": "firefox", "min_response_time": 0.3, "max_response_time": 0.33 }, { "type": "data", "timestamp": 23, "os": "windows", "browser": "chrome", "min_response_time": 0.4, "max_response_time": 0.6 }]
  const dispatch = jest.fn();
  generateChart(events)(dispatch);
  expect(dispatch.mock.calls.length).toBe(1);

  const expected = {
    type: 'generate_chart',
    "payload": {
      "chart": {
        "series": [
          {
            "data": [
              0.11,
              0.2,
            ],
            "name": "linux chrome ",
          },
          {
            "data": [
              0.3,
              0.33,
            ],
            "name": "linux firefox ",
          },
          {
            "data": [
              0.4,
              0.6,
            ],
            "name": "windows chrome ",
          },
        ],
      },
      "done": false,
      "group": [
        "os",
        "browser",
      ],
      selectFunctions: [
        () => { },
        () => { },
      ],
      shouldAddEvent: (e) => false,
    },
  }
  const action = generateChart(events)

  expect(action(dispatch).payload.chart.series).toEqual(expected.payload.chart.series);

});
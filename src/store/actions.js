
const generateChart = events => (dispatch) => {

  console.log('events', JSON.stringify(events))
  const chartData = events.reduce((acc, event) => {
    if (acc.done) return acc;
    switch (event.type) {
      case 'start':
        acc.chart = { series: [] };
        acc.group = event.group;
        acc.selectFunctions = event.select.map(field => e => e[field]);
        break;
      case 'span':
        acc.shouldAddEvent = (e) => e.timestamp >= event.start && e.timestamp <= event.end;
        break;
      case 'data':
        if (acc.shouldAddEvent && acc.shouldAddEvent(event)) {
          let groupId = '';
          let serieLabel = ''
          for (let group of acc.group) {
            groupId += '@' + event[group];
            serieLabel += event[group] + ' ';
          }
          console.log(groupId);
          const serie = { name: serieLabel, data: [] }
          for (let func of acc.selectFunctions) {
            serie.data.push(func(event));
          }
          acc.chart.series.push(serie);
        }
        break;
      case 'stop':
        acc.done = true;
        break;
    }

    return acc;
  }, { chart: {}, done: false });

  const action = {
    type: 'generate_chart',
    payload: chartData
  };

  dispatch(action);
  return action;
  
}

export {generateChart};
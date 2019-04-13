import React, { Component } from 'react';
import './App.css';

import CodeEditor from './components/CodeEditor';
import Resizable from 'react-resizable-box';
import Chart from 'react-apexcharts'
import Footer from './components/Footer';
import Button from './components/Button'

class App extends Component {

  state = {
    height: 300,
    text: "{type:'start', timestamp: 123, select:['min_response_time', 'max_response_time'], group:['os', 'browser']}\n{type:'span', timestamp: 123, start:20, end: 100}\n{type:'data', timestamp: 23, os:'linux', browser:'chrome', min_response_time: 0.11, max_response_time: 0.2 }\n{type:'data', timestamp: 23, os:'linux', browser:'firefox', min_response_time: 0.3, max_response_time: 0.33 }\n{type:'data', timestamp: 23, os:'windows', browser:'chrome', min_response_time: 0.4, max_response_time: 0.6 }",
    chart: {
      options: {
        chart: {
          id: 'chart'
        },
        xaxis: {
          categories: ['00:00', '00:01']
        }
      },
      series: []
    }
  }


  codeRef = React.createRef();

  componentDidMount() {
    this.generateChart();
  }

  onResize = (event, direction, ref, delta) => {
    this.setState({ height: ref.style.height });
    this.codeRef.current.editor.resize()
  };

  onChange = (text) => {
    this.setState({ text });
  };

  generateChart = () => {
    const { text } = this.state;
    const events = text.split('\n').map( row => {
      let obj = {};
      try{
        eval('obj = ' + row)
      }catch(e){ }
      return obj;
    });

    const chartData = events.reduce( (acc, event) => {
      if(acc.done) return acc;
      switch(event.type){
        case 'start':
          acc.chart = {series: []};
          acc.group = event.group;
          acc.selectFunctions = event.select.map( field => e => e[field]);
          break;
        case 'span':
          acc.shouldAddEvent = (e) => e.timestamp >= event.start && e.timestamp <= event.end;
          break;
        case 'data': 
          if( acc.shouldAddEvent && acc.shouldAddEvent(event)){
            let groupId = '';
            let serieLabel = ''
            for( let group of acc.group){
              groupId += '@'+event[group];
              serieLabel += event[group] + ' ';
            }
            console.log(groupId);
            const serie = { name: serieLabel, data: []}
            for( let func of acc.selectFunctions){
              serie.data.push( func(event));
            }
            acc.chart.series.push(serie);
          }
          break;
        case 'stop':
          acc.done = true;
        break;
      }

      return acc;
    }, {chart:{}, done: false});

    console.log('chartData ',chartData);
    this.setState({chart:{...this.state.chart, series: chartData.chart.series}})
  }
  render() {
    return (
      <div className="App">

        <div className="container">
          <Resizable
            width='100%'
            height={this.state.height}
            maxHeight={500}
            minHeight={200}
            onResize={this.onResize}
          >
            <CodeEditor
              height={this.state.height}
              ref={this.codeRef}
              text={this.state.text}
              onChange={this.onChange}
            />

          </Resizable>

          <Chart options={this.state.chart.options} series={this.state.chart.series} type="line" width={800} height={320} />

        </div>


        <Footer>
          <Button
            style={{ marginLeft: '12px' }}
            onClick={this.generateChart}
          >
            generate chart
          </Button>
        </Footer>
      </div>
    );
  }
}

export default App;

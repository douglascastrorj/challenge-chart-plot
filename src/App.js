import React, { Component } from 'react';
import './App.css';

import CodeEditor from './components/CodeEditor';
import Resizable from 'react-resizable-box';
import Chart from 'react-apexcharts'

class App extends Component {

  state = {
    height: 500,
    text: "{type:'start', timestamp: '1231241251125'}",

    chart: {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Out']
        }
      },
      series: [{
        name: 'group-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: 'group-2',
        data: [21, 33, 42, 44, 49, 21, 44, 53]
      }]
    }
  }


  codeRef = React.createRef();

  onResize = (event, direction, ref, delta) => {
    this.setState({ height: ref.style.height });
    this.codeRef.current.editor.resize()
  };

  onChange = (text) => {
    this.setState({ text });
  };

  render() {
    return (
      <div className="App">

        <Resizable
          width='100%'
          height={this.state.height}
          onResize={this.onResize}
        >
          <CodeEditor
            height={this.state.height}
            ref={this.codeRef}
            text={this.state.text}
            onChange={this.onChange}
          />

        </Resizable>

        <Chart options={this.state.chart.options} series={this.state.chart.series} type="line" width={600} height={320} />
      </div>
    );
  }
}

export default App;

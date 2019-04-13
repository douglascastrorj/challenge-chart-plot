import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { generateChart } from './store/actions';

import CodeEditor from './components/CodeEditor';
import Resizable from 'react-resizable-box';
import Chart from 'react-apexcharts'
import Footer from './components/Footer';
import Button from './components/Button'

class App extends Component {

  state = {
    height: 300,
    text: "{type:'start', timestamp: 123, select:['min_response_time', 'max_response_time'], group:['os', 'browser']}\n{type:'span', timestamp: 123, start:20, end: 100}\n{type:'data', timestamp: 23, os:'linux', browser:'chrome', min_response_time: 0.11, max_response_time: 0.2 }\n{type:'data', timestamp: 23, os:'linux', browser:'firefox', min_response_time: 0.3, max_response_time: 0.33 }\n{type:'data', timestamp: 23, os:'windows', browser:'chrome', min_response_time: 0.4, max_response_time: 0.6 }",
  }

  codeRef = React.createRef();

  componentDidMount() {
    this.generateChart();
  };

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

    this.props.generateChart(events);
  };

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

          <Chart options={this.props.chart.options} series={this.props.chart.series} type="line" width={800} height={320} />

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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    generateChart: events => {
      dispatch(generateChart(events))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

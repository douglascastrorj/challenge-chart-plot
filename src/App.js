import React, { Component } from 'react';
import './App.css';

import Chart from 'react-apexcharts';
import Resizable from 'react-resizable-box';

import { connect } from 'react-redux';
import { generateChart } from './store/actions';

import CodeEditor from './components/CodeEditor';
import Footer from './components/Footer';
import Button from './components/Button';
import Header from './components/Header';
import Popup from './components/Popup';


class App extends Component {

  state = {
    height: 300,
    text: "{type:'start', timestamp: 123, select:['min_response_time', 'max_response_time'], group:['os', 'browser']}\n{type:'span', timestamp: 123, start:20, end: 100}\n{type:'data', timestamp: 23, os:'linux', browser:'chrome', min_response_time: 0.11, max_response_time: 0.2 }\n{type:'data', timestamp: 23, os:'linux', browser:'firefox', min_response_time: 0.3, max_response_time: 0.33 }\n{type:'data', timestamp: 23, os:'windows', browser:'chrome', min_response_time: 0.4, max_response_time: 0.6 }\n{type:'stop', timestamp: 1232}",
    showErrorPopup: false
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
    this.setState({ showErrorPopup: false });

    // const events = JSON.stringify(text);
    const events = text.split('\n').map(row => {
      let obj = {};
      try {
        eval('obj = ' + row)
      } catch (e) {
        console.log('erro no parser')
        this.setState({ showErrorPopup: true });
      }
      return obj;
    });

    this.props.generateChart(events);

  };

  render() {

    const { text, height, showErrorPopup } = this.state;

    return (
      <div className="App">

        {
          showErrorPopup &&
          <Popup
            closePopup={() => { 
              this.setState({showErrorPopup: false})
            }}
            title='Something went wrong with the input data.'
            text='Check if there are formatting errors on the input.'
          />
        }

        <Header title="Douglas Castro's Challenge" />

        <div className="container">
          <Resizable
            width='100%'
            height={height}
            maxHeight={460}
            minHeight={200}
            onResize={this.onResize}
          >
            <CodeEditor
              height={height}
              ref={this.codeRef}
              text={text}
              onChange={this.onChange}
            />

          </Resizable>

          <Chart
            options={this.props.chart.options}
            series={this.props.chart.series}
            type="line"
            width={800}
            height={300}
          />

        </div>


        <Footer>
          <Button
            style={{ marginLeft: '12px' }}
            onClick={this.generateChart}
          >
            GENERATE CHART
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

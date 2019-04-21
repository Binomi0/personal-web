import React from 'react';
import * as V from 'victory';
import moment from 'moment';

class CandlestickChart extends React.Component {
  state = {
    chartMin: 0,
    chartMax: 50000,
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.data.length) {
      const chartMin = nextProps.data.map((tick) => tick.low);
      const chartMax = nextProps.data.map((tick) => tick.high);
      const low = Math.min(...chartMin);
      const high = Math.max(...chartMax);

      if (high !== nextState.chartMax || low !== nextState.chartMin) {
        this.setState({ chartMax: high, chartMin: low });
      }
    }
  }

  render() {
    const { chartMax, chartMin } = this.state;
    // if (!this.props.data.length) {
    //   return 'Cargando';
    // }
    return (
      <div>
        <V.VictoryChart
          animate={{
            // duration: 2000,
            onLoad: { duration: 2000 },
          }}
          style={{
            parent: {
              margin: 0,
              padding: '0 1rem',
            },
          }}
          domainPadding={{ x: 100, y: 100 }}
          // polar={false}
          height={400}
          containerComponent={
            <V.VictoryZoomContainer
              zoomDomain={{
                x: [10, 60],
                y: [this.state.chartMin, this.state.chartMax],
              }}
            />
          }
          // containerComponent={<V.VictoryContainer responsive={false} />}
        >
          <V.VictoryAxis
            crossAxis={false}
            style={{
              axis: { stroke: '#ddd', fill: '#ddd' },
              axisLabel: { fontSize: 12, padding: 20, fill: '#444' },
              ticks: { stroke: 'black', size: 5 },
              tickLabels: { fontSize: 8, padding: 5, fill: '#8ee7ff' },
            }}
            label={moment().format('DD-MM-YYYY')}
          />
          <V.VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: '#8ee7ff', fill: '#282c33' },
              axisLabel: { fontSize: 9, padding: 30, fill: '#282c33' },
              ticks: { stroke: 'black', size: 5 },
              tickLabels: { fontSize: 9, padding: 5, fill: '#282c33' },
            }}
            // tickFormat={(t) => `${parseInt(t)}`}
          />
          {/* <V.VictoryAxis crossAxis dependentAxis /> */}
          <V.VictoryCandlestick
            containerComponent={<V.VictoryVoronoiContainer />}
            padding={0}
            domain={{
              x: [40, 100],
              y: [chartMin, chartMax],
            }}
            domainPadding={{ x: 20, y: 0 }}
            data={this.props.data}
          />
        </V.VictoryChart>
      </div>
    );
  }
}

export default CandlestickChart;

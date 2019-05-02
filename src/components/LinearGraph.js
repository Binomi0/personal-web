import React from 'react';
import * as V from 'victory';

class LinearGraph extends React.Component {
  render() {
    // if (!this.props.data.length) {
    //   return 'Cargando';
    // }
    return (
      <div>
        <V.VictoryChart
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            parent: {
              border: '1px solid #8ee7ff',
            },
          }}
          polar={false}
          height={200}
          containerComponent={<V.VictoryContainer responsive={true} />}
        >
          <V.VictoryAxis
            crossAxis
            style={{
              axis: { stroke: '#8ee7ff', fill: '#8ee7ff' },
              axisLabel: { fontSize: 12, padding: 25, fill: '#8ee7ff' },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: { fontSize: 12, padding: 5, fill: '#8ee7ff' },
            }}
            tickFormat={(t) => `${parseInt(t)}`}
            label="Operaciones"
          />
          <V.VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: '#8ee7ff', fill: '#8ee7ff' },
              axisLabel: { fontSize: 12, padding: 30, fill: '#8ee7ff' },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: { fontSize: 12, padding: 5, fill: '#8ee7ff' },
            }}
            tickFormat={(t) => `${parseInt(t)}`}
            label="€"
          />
          <V.VictoryLine
            style={{ data: { stroke: '#8ee7ff', strokeWidth: 1 } }}
            interpolation="linear"
            data={this.props.data || []}
          />
          <V.VictoryScatter
            data={this.props.data || []}
            size={this.props.data.length ? 1 : 1}
            style={{ data: { fill: '#8ee7ff' } }}
          />
        </V.VictoryChart>
      </div>
    );
  }
}

export default LinearGraph;

import React, { useMemo } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryArea,
  VictoryTooltip,
  createContainer,
  VictoryZoomContainerProps,
  VictoryVoronoiContainerProps,
  VictoryLabel,
} from 'victory';

interface ChartProps {
  /**
   * Chart Data
   */
  data: {
    date: Date,
    value: number,
    label: string,
  }[];
};

interface FlyoutProps {
  center?: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
};

const Flyout = ({ center, width, height }: FlyoutProps) => {
  if (!center || !width || !height) return null;

  const x = center.x - width / 2;
  const y = center.y - height / 2;

  return (
    <g filter='url(#drop_shadow_filter)'>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx='6'
        fill='#212120'
      />
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={width - 1}
        height={height - 1}
        fill='transparent'
        rx='5.5'
        stroke='url(#inner_border_gradient)'
        strokeWidth='1'
      />
    </g>
  );
};

const Chart = ({ data }: ChartProps) => {
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi') as
  React.ComponentType<VictoryVoronoiContainerProps & VictoryZoomContainerProps>;

  const initialZoomDomain: {x: [Date, Date]} = useMemo(() => ({
    x: [
      new Date(new Date().getTime() - 3600 * 24 * 1000),
      new Date(),
    ],
  }), [ data ]);

  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient
            gradientTransform='rotate(90)'
            id='yellow_black_gradient'
          >
            <stop offset='0%' stopColor='rgba(254, 242, 0, 0.3)'/>
            <stop offset='100%' stopColor='rgba(211, 255, 24, 0)'/>
          </linearGradient>
          <filter
            id='drop_shadow_filter'
            filterUnits="userSpaceOnUse" width="800" height="800"
          >
            <feDropShadow
              dx='4'
              dy='6'
              stdDeviation='10'
              floodColor='#000000'
              floodOpacity='0.5'
            />
          </filter>
          <linearGradient
            id='inner_border_gradient'
          >
            <stop offset='0%' stopColor='#00000000'/>
            <stop offset='50%' stopColor='#B9B9B980'/>
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        scale='time'
        containerComponent={
          <VictoryZoomVoronoiContainer
            zoomDimension='x'
            zoomDomain={initialZoomDomain}
          />
        }
        padding={{ left: 0, right: 0, bottom: 20, top: 30 }}
      >
        <VictoryAxis
          scale='time'
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: {
              fill: ({ tick }: {tick: Date}) => {
                return (
                  tick > new Date(2005, 1, 1) ?
                  'rgba(255, 255, 255, 0.5)' : '#FEF200'
                );
              },
              fontFamily: 'inherit',
              fontSize: 10,
            },
          }}
        />
        <VictoryArea
          labelComponent={
            <VictoryTooltip
              flyoutComponent={<Flyout />}
              labelComponent={
                <VictoryLabel
                  style={{
                    fill: '#ffffff',
                    fontSize: 12,
                    fontFamily: 'inherit',
                  }}
                />
              }
              constrainToVisibleArea
              flyoutPadding={{ top: 8, bottom: 8, right: 10, left: 10 }}
              flyoutStyle={{ padding: 10 }}
            />
          }
          style={{
            data: {
              stroke: '#FEF200',
              fill: 'url(#yellow_black_gradient)',
            },
          }}
          data={data}
          x='date'
          y='value'
        />
      </VictoryChart>
    </>
  );
};

export default Chart;

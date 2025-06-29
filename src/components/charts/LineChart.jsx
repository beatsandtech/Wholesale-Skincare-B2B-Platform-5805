import React from 'react';
import { motion } from 'framer-motion';

function LineChart({ data, width = 400, height = 200, color = '#4a8f4a', showGrid = true }) {
  if (!data || data.length === 0) return null;

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate min/max values
  const values = data.map(d => d.value || d.revenue || d.orders || 0);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  // Generate path
  const pathData = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((item.value || item.revenue || item.orders || 0) - minValue) / valueRange * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate area path
  const areaPath = pathData + 
    ` L ${padding + chartWidth} ${padding + chartHeight}` +
    ` L ${padding} ${padding + chartHeight} Z`;

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {/* Horizontal grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={padding}
                y1={padding + (i * chartHeight / 4)}
                x2={padding + chartWidth}
                y2={padding + (i * chartHeight / 4)}
                stroke="#9ca3af"
                strokeWidth="1"
              />
            ))}
            {/* Vertical grid lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={padding + (i * chartWidth / 5)}
                y1={padding}
                x2={padding + (i * chartWidth / 5)}
                y2={padding + chartHeight}
                stroke="#9ca3af"
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Area fill */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          d={areaPath}
          fill={color}
        />

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y = padding + chartHeight - ((item.value || item.revenue || item.orders || 0) - minValue) / valueRange * chartHeight;
          
          return (
            <motion.circle
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:r-6 transition-all"
            >
              <title>{`${item.label || item.month || item.date}: ${item.value || item.revenue || item.orders}`}</title>
            </motion.circle>
          );
        })}

        {/* Y-axis labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const value = maxValue - (i * valueRange / 4);
          const y = padding + (i * chartHeight / 4);
          
          return (
            <text
              key={`y-label-${i}`}
              x={padding - 10}
              y={y + 5}
              textAnchor="end"
              className="text-xs fill-earth-600"
            >
              {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)}
            </text>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          if (index % Math.ceil(data.length / 6) !== 0) return null;
          
          const x = padding + (index / (data.length - 1)) * chartWidth;
          
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-earth-600"
            >
              {item.label || item.month || item.date?.slice(-2)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default LineChart;
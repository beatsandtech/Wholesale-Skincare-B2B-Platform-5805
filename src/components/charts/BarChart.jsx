import React from 'react';
import { motion } from 'framer-motion';

function BarChart({ data, width = 400, height = 200, color = '#4a8f4a' }) {
  if (!data || data.length === 0) return null;

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const values = data.map(d => d.value || d.revenue || d.count || 0);
  const maxValue = Math.max(...values);

  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        <g className="opacity-20">
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={padding + (i * chartHeight / 4)}
              x2={padding + chartWidth}
              y2={padding + (i * chartHeight / 4)}
              stroke="#9ca3af"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Bars */}
        {data.map((item, index) => {
          const value = item.value || item.revenue || item.count || 0;
          const barHeight = (value / maxValue) * chartHeight;
          const x = padding + index * (chartWidth / data.length) + barSpacing / 2;
          const y = padding + chartHeight - barHeight;

          return (
            <motion.rect
              key={index}
              initial={{ height: 0, y: padding + chartHeight }}
              animate={{ height: barHeight, y }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx="4"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <title>{`${item.label || item.category}: ${value}`}</title>
            </motion.rect>
          );
        })}

        {/* Value labels on bars */}
        {data.map((item, index) => {
          const value = item.value || item.revenue || item.count || 0;
          const barHeight = (value / maxValue) * chartHeight;
          const x = padding + index * (chartWidth / data.length) + barSpacing / 2 + barWidth / 2;
          const y = padding + chartHeight - barHeight - 5;

          return (
            <motion.text
              key={`label-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
              x={x}
              y={y}
              textAnchor="middle"
              className="text-xs fill-earth-700 font-medium"
            >
              {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}
            </motion.text>
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = padding + index * (chartWidth / data.length) + barSpacing / 2 + barWidth / 2;
          
          return (
            <text
              key={`x-${index}`}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-earth-600"
            >
              {item.label || item.category || item.name}
            </text>
          );
        })}

        {/* Y-axis labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const value = maxValue - (i * maxValue / 4);
          const y = padding + (i * chartHeight / 4);
          
          return (
            <text
              key={`y-${i}`}
              x={padding - 10}
              y={y + 5}
              textAnchor="end"
              className="text-xs fill-earth-600"
            >
              {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default BarChart;
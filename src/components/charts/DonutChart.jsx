import React from 'react';
import { motion } from 'framer-motion';

function DonutChart({ data, width = 200, height = 200, innerRadius = 60 }) {
  if (!data || data.length === 0) return null;

  const radius = Math.min(width, height) / 2 - 10;
  const centerX = width / 2;
  const centerY = height / 2;

  const total = data.reduce((sum, item) => sum + (item.value || item.percentage || 0), 0);
  
  const colors = [
    '#4a8f4a', // forest
    '#b89b7e', // earth
    '#658865', // sage
    '#d8825e', // terracotta
    '#e2d1b3', // cream
    '#6fad6f', // light forest
    '#c8b299', // light earth
  ];

  let currentAngle = -90; // Start from top

  const createPath = (startAngle, endAngle, outerRadius, innerRadius) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + outerRadius * Math.cos(startAngleRad);
    const y1 = centerY + outerRadius * Math.sin(startAngleRad);
    const x2 = centerX + outerRadius * Math.cos(endAngleRad);
    const y2 = centerY + outerRadius * Math.sin(endAngleRad);

    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", x1, y1,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, x2, y2,
      "L", x3, y3,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, x4, y4,
      "Z"
    ].join(" ");
  };

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {data.map((item, index) => {
          const value = item.value || item.percentage || 0;
          const percentage = (value / total) * 100;
          const angle = (value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          currentAngle += angle;

          const path = createPath(startAngle, endAngle, radius, innerRadius);
          const color = colors[index % colors.length];

          // Calculate label position
          const labelAngle = (startAngle + endAngle) / 2;
          const labelRadius = (radius + innerRadius) / 2;
          const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
          const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

          return (
            <g key={index}>
              <motion.path
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                d={path}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <title>{`${item.label || item.category}: ${percentage.toFixed(1)}%`}</title>
              </motion.path>
              
              {percentage > 5 && (
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-white font-medium"
                >
                  {percentage.toFixed(0)}%
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold fill-earth-800"
        >
          {total > 1000 ? `${(total / 1000).toFixed(1)}k` : total}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-earth-600"
        >
          Total
        </text>
      </svg>
    </div>
  );
}

export default DonutChart;
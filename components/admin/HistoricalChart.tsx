"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { useTheme } from "next-themes";
import { Calendar } from "lucide-react";

// Mock historical data mapping 6 months of visitor trends
const data = [
  { name: "Oct", visitors: 450, event: null },
  { name: "Nov", visitors: 580, event: "LinkedIn Post" },
  { name: "Dec", visitors: 480, event: null },
  { name: "Jan", visitors: 820, event: "Applied to Role" },
  { name: "Feb", visitors: 650, event: null },
  { name: "Mar", visitors: 1100, event: "Portfolio Launch" },
];

export default function HistoricalChart() {
  const { theme } = useTheme();
  
  // Choose colors based on theme, fallback to dark mode colors
  const strokeColor = theme === "light" ? "#6366f1" : "#818cf8"; // indigo-500 or indigo-400
  const gridColor = theme === "light" ? "#e5e7eb" : "#374151"; // gray-200 or gray-700
  const textColor = theme === "light" ? "#6b7280" : "#9ca3af"; // gray-500 or gray-400

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-card border border-border p-3 rounded-xl shadow-xl flex flex-col gap-1">
          <p className="text-sm font-bold text-foreground">{label}</p>
          <p className="text-xs text-indigo-500 font-mono">
             {payload[0].value} visitors
          </p>
          {dataPoint.event && (
            <div className="mt-1 bg-indigo-500/10 text-indigo-500 text-[10px] px-2 py-1 rounded border border-indigo-500/20 font-medium">
              🎯 {dataPoint.event}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-8 z-10">
        <div>
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <Calendar size={18} className="text-muted-foreground" />
            Historical Growth & Milestones
          </h3>
          <p className="text-xs text-muted-foreground">6-month visitor trends (Interactive)</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke={textColor} 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke={textColor} 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke={strokeColor}
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "var(--background)" }}
              activeDot={{ r: 6, stroke: strokeColor, strokeWidth: 2, fill: "var(--background)" }}
              animationDuration={1500}
            />
            {/* Render milestone dots on top of the line */}
            {data.map((entry, index) => {
              if (entry.event) {
                return (
                  <ReferenceDot 
                    key={`dot-${index}`} 
                    x={entry.name} 
                    y={entry.visitors} 
                    r={8} 
                    fill={strokeColor} 
                    stroke="var(--background)" 
                    strokeWidth={2} 
                  />
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

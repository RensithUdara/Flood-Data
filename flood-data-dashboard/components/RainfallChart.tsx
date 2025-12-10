'use antml client';

import { GaugeRecord } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RainfallChartProps {
  gauge: GaugeRecord | null;
  records?: GaugeRecord[];
}

export default function RainfallChart({
  gauge,
  records = [],
}: RainfallChartProps) {
  const data = gauge
    ? [
        {
          name: gauge.gauge || 'Unknown',
          rainfall: gauge.rain_fall || 0,
        },
      ]
    : records
        .filter((r) => r.rain_fall)
        .slice(0, 10)
        .map((r) => ({
          name: r.gauge || 'Unknown',
          rainfall: r.rain_fall || 0,
        }));

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
      <h2 className="text-lg font-bold mb-4">
        {gauge
          ? `Rainfall - ${gauge.gauge}`
          : 'Rainfall Levels - Top 10 Stations'}
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" angle={-45} height={80} />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#06b6d4"
              strokeWidth={2}
              name="Rainfall (mm)"
              dot={{ fill: '#06b6d4', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center text-slate-400">
          No data available
        </div>
      )}
    </div>
  );
}

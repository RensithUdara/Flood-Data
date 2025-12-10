'use client';

import { GaugeRecord } from '@/lib/types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface WaterLevelChartProps {
    gauge: GaugeRecord | null;
    records?: GaugeRecord[];
}

export default function WaterLevelChart({
    gauge,
    records = [],
}: WaterLevelChartProps) {
    const data = gauge
        ? [
            {
                name: gauge.gauge || 'Unknown',
                waterLevel: gauge.water_level || 0,
                alert: gauge.alertpull || 0,
                minor: gauge.minorpull || 0,
                major: gauge.majorpull || 0,
            },
        ]
        : records
            .filter((r) => r.water_level)
            .slice(0, 10)
            .map((r) => ({
                name: r.gauge || 'Unknown',
                waterLevel: r.water_level || 0,
            }));

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
            <h2 className="text-lg font-bold mb-4">
                {gauge
                    ? `Water Level - ${gauge.gauge}`
                    : 'Water Levels - Top 10 Stations'}
            </h2>

            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
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
                        <Bar dataKey="waterLevel" fill="#3b82f6" name="Current Level (m)" />
                        {gauge && (
                            <>
                                <Bar dataKey="alert" fill="#eab308" name="Alert Level" />
                                <Bar dataKey="minor" fill="#f97316" name="Minor Level" />
                                <Bar dataKey="major" fill="#ef4444" name="Major Level" />
                            </>
                        )}
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-80 flex items-center justify-center text-slate-400">
                    No data available
                </div>
            )}
        </div>
    );
}

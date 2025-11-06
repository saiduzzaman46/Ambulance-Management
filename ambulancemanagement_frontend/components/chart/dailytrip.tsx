import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DailyTripsData = {
  date: string;
  trips: number;
};

export const DailyTripsChart = () => {
  const [data, setData] = useState<DailyTripsData[]>([]);

  useEffect(() => {
    // Mock API data
    const mockData: DailyTripsData[] = [
      { date: "2025-09-10", trips: 5 },
      { date: "2025-09-11", trips: 8 },
      { date: "2025-09-12", trips: 6 },
      { date: "2025-09-13", trips: 10 },
      { date: "2025-09-14", trips: 4 },
      { date: "2025-09-15", trips: 7 },
      { date: "2025-09-16", trips: 9 },
      { date: "2025-09-17", trips: 11 },
      { date: "2025-09-18", trips: 3 },
      { date: "2025-09-19", trips: 8 },
      { date: "2025-09-20", trips: 6 },
    ];
    setData(mockData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 12 }}
          label={{
            value: "Trips",
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="trips" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
};

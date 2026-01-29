import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  drinks: { label: "Drinks", color: "var(--chart-1)" },
  avgRating: { label: "Avg Rating", color: "var(--chart-2)" },
};

const ChartLineMultiple = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Drinks & Rating</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 5]}
              tickLine={false}
              axisLine={false}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Line
              yAxisId="left"
              dataKey="drinks"
              type="monotone"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />

            <Line
              yAxisId="right"
              dataKey="avgRating"
              type="monotone"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Drinks per month + average rating per month.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChartLineMultiple;
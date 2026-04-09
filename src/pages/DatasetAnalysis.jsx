// src/pages/DatasetAnalysis.jsx
// ─────────────────────────────────────────────────────────────────────────────
// TODO: Replace all hardcoded chart data (imported from @/data/chartData.js)
//       with real dataset values fetched from your backend API or CSV parser.
// ─────────────────────────────────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import {
  ageGroupData,
  classDistributionData,
  phqTrendData,
  symptomsData,
  PIE_COLORS,
  CHART_COLORS,
} from "@/data/chartData";
import { BarChart3, PieChart as PieIcon, TrendingUp, Activity } from "lucide-react";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DatasetAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-r from-[hsl(var(--calm)/0.06)] via-muted/20 to-[hsl(var(--hope)/0.06)] py-14">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Badge variant="secondary" className="mb-4">Dataset Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Depression Dataset Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring patterns from our curated dataset of 1,000 survey respondents.
            All visualizations use placeholder data — real dataset integration is in progress.
          </p>
        </div>
      </section>

      {/* Charts grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Chart 1 — Bar: Age Group */}
          <Card className="border-border/60 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Age Distribution</span>
              </div>
              <CardTitle className="text-lg">Depression by Age Group</CardTitle>
              <CardDescription>% of respondents classified as depressed vs. not depressed per age bracket</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={ageGroupData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="ageGroup" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} unit="%" />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="depressed" name="Depressed" fill={CHART_COLORS.depressed} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nonDepressed" name="Not Depressed" fill={CHART_COLORS.nonDepressed} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 2 — Pie: Class distribution */}
          <Card className="border-border/60 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <PieIcon className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Class Balance</span>
              </div>
              <CardTitle className="text-lg">Dataset Class Distribution</CardTitle>
              <CardDescription>Proportion of depressed vs. non-depressed records in the dataset</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={classDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={110}
                    dataKey="value"
                  >
                    {classDistributionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => value} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 3 — Line: PHQ score trend */}
          <Card className="border-border/60 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Score Trends</span>
              </div>
              <CardTitle className="text-lg">Average PHQ-9 Score Over Time</CardTitle>
              <CardDescription>Monthly average symptom severity score across all respondents</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={phqTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} domain={[5, 12]} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    name="Avg Score"
                    stroke={CHART_COLORS.line}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.line, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 4 — Bar: Symptoms */}
          <Card className="border-border/60 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Symptom Frequency</span>
              </div>
              <CardTitle className="text-lg">Most Common Symptoms</CardTitle>
              <CardDescription>Frequency count of reported symptoms across the depressed cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={symptomsData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="symptom" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="count" name="Count" fill={CHART_COLORS.symptoms} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* Dataset info */}
        <div className="mx-auto max-w-6xl px-6 mt-8">
          <Card className="border-dashed border-amber-500/40 bg-amber-500/5">
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-amber-600 dark:text-amber-400">
                <strong>📊 Note:</strong> All charts above use hardcoded placeholder data for demonstration purposes.
                {/* TODO: Replace with real dataset API call or CSV import */}
                Real dataset integration will replace these values once the data pipeline is connected.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

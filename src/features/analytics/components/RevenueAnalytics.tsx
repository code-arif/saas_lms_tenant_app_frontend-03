import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useRevenueAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatsCard from '@/features/dashboard/components/StatsCard';
import { DollarSign, TrendingUp, Calendar, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

const RevenueAnalytics = () => {
  const { data: response, isLoading } = useRevenueAnalytics();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats = response?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats?.total_revenue || 0)}
          icon={DollarSign}
        />
        <StatsCard
          title="MRR"
          value={formatCurrency(stats?.mrr || 0)}
          icon={TrendingUp}
        />
        <StatsCard
          title="ARR"
          value={formatCurrency(stats?.arr || 0)}
          icon={Calendar}
        />
        <StatsCard
          title="Churn Rate"
          value={`${stats?.churn_rate?.toFixed(1) || 0}%`}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Month</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.revenue_by_month || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `$${value / 100}`} />
                <Tooltip formatter={(value) => [`$${Number(value) / 100}`, 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Course</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.revenue_by_course || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="course" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(value) => `$${value / 100}`} />
                <Tooltip formatter={(value) => [`$${Number(value) / 100}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
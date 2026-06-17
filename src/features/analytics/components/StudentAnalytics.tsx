import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useStudentAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatsCard from '@/features/dashboard/components/StatsCard';
import { Users, UserCheck, UserPlus, GraduationCap } from 'lucide-react';

const StudentAnalytics = () => {
  const { data: response, isLoading } = useStudentAnalytics();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats = response?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={stats?.total_students || 0}
          icon={Users}
        />
        <StatsCard
          title="Active Students"
          value={stats?.active_students || 0}
          icon={UserCheck}
        />
        <StatsCard
          title="New This Month"
          value={stats?.new_students_this_month || 0}
          icon={UserPlus}
        />
        <StatsCard
          title="Completion Rate"
          value={`${stats?.completion_rate?.toFixed(1) || 0}%`}
          icon={GraduationCap}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.enrollment_trend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students by Country</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.students_by_country || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAnalytics;
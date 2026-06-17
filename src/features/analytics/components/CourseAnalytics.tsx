import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useCourseAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatsCard from '@/features/dashboard/components/StatsCard';
import { BookOpen, Star, Users, TrendingUp } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#6b7280'];

const CourseAnalytics = () => {
  const { data: response, isLoading } = useCourseAnalytics();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats = response?.data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Courses"
          value={stats?.total_courses || 0}
          icon={BookOpen}
        />
        <StatsCard
          title="Published"
          value={stats?.published_courses || 0}
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Enrollments"
          value={stats?.total_enrollments || 0}
          icon={Users}
        />
        <StatsCard
          title="Avg. Rating"
          value={stats?.avg_rating?.toFixed(1) || '0.0'}
          icon={Star}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.courses_by_status || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: any) => `${name || ''}: ${value || 0}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(stats?.courses_by_status || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Courses by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.top_courses || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="title" tick={{ fontSize: 10 }} />
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

export default CourseAnalytics;
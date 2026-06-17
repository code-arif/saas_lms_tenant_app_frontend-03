import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  DollarSign,
} from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StatsCard from '@/features/dashboard/components/StatsCard';
import RevenueChart from '@/features/dashboard/components/RevenueChart';
import EnrollmentChart from '@/features/dashboard/components/EnrollmentChart';
import RecentActivity from '@/features/dashboard/components/RecentActivity';
import { useDashboard, generateEnrollmentData } from '@/features/dashboard/hooks/useDashboard';
import { formatCurrency } from '@/utils/formatCurrency';
import { Card, CardContent } from '@/components/ui/Card';

const DashboardPage = () => {
  const { data: response, isLoading } = useDashboard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats = response?.data;

  const cards = [
    { 
      title: 'Total Courses', 
      value: stats?.total_courses || 0, 
      icon: BookOpen, 
    },
    { 
      title: 'Total Students', 
      value: stats?.total_students || 0, 
      icon: Users, 
    },
    { 
      title: 'Total Instructors', 
      value: stats?.total_instructors || 0, 
      icon: GraduationCap, 
    },
    { 
      title: 'Total Revenue', 
      value: formatCurrency(stats?.total_revenue || 0), 
      icon: DollarSign, 
    },
  ];

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Dashboard" 
        description="Welcome back! Here's what's happening with your learning platform."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <RevenueChart data={stats?.monthly_revenue || []} />
        </div>

        <div className="lg:col-span-3">
          <RecentActivity activities={stats?.recent_enrollments || []} />
        </div>
      </div>

      <EnrollmentChart data={generateEnrollmentData()} />

      {stats?.subscription_status && stats.subscription_status !== 'active' && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
              </div>
              <div>
                <p className="font-medium">Subscription Alert</p>
                <p className="text-sm text-muted-foreground">
                  Your subscription status is: {stats.subscription_status}. 
                  <a href="/subscription" className="text-primary hover:underline ml-1">
                    View details
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
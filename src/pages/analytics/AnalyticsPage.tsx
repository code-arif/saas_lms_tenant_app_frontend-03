import PageTitle from '@/components/common/PageTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import CourseAnalytics from '@/features/analytics/components/CourseAnalytics';
import StudentAnalytics from '@/features/analytics/components/StudentAnalytics';
import RevenueAnalytics from '@/features/analytics/components/RevenueAnalytics';

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <PageTitle 
        title="Analytics" 
        description="Track and analyze your platform's performance."
      />

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseAnalytics />
        </TabsContent>

        <TabsContent value="students">
          <StudentAnalytics />
        </TabsContent>

        <TabsContent value="revenue">
          <RevenueAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
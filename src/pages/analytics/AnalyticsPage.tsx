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
        <TabsList className="w-full sm:w-auto overflow-x-auto flex-nowrap">
          <TabsTrigger value="courses" className="flex-1 sm:flex-none">Courses</TabsTrigger>
          <TabsTrigger value="students" className="flex-1 sm:flex-none">Students</TabsTrigger>
          <TabsTrigger value="revenue" className="flex-1 sm:flex-none">Revenue</TabsTrigger>
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { timeAgo } from '@/utils/formatDate';

interface Activity {
  student_name: string;
  course_title: string;
  enrolled_at: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">
              No recent activity
            </p>
          ) : (
            activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium">
                    {activity.student_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.student_name}</span>
                    {' '}enrolled in{' '}
                    <span className="font-medium">{activity.course_title}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {timeAgo(activity.enrolled_at)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
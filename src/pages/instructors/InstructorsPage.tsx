import { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/AlertDialog';
import PageTitle from '@/components/common/PageTitle';
import InstructorTable from '@/features/instructors/components/InstructorTable';
import InviteInstructor from '@/features/instructors/components/InviteInstructor';
import { useInstructors } from '@/features/instructors/hooks/useInstructors';

const InstructorsPage = () => {
  const { instructors, isLoading, removeInstructor, isRemoving } = useInstructors();
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const handleRemove = async () => {
    if (selectedUuid) {
      await removeInstructor(selectedUuid);
      setSelectedUuid(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Instructors" 
        description="Manage instructors on your platform."
      >
        <InviteInstructor />
      </PageTitle>
      
      <InstructorTable 
        instructors={instructors} 
        isLoading={isLoading}
        onRemove={setSelectedUuid}
        isRemoving={isRemoving}
      />

      <AlertDialog open={!!selectedUuid} onOpenChange={() => setSelectedUuid(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Instructor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this instructor? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InstructorsPage;
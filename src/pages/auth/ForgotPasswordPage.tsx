import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot password?</h1>
        <p className="text-muted-foreground">
          No worries. Enter your email and we'll send you a reset link.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;

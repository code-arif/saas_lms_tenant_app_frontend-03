import LoginForm from '@/features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Tenant Login</h1>
        <p className="text-muted-foreground">
          Enter your credentials to manage your learning platform
        </p>
      </div>
      <LoginForm />
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="#" className="text-primary hover:underline font-medium">
          Contact administrator
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
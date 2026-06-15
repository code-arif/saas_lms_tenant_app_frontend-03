import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import LoginForm from '@/features/auth/components/LoginForm';
import MagicLoginForm from '@/features/auth/components/MagicLoginForm';

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Tenant Login</h1>
        <p className="text-muted-foreground">
          Sign in to manage your learning platform
        </p>
      </div>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="otp">OTP / Magic Link</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <LoginForm />
        </TabsContent>
        <TabsContent value="otp">
          <MagicLoginForm />
        </TabsContent>
      </Tabs>

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
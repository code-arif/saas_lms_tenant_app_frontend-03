import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import LoginForm from '@/features/auth/components/LoginForm';
import MagicLoginForm from '@/features/auth/components/MagicLoginForm';
import { ROUTES } from '@/constants/routes';

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
        <TabsList className="flex w-full">
          <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
          <TabsTrigger value="otp" className="flex-1">OTP / Magic Link</TabsTrigger>
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
        <Link 
          to={ROUTES.CONTACT_ADMIN} 
          className="text-primary hover:underline font-medium"
        >
          Contact administrator
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
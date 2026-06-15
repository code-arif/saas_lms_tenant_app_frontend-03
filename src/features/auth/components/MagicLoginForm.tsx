import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useMagicLogin } from '../hooks/useMagicLogin';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const MagicLoginForm = () => {
  const { step, email, requestOtp, verifyOtp, reset, isSendingOtp, isVerifyingOtp } =
    useMagicLogin();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onEmailSubmit = (data: EmailFormValues) => {
    requestOtp(data.email);
  };

  const onOtpSubmit = (data: OtpFormValues) => {
    verifyOtp(data.otp);
  };

  if (step === 'otp') {
    return (
      <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <p className="text-sm text-muted-foreground">
            A 6-digit code was sent to <span className="font-medium text-foreground">{email}</span>
          </p>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            maxLength={6}
            className={`text-center text-2xl tracking-[0.5em] font-mono ${
              otpForm.formState.errors.otp ? 'border-destructive' : ''
            }`}
            {...otpForm.register('otp')}
          />
          {otpForm.formState.errors.otp && (
            <p className="text-sm text-destructive">
              {otpForm.formState.errors.otp.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isVerifyingOtp}>
          {isVerifyingOtp ? 'Verifying...' : 'Verify & Sign in'}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={reset}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Use a different email
          </button>
          <button
            type="button"
            onClick={() => requestOtp(email)}
            disabled={isSendingOtp}
            className="text-primary hover:underline disabled:opacity-50"
          >
            Resend code
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...emailForm.register('email')}
          className={emailForm.formState.errors.email ? 'border-destructive' : ''}
        />
        {emailForm.formState.errors.email && (
          <p className="text-sm text-destructive">{emailForm.formState.errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSendingOtp}>
        {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        We'll send a one-time passcode to your email. No password needed.
      </p>
    </form>
  );
};

export default MagicLoginForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { ROUTES } from '@/constants/routes';

const ContactAdminPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email or save to a database
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Message Sent</h1>
          <p className="text-muted-foreground">
            Thank you for contacting us. An administrator will get back to you shortly.
          </p>
        </div>
        <Button 
          className="w-full" 
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Contact Admin</h1>
        <p className="text-muted-foreground">
          Need help? Send a message to the platform administrator.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="How can we help?" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea 
            id="message" 
            placeholder="Describe your issue or request..." 
            className="min-h-[120px]"
            required 
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ContactAdminPage;

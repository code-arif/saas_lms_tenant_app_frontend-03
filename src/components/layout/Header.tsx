import { Bell, Search, User, Menu, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/ui/Button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
        <div className="hidden sm:flex w-full max-w-md items-center gap-2 px-3 py-1.5 rounded-md bg-muted border">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input 
            type="text" 
            placeholder="Search courses, students..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          disabled
        >
          <Search size={18} />
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary border-2 border-card" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-muted-foreground mt-1">No new notifications</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'flex items-center gap-3 pl-2 md:pl-4 py-1.5 pr-2 rounded-lg border-l',
                'bg-muted/30 hover:bg-muted/60 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center overflow-hidden border shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <User size={18} className="text-muted-foreground" />
                )}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(ROUTES.SETTINGS)} className="gap-3 cursor-pointer">
              <User size={16} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(ROUTES.SETTINGS)} className="gap-3 cursor-pointer">
              <Settings size={16} />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="gap-3 cursor-pointer text-destructive focus:text-destructive">
              <LogOut size={16} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
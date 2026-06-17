import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Palette,
  X
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useUIStore } from '@/store/uiStore';

const Sidebar = () => {
  const { sidebarCollapsed: collapsed, toggleSidebar } = useUIStore();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Courses', icon: BookOpen, href: '/courses' },
    { label: 'Instructors', icon: GraduationCap, href: '/instructors' },
    { label: 'Students', icon: Users, href: '/students' },
    { label: 'Analytics', icon: BarChart3, href: '/analytics' },
    { label: 'Subscription', icon: CreditCard, href: '/subscription' },
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Branding', icon: Palette, href: '/settings/branding' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden",
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={toggleSidebar}
      />

      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
          collapsed ? "md:w-20 max-md:-translate-x-full" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && <span className="text-xl font-bold">LMS Tenant</span>}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-muted"
          >
            {collapsed && <ChevronRight size={20} className="hidden md:block" />}
            {!collapsed && <ChevronLeft size={20} className="hidden md:block" />}
            <X size={20} className="md:hidden" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    useUIStore.getState().setSidebarCollapsed(true);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 px-3 py-2 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
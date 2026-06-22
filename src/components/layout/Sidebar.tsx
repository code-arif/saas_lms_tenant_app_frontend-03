import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap, 
  BarChart3, 
  CreditCard, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Palette,
  X,
  ChevronDown,
  FolderOpen
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/store/uiStore';
import { ROUTES } from '@/constants/routes';

const Sidebar = () => {
  const { sidebarCollapsed: collapsed, toggleSidebar } = useUIStore();
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = useState(
    location.pathname.startsWith('/courses')
  );

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: ROUTES.DASHBOARD },
    { label: 'Instructors', icon: GraduationCap, href: ROUTES.INSTRUCTORS },
    { label: 'Students', icon: Users, href: ROUTES.STUDENTS },
    { label: 'Analytics', icon: BarChart3, href: ROUTES.ANALYTICS },
    { label: 'Subscription', icon: CreditCard, href: ROUTES.SUBSCRIPTION },
    { label: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
    { label: 'Branding', icon: Palette, href: ROUTES.BRANDING },
  ];

  const coursesSubItems = [
    { label: 'Course Category', icon: FolderOpen, href: ROUTES.COURSE_CATEGORIES },
    { label: 'Courses', icon: BookOpen, href: ROUTES.COURSES },
  ];

  const isCoursesActive = location.pathname.startsWith('/courses');

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
          {/* Regular nav items */}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== ROUTES.DASHBOARD && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => {
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

          {/* Courses collapsible section */}
          <div>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isCoursesActive && !collapsed
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <BookOpen size={20} />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Courses</span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'transition-transform duration-200',
                      coursesOpen && 'rotate-180'
                    )}
                  />
                </>
              )}
            </button>

            {/* Sub-items with slide animation */}
            <AnimatePresence initial={false}>
              {!collapsed && coursesOpen && (
                <motion.div
                  key="courses-sub"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                >
                  <div className="mt-1 ml-4 space-y-1 border-l border-border pl-2">
                    {coursesSubItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ x: -8, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.15, delay: 0.05 }}
                        >
                          <Link
                            to={item.href}
                            onClick={() => {
                              if (window.innerWidth < 768) {
                                useUIStore.getState().setSidebarCollapsed(true);
                              }
                            }}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

      </aside>
    </>
  );
};

export default Sidebar;

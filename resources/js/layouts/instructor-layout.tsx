import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Bell,
    BookOpen,
    Calendar,
    ChevronDown,
    GraduationCap,
    Home,
    LogOut,
    Menu,
    Moon,
    Search,
    Settings,
    Sun,
    UserPlus,
    Users,
    X,
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface SidebarLink {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    active?: boolean;
}

interface InstructorLayoutProps {
    children: ReactNode;
    title?: string;
}

const sidebarLinks: SidebarLink[] = [
    { name: 'Dashboard', href: '/instructor/dashboard', icon: Home },
    { name: 'Pendaftaran', href: '/instructor/registrations', icon: UserPlus },
    { name: 'Kelas Saya', href: '/instructor/classes', icon: BookOpen },
    { name: 'Siswa', href: '/instructor/students', icon: Users },
    { name: 'Jadwal', href: '/instructor/schedule', icon: Calendar },
    { name: 'Pengaturan', href: '/settings/profile', icon: Settings },
];

export default function InstructorLayout({ children, title }: InstructorLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { url } = usePage();
    const user = usePage().props.auth?.user as { name: string; email: string } | undefined;

    useEffect(() => {
        // Check for dark mode preference
        if (typeof window !== 'undefined') {
            const isDark = localStorage.getItem('darkMode') === 'true' ||
                (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setDarkMode(isDark);
            if (isDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', String(newDarkMode));
        document.documentElement.classList.toggle('dark');
    };

    const isActive = (href: string) => {
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-72 transform bg-slate-900 transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                VNS SCHOOL
                            </span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white lg:hidden">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <ul className="space-y-2">
                            {sidebarLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${active
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <link.icon className="h-5 w-5" />
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User Profile */}
                    <div className="border-t border-white/10 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate font-medium text-white">{user?.name || 'Instructor'}</p>
                                <p className="truncate text-xs text-slate-400">{user?.email || 'instructor@school.com'}</p>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <LogOut className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Header */}
                <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/80">
                    <div className="flex h-full items-center justify-between px-4 lg:px-8">
                        {/* Left Side */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {title || 'Dashboard'}
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Selamat datang kembali, {user?.name?.split(' ')[0] || 'Instructor'}!
                                </p>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative hidden md:block">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                />
                            </div>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            {/* Notifications */}
                            <button className="relative rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                    3
                                </span>
                            </button>

                            {/* User Dropdown (Desktop) */}
                            <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:flex dark:border-slate-600 dark:bg-slate-700">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-slate-900 dark:text-white">{user?.name || 'Instructor'}</p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}

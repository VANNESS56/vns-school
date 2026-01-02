import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowDown,
    ArrowUp,
    BookOpen,
    Calendar,
    Clock,
    MoreHorizontal,
    TrendingUp,
    Users,
} from 'lucide-react';
import InstructorLayout from '@/layouts/instructor-layout';

interface ClassData {
    id: number;
    name: string;
    code: string;
    subject: string;
    room: string | null;
    schedule: string | null;
    students_count: number;
    max_students: number;
    status: string;
}

interface InstructorData {
    id: number;
    name: string;
    email: string;
    employee_id: string;
    specialization: string | null;
    bio: string | null;
    profile_photo: string | null;
}

interface StatsData {
    total_students: number;
    total_classes: number;
    teaching_hours: number;
}

interface PageProps {
    instructor: InstructorData;
    stats: StatsData;
    classes: ClassData[];
}

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Stats Card Component
function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color,
}: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: 'up' | 'down';
    trendValue?: string;
    color: string;
}) {
    return (
        <motion.div
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {value}
                    </p>
                    {trend && trendValue && (
                        <div className={`mt-2 flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>

            {/* Hover Effect */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${color} opacity-0 transition-opacity group-hover:opacity-100`} />
        </motion.div>
    );
}

// Class Card Component
function ClassCard({ classData }: { classData: ClassData }) {
    const statusColors = {
        active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
        completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };

    const progressPercent = (classData.students_count / classData.max_students) * 100;

    return (
        <motion.div
            variants={fadeInUp}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[classData.status as keyof typeof statusColors]}`}>
                        {classData.status === 'active' ? 'Aktif' : classData.status === 'completed' ? 'Selesai' : 'Tidak Aktif'}
                    </span>
                </div>
                <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {classData.name}
            </h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{classData.subject}</p>

            <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    <span>Kode: {classData.code}</span>
                </div>
                {classData.room && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>Ruang: {classData.room}</span>
                    </div>
                )}
                {classData.schedule && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{classData.schedule}</span>
                    </div>
                )}
            </div>

            {/* Students Progress */}
            <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Siswa</span>
                <span className="font-medium text-slate-900 dark:text-white">
                    {classData.students_count}/{classData.max_students}
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
            </div>
        </motion.div>
    );
}

// Quick Actions Component
function QuickActions() {
    const actions = [
        { name: 'Tambah Kelas', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
        { name: 'Kelola Siswa', icon: Users, color: 'from-purple-500 to-purple-600' },
        { name: 'Jadwal', icon: Calendar, color: 'from-amber-500 to-amber-600' },
        { name: 'Laporan', icon: TrendingUp, color: 'from-emerald-500 to-emerald-600' },
    ];

    return (
        <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Aksi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 transition-all hover:border-blue-500/30 hover:bg-blue-50/50 dark:border-slate-600 dark:hover:border-blue-500/30 dark:hover:bg-blue-900/10"
                    >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color}`}>
                            <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{action.name}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

// Recent Activity Component
function RecentActivity() {
    const activities = [
        { text: 'Menambahkan nilai untuk kelas Matematika XII', time: '5 menit lalu', type: 'grade' },
        { text: 'Membuat tugas baru di kelas Fisika XI', time: '1 jam lalu', type: 'task' },
        { text: 'Menandai kehadiran kelas Kimia X', time: '3 jam lalu', type: 'attendance' },
        { text: 'Memperbarui materi pembelajaran', time: 'Kemarin', type: 'material' },
    ];

    return (
        <motion.div variants={fadeInUp} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                        <div className="flex-1">
                            <p className="text-sm text-slate-600 dark:text-slate-300">{activity.text}</p>
                            <p className="text-xs text-slate-400">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// Main Dashboard Component
export default function InstructorDashboard({ instructor, stats, classes }: PageProps) {
    return (
        <InstructorLayout title="Dashboard">
            <Head title="Dashboard - Instructor" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-8"
            >
                {/* Stats Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatsCard
                        title="Total Siswa"
                        value={stats.total_students}
                        icon={Users}
                        trend="up"
                        trendValue="+12% dari bulan lalu"
                        color="from-blue-500 to-blue-600"
                    />
                    <StatsCard
                        title="Total Kelas"
                        value={stats.total_classes}
                        icon={BookOpen}
                        color="from-purple-500 to-purple-600"
                    />
                    <StatsCard
                        title="Jam Mengajar"
                        value={`${stats.teaching_hours} Jam`}
                        icon={Clock}
                        trend="up"
                        trendValue="+5 jam minggu ini"
                        color="from-amber-500 to-amber-600"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Classes List */}
                    <div className="lg:col-span-2">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                Kelas yang Diampu
                            </h2>
                            <a
                                href="/instructor/classes"
                                className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
                            >
                                Lihat Semua
                            </a>
                        </div>

                        {classes.length > 0 ? (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-6 sm:grid-cols-2"
                            >
                                {classes.slice(0, 4).map((classItem) => (
                                    <ClassCard key={classItem.id} classData={classItem} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 dark:border-slate-700"
                            >
                                <BookOpen className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
                                <p className="mb-2 text-lg font-medium text-slate-600 dark:text-slate-300">Belum ada kelas</p>
                                <p className="text-sm text-slate-400">Mulai dengan menambahkan kelas pertama Anda</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <QuickActions />
                        <RecentActivity />
                    </div>
                </div>
            </motion.div>
        </InstructorLayout>
    );
}

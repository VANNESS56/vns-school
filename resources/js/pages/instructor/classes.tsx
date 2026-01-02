import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Calendar,
    Clock,
    MoreHorizontal,
    Plus,
    Search,
    Users,
} from 'lucide-react';
import InstructorLayout from '@/layouts/instructor-layout';
import { useState } from 'react';

interface StudentData {
    id: number;
    name: string;
    student_id: string;
    email: string;
    grade: number | null;
}

interface SubjectData {
    id: number;
    name: string;
    code: string;
}

interface ClassData {
    id: number;
    name: string;
    code: string;
    subject: SubjectData | null;
    room: string | null;
    schedule: string | null;
    students_count: number;
    max_students: number;
    status: string;
    students: StudentData[];
}

interface PageProps {
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

export default function ClassesPage({ classes }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredClasses = classes.filter((classItem) => {
        const matchesSearch =
            classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            classItem.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || classItem.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <InstructorLayout title="Kelas Saya">
            <Head title="Kelas Saya - Instructor" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
            >
                {/* Header */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari kelas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                            <option value="completed">Selesai</option>
                        </select>
                    </div>

                    {/* Add Button */}
                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl">
                        <Plus className="h-5 w-5" />
                        Tambah Kelas
                    </button>
                </motion.div>

                {/* Classes Grid */}
                {filteredClasses.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                    >
                        {filteredClasses.map((classItem) => (
                            <ClassCard key={classItem.id} classData={classItem} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 dark:border-slate-700"
                    >
                        <BookOpen className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
                        <p className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">
                            {searchQuery ? 'Tidak ada kelas ditemukan' : 'Belum ada kelas'}
                        </p>
                        <p className="text-sm text-slate-400">
                            {searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan menambahkan kelas pertama Anda'}
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </InstructorLayout>
    );
}

// Class Card Component
function ClassCard({ classData }: { classData: ClassData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statusColors = {
        active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
        completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };

    const progressPercent = (classData.students_count / classData.max_students) * 100;

    return (
        <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
            <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                    <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[classData.status as keyof typeof statusColors]}`}>
                        {classData.status === 'active' ? 'Aktif' : classData.status === 'completed' ? 'Selesai' : 'Tidak Aktif'}
                    </span>
                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>

                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {classData.name}
                </h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                    {classData.subject?.name || 'Tidak ada mata pelajaran'}
                </p>

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
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Users className="h-4 w-4" />
                        Siswa
                    </span>
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
            </div>

            {/* Expandable Students List */}
            {classData.students.length > 0 && (
                <>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full border-t border-slate-200 px-6 py-3 text-center text-sm font-medium text-blue-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                    >
                        {isExpanded ? 'Sembunyikan Siswa' : `Lihat ${classData.students.length} Siswa`}
                    </button>

                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-slate-200 px-6 py-4 dark:border-slate-700"
                        >
                            <div className="max-h-48 space-y-2 overflow-y-auto">
                                {classData.students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-bold text-white">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                    {student.name}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {student.student_id}
                                                </p>
                                            </div>
                                        </div>
                                        {student.grade && (
                                            <span className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                                {student.grade}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </motion.div>
    );
}

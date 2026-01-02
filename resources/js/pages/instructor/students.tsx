import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Users, Download, Mail, Phone, MoreHorizontal, User } from 'lucide-react';
import InstructorLayout from '@/layouts/instructor-layout';
import { useState } from 'react';

interface StudentData {
    id: number;
    name: string;
    student_id: string;
    email: string;
    phone: string | null;
    grade: string | null;
    status: string;
    classes_count: number;
}

interface PageProps {
    students: StudentData[];
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function StudentsPage({ students }: PageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredStudents = students.filter((student) => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.student_id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
        return matchesSearch && matchesFilter;
    });

    const statusColors: Record<string, string> = {
        active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
        graduated: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };

    return (
        <InstructorLayout title="Siswa">
            <Head title="Siswa - Instructor" />
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                {/* Stats */}
                <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                                <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{students.length}</p>
                                <p className="text-sm text-slate-500">Total Siswa</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{students.filter((s) => s.status === 'active').length}</p>
                                <p className="text-sm text-slate-500">Siswa Aktif</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {Math.round(students.reduce((acc, s) => acc + s.classes_count, 0) / Math.max(students.length, 1))}
                                </p>
                                <p className="text-sm text-slate-500">Rata-rata Kelas</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Cari siswa..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white">
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        <Download className="h-5 w-5" />Export
                    </button>
                </motion.div>

                {/* Table */}
                {filteredStudents.length > 0 ? (
                    <motion.div variants={fadeInUp} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Siswa</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">ID Siswa</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Kelas</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">Kontak</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">{student.name.charAt(0)}</div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                                                    <p className="text-sm text-slate-500">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">{student.student_id}</span></td>
                                        <td className="px-6 py-4"><span className="text-sm text-slate-600 dark:text-slate-300">{student.classes_count} kelas</span></td>
                                        <td className="px-6 py-4"><span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${statusColors[student.status] || statusColors.inactive}`}>{student.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <a href={`mailto:${student.email}`} className="rounded-lg p-2 text-slate-400 hover:bg-blue-100 hover:text-blue-600"><Mail className="h-4 w-4" /></a>
                                                {student.phone && <a href={`tel:${student.phone}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600"><Phone className="h-4 w-4" /></a>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right"><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal className="h-5 w-5" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                ) : (
                    <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 dark:border-slate-700">
                        <Users className="mb-4 h-16 w-16 text-slate-300" />
                        <p className="text-xl font-medium text-slate-600 dark:text-slate-300">{searchQuery ? 'Tidak ada siswa ditemukan' : 'Belum ada siswa'}</p>
                    </motion.div>
                )}
            </motion.div>
        </InstructorLayout>
    );
}

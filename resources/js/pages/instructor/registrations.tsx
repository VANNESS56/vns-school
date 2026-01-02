import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Download,
    Eye,
    Mail,
    MapPin,
    Phone,
    Search,
    Trash2,
    User,
    UserCheck,
    UserPlus,
    Users,
    X,
    XCircle,
} from 'lucide-react';
import InstructorLayout from '@/layouts/instructor-layout';
import { useState } from 'react';

interface Registration {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    birth_date: string;
    gender: string;
    address: string;
    parent_name: string;
    parent_phone: string;
    previous_school: string | null;
    grade_applying: string;
    program: string | null;
    motivation: string | null;
    status: string;
    status_label: string;
    notes: string | null;
    created_at: string;
    reviewed_at: string | null;
}

interface Props {
    registrations: Registration[];
    stats: {
        total: number;
        pending: number;
        accepted: number;
        rejected: number;
    };
    filters: {
        status: string;
        search: string;
    };
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function RegistrationsPage({ registrations, stats, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search);
    const [selectedFilter, setSelectedFilter] = useState(filters.status);
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleSearch = () => {
        router.get('/instructor/registrations', { status: selectedFilter, search: searchQuery }, { preserveState: true });
    };

    const handleFilterChange = (status: string) => {
        setSelectedFilter(status);
        router.get('/instructor/registrations', { status, search: searchQuery }, { preserveState: true });
    };

    const handleUpdateStatus = (id: number, status: string, notes?: string) => {
        router.patch(`/instructor/registrations/${id}/status`, { status, notes }, { preserveState: true });
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pendaftaran ini?')) {
            router.delete(`/instructor/registrations/${id}`, { preserveState: true });
        }
    };

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        reviewed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <InstructorLayout title="Pendaftaran Siswa">
            <Head title="Pendaftaran Siswa - Instructor" />

            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                {/* Stats Cards */}
                <motion.div variants={fadeInUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={UserPlus} title="Total Pendaftar" value={stats.total} color="from-blue-500 to-blue-600" />
                    <StatCard icon={Clock} title="Menunggu" value={stats.pending} color="from-amber-500 to-amber-600" />
                    <StatCard icon={UserCheck} title="Diterima" value={stats.accepted} color="from-emerald-500 to-emerald-600" />
                    <StatCard icon={XCircle} title="Ditolak" value={stats.rejected} color="from-red-500 to-red-600" />
                </motion.div>

                {/* Filters */}
                <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari pendaftar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                            />
                        </div>
                        <select
                            value={selectedFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="accepted">Diterima</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                        <Download className="h-5 w-5" />
                        Export
                    </button>
                </motion.div>

                {/* Registrations List */}
                {registrations.length > 0 ? (
                    <motion.div variants={fadeInUp} className="space-y-4">
                        {registrations.map((reg) => (
                            <RegistrationCard
                                key={reg.id}
                                registration={reg}
                                isExpanded={expandedId === reg.id}
                                onToggle={() => setExpandedId(expandedId === reg.id ? null : reg.id)}
                                onView={() => { setSelectedRegistration(reg); setShowModal(true); }}
                                onAccept={() => handleUpdateStatus(reg.id, 'accepted')}
                                onReject={() => handleUpdateStatus(reg.id, 'rejected')}
                                onDelete={() => handleDelete(reg.id)}
                                statusColors={statusColors}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 dark:border-slate-700">
                        <Users className="mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
                        <p className="text-xl font-medium text-slate-600 dark:text-slate-300">Belum ada pendaftaran</p>
                        <p className="text-sm text-slate-400">Pendaftar baru akan muncul di sini</p>
                    </motion.div>
                )}
            </motion.div>

            {/* Detail Modal */}
            {showModal && selectedRegistration && (
                <DetailModal
                    registration={selectedRegistration}
                    onClose={() => setShowModal(false)}
                    onAccept={() => handleUpdateStatus(selectedRegistration.id, 'accepted')}
                    onReject={() => handleUpdateStatus(selectedRegistration.id, 'rejected')}
                    statusColors={statusColors}
                />
            )}
        </InstructorLayout>
    );
}

function StatCard({ icon: Icon, title, value, color }: { icon: any; title: string; value: number; color: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}>
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                    <p className="text-sm text-slate-500">{title}</p>
                </div>
            </div>
        </div>
    );
}

function RegistrationCard({ registration, isExpanded, onToggle, onView, onAccept, onReject, onDelete, statusColors }: any) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-700 dark:bg-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">
                        {registration.full_name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{registration.full_name}</h3>
                        <p className="text-sm text-slate-500">{registration.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`hidden rounded-lg px-2.5 py-1 text-xs font-medium sm:inline-block ${statusColors[registration.status]}`}>
                        {registration.status_label}
                    </span>
                    <span className="text-sm text-slate-400">{registration.created_at}</span>
                    <button onClick={onToggle} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-slate-200 dark:border-slate-700"
                >
                    <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                        <InfoItem icon={Phone} label="Telepon" value={registration.phone} />
                        <InfoItem icon={Calendar} label="Tanggal Lahir" value={registration.birth_date} />
                        <InfoItem icon={User} label="Jenis Kelamin" value={registration.gender} />
                        <InfoItem icon={MapPin} label="Alamat" value={registration.address} className="lg:col-span-3" />
                        <InfoItem icon={Users} label="Nama Orang Tua" value={registration.parent_name} />
                        <InfoItem icon={Phone} label="Telepon Orang Tua" value={registration.parent_phone} />
                        <InfoItem icon={User} label="Kelas yang Dituju" value={`Kelas ${registration.grade_applying}`} />
                        {registration.program && <InfoItem icon={User} label="Program" value={registration.program} />}
                        {registration.previous_school && <InfoItem icon={User} label="Asal Sekolah" value={registration.previous_school} />}
                    </div>
                    {registration.motivation && (
                        <div className="border-t border-slate-200 p-4 sm:p-6 dark:border-slate-700">
                            <p className="mb-2 text-sm font-medium text-slate-500">Motivasi:</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{registration.motivation}</p>
                        </div>
                    )}
                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 p-4 dark:border-slate-700">
                        <button onClick={onView} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Eye className="h-4 w-4" /> Detail
                        </button>
                        {registration.status === 'pending' && (
                            <>
                                <button onClick={onAccept} className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                                    <CheckCircle className="h-4 w-4" /> Terima
                                </button>
                                <button onClick={onReject} className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600">
                                    <XCircle className="h-4 w-4" /> Tolak
                                </button>
                            </>
                        )}
                        <button onClick={onDelete} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="h-4 w-4" /> Hapus
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function InfoItem({ icon: Icon, label, value, className = '' }: any) {
    return (
        <div className={className}>
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
            </div>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{value}</p>
        </div>
    );
}

function DetailModal({ registration, onClose, onAccept, onReject, statusColors }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xl font-bold text-white">
                            {registration.full_name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{registration.full_name}</h2>
                            <p className="text-sm text-slate-500">{registration.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-2">
                        <span className={`rounded-lg px-3 py-1.5 text-sm font-medium ${statusColors[registration.status]}`}>
                            {registration.status_label}
                        </span>
                        <span className="text-sm text-slate-400">Didaftarkan: {registration.created_at}</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <InfoItem icon={Phone} label="Telepon" value={registration.phone} />
                        <InfoItem icon={Mail} label="Email" value={registration.email} />
                        <InfoItem icon={Calendar} label="Tanggal Lahir" value={registration.birth_date} />
                        <InfoItem icon={User} label="Jenis Kelamin" value={registration.gender} />
                        <InfoItem icon={MapPin} label="Alamat" value={registration.address} className="sm:col-span-2" />
                    </div>

                    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Data Orang Tua</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem icon={Users} label="Nama" value={registration.parent_name} />
                            <InfoItem icon={Phone} label="Telepon" value={registration.parent_phone} />
                        </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Data Akademik</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <InfoItem icon={User} label="Kelas yang Dituju" value={`Kelas ${registration.grade_applying}`} />
                            {registration.program && <InfoItem icon={User} label="Program" value={registration.program} />}
                            {registration.previous_school && <InfoItem icon={User} label="Asal Sekolah" value={registration.previous_school} />}
                        </div>
                    </div>

                    {registration.motivation && (
                        <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">Motivasi</h3>
                            <p className="text-slate-600 dark:text-slate-300">{registration.motivation}</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {registration.status === 'pending' && (
                    <div className="flex justify-end gap-3 border-t border-slate-200 p-6 dark:border-slate-700">
                        <button onClick={onReject} className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-2.5 font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <XCircle className="h-5 w-5" /> Tolak
                        </button>
                        <button onClick={onAccept} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-white hover:bg-emerald-600">
                            <CheckCircle className="h-5 w-5" /> Terima
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, MapPin } from 'lucide-react';
import InstructorLayout from '@/layouts/instructor-layout';

interface ClassSchedule {
    id: number;
    name: string;
    subject: string;
    room: string | null;
    schedule: string | null;
}

interface PageProps {
    classes: ClassSchedule[];
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

export default function SchedulePage({ classes }: PageProps) {
    return (
        <InstructorLayout title="Jadwal">
            <Head title="Jadwal - Instructor" />
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
                {/* Today's Schedule */}
                <motion.div variants={fadeInUp}>
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Jadwal Hari Ini
                    </h2>
                    {classes.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {classes.map((classItem) => (
                                <div key={classItem.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                                        <BookOpen className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">{classItem.name}</h3>
                                    <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{classItem.subject}</p>
                                    <div className="space-y-2">
                                        {classItem.room && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span>{classItem.room}</span>
                                            </div>
                                        )}
                                        {classItem.schedule && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <Clock className="h-4 w-4 text-slate-400" />
                                                <span>{classItem.schedule}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-16 dark:border-slate-700">
                            <Calendar className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
                            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Tidak ada jadwal hari ini</p>
                        </div>
                    )}
                </motion.div>

                {/* Weekly Calendar */}
                <motion.div variants={fadeInUp}>
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Jadwal Mingguan
                    </h2>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Waktu</th>
                                        {days.map((day) => (
                                            <th key={day} className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {timeSlots.map((time) => (
                                        <tr key={time} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-3 text-sm font-medium text-slate-500">{time}</td>
                                            {days.map((day) => (
                                                <td key={`${time}-${day}`} className="px-4 py-3 text-center">
                                                    <div className="h-8"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </InstructorLayout>
    );
}

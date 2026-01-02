import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Home, Phone } from 'lucide-react';

export default function RegistrationSuccess() {
    return (
        <>
            <Head title="Pendaftaran Berhasil - VNS SCHOOL" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-xl shadow-emerald-500/30"
                    >
                        <CheckCircle className="h-12 w-12 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        Pendaftaran Berhasil!
                    </h1>

                    {/* Description */}
                    <p className="mb-8 text-lg text-slate-300">
                        Terima kasih telah mendaftar di{' '}
                        <span className="font-semibold text-blue-400">VNS SCHOOL</span>.
                        Data pendaftaran Anda telah kami terima dan akan segera diproses.
                    </p>

                    {/* Info Card */}
                    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl">
                        <h3 className="mb-4 font-semibold text-white">Langkah Selanjutnya:</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-start gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                                    1
                                </span>
                                <span>Tim kami akan meninjau data pendaftaran Anda dalam waktu 1-3 hari kerja.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                                    2
                                </span>
                                <span>Anda akan menerima notifikasi melalui email yang terdaftar mengenai status pendaftaran.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                                    3
                                </span>
                                <span>Jika diterima, Anda akan diundang untuk melakukan verifikasi data dan pembayaran.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="mb-8 flex items-center justify-center gap-2 text-sm text-slate-400">
                        <Phone className="h-4 w-4" />
                        <span>Ada pertanyaan? Hubungi kami di (021) 1234-5678</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                        >
                            <Home className="h-5 w-5" />
                            Kembali ke Beranda
                        </Link>
                        <Link
                            href="/daftar"
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/5"
                        >
                            <GraduationCap className="h-5 w-5" />
                            Daftar Lagi
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, GraduationCap, Mail, MapPin, Phone, User, Users } from 'lucide-react';
import { FormEvent } from 'react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RegistrationCreate() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        phone: '',
        birth_date: '',
        gender: '',
        address: '',
        parent_name: '',
        parent_phone: '',
        previous_school: '',
        grade_applying: '',
        program: '',
        motivation: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/daftar');
    };

    return (
        <>
            <Head title="Pendaftaran Siswa Baru - VNS SCHOOL">
                <meta name="description" content="Daftar sebagai siswa baru di VNS SCHOOL dan mulai perjalanan pendidikan Anda." />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Header */}
                <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                VNS SCHOOL
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    </div>
                </div>

                {/* Form Container */}
                <div className="mx-auto max-w-4xl px-4 py-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="mb-8 text-center"
                    >
                        <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Pendaftaran Siswa Baru
                        </h1>
                        <p className="text-slate-400">
                            Lengkapi formulir di bawah ini untuk mendaftar sebagai siswa baru di VNS SCHOOL
                        </p>
                    </motion.div>

                    <motion.form
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        {/* Data Pribadi */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                                <User className="h-5 w-5 text-blue-400" />
                                Data Pribadi
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Nama Lengkap */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Nama Lengkap <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.full_name && <p className="mt-1 text-sm text-red-400">{errors.full_name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        <Mail className="mr-1 inline h-4 w-4" />
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="email@contoh.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        <Phone className="mr-1 inline h-4 w-4" />
                                        Nomor Telepon <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        <Calendar className="mr-1 inline h-4 w-4" />
                                        Tanggal Lahir <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                    />
                                    {errors.birth_date && <p className="mt-1 text-sm text-red-400">{errors.birth_date}</p>}
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Jenis Kelamin <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                    >
                                        <option value="" className="bg-slate-800">Pilih jenis kelamin</option>
                                        <option value="male" className="bg-slate-800">Laki-laki</option>
                                        <option value="female" className="bg-slate-800">Perempuan</option>
                                    </select>
                                    {errors.gender && <p className="mt-1 text-sm text-red-400">{errors.gender}</p>}
                                </div>

                                {/* Alamat */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        <MapPin className="mr-1 inline h-4 w-4" />
                                        Alamat Lengkap <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                    {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Data Orang Tua */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                                <Users className="h-5 w-5 text-purple-400" />
                                Data Orang Tua / Wali
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Nama Orang Tua/Wali <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.parent_name}
                                        onChange={(e) => setData('parent_name', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Nama orang tua/wali"
                                    />
                                    {errors.parent_name && <p className="mt-1 text-sm text-red-400">{errors.parent_name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        <Phone className="mr-1 inline h-4 w-4" />
                                        Nomor Telepon Orang Tua <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.parent_phone}
                                        onChange={(e) => setData('parent_phone', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.parent_phone && <p className="mt-1 text-sm text-red-400">{errors.parent_phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Data Akademik */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
                                <GraduationCap className="h-5 w-5 text-amber-400" />
                                Data Akademik
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Asal Sekolah
                                    </label>
                                    <input
                                        type="text"
                                        value={data.previous_school}
                                        onChange={(e) => setData('previous_school', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Nama sekolah sebelumnya"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Kelas yang Dituju <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={data.grade_applying}
                                        onChange={(e) => setData('grade_applying', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                    >
                                        <option value="" className="bg-slate-800">Pilih kelas</option>
                                        <option value="X" className="bg-slate-800">Kelas X (10)</option>
                                        <option value="XI" className="bg-slate-800">Kelas XI (11)</option>
                                        <option value="XII" className="bg-slate-800">Kelas XII (12)</option>
                                    </select>
                                    {errors.grade_applying && <p className="mt-1 text-sm text-red-400">{errors.grade_applying}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Program/Jurusan
                                    </label>
                                    <select
                                        value={data.program}
                                        onChange={(e) => setData('program', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                    >
                                        <option value="" className="bg-slate-800">Pilih program</option>
                                        <option value="IPA" className="bg-slate-800">IPA (Ilmu Pengetahuan Alam)</option>
                                        <option value="IPS" className="bg-slate-800">IPS (Ilmu Pengetahuan Sosial)</option>
                                        <option value="Bahasa" className="bg-slate-800">Bahasa</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Motivasi Bergabung
                                    </label>
                                    <textarea
                                        value={data.motivation}
                                        onChange={(e) => setData('motivation', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                        placeholder="Ceritakan motivasi Anda untuk bergabung dengan VNS SCHOOL..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                            <p className="text-sm text-slate-400">
                                <span className="text-red-400">*</span> Wajib diisi
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Pendaftaran'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}

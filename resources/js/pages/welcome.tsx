import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Atom,
    Award,
    BookOpen,
    Calculator,
    ChevronDown,
    Code,
    FlaskConical,
    GraduationCap,
    Languages,
    Leaf,
    Menu,
    Quote,
    Sparkles,
    Star,
    Trophy,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

// Types
interface Subject {
    id: number;
    name: string;
    code: string;
    description: string;
    icon: string;
    color: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string | null;
    rating: number;
}

interface PageProps {
    canRegister: boolean;
    subjects: Subject[];
    testimonials: Testimonial[];
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Calculator,
    Atom,
    FlaskConical,
    Leaf,
    Languages,
    Code,
};

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Navbar Component
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '#home' },
        { name: 'Tentang', href: '#about' },
        { name: 'Mata Pelajaran', href: '#subjects' },
        { name: 'Testimoni', href: '#testimonials' },
        { name: 'Kontak', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 right-0 left-0 z-50 px-4 py-4"
        >
            <div className="mx-auto max-w-7xl">
                <div className="glass-navy rounded-2xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                VNS SCHOOL
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center gap-8 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden items-center gap-4 md:flex">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/daftar"
                                className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 border-t border-white/10 pt-4 md:hidden"
                        >
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="flex flex-col gap-3 pt-4">
                                    <Link
                                        href="/login"
                                        className="text-center text-sm font-medium text-white/70 transition-colors hover:text-white"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/daftar"
                                        className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}

// Hero Section
function HeroSection() {
    return (
        <section id="home" className="gradient-hero relative min-h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20">
                <div className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center lg:text-left"
                    >
                        <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">Pendidikan Berkualitas #1</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            Wujudkan
                            <span className="text-gradient"> Masa Depan </span>
                            Cemerlang Anda
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="mx-auto mb-8 max-w-xl text-lg text-slate-300 lg:mx-0">
                            Bergabunglah dengan ribuan siswa yang telah meraih kesuksesan melalui program pendidikan unggulan dan
                            fasilitas modern kami.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                            <Link
                                href="/daftar"
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/30 sm:w-auto"
                            >
                                Daftar Siswa Baru
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="#about"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
                            >
                                Pelajari Lebih Lanjut
                                <ChevronDown className="h-5 w-5" />
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeInUp} className="mt-12 grid grid-cols-3 gap-8">
                            {[
                                { value: '2000+', label: 'Siswa Aktif' },
                                { value: '50+', label: 'Pengajar Ahli' },
                                { value: '95%', label: 'Tingkat Kelulusan' },
                            ].map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-gradient text-2xl font-bold md:text-3xl">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Hero Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Card */}
                            <div className="glass-navy animate-float rounded-3xl p-8">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                                        <GraduationCap className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                            Pembelajaran Interaktif
                                        </h3>
                                        <p className="text-slate-400">Metode modern & efektif</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: BookOpen, label: 'Kurikulum Terbaru', color: 'from-blue-500 to-blue-600' },
                                        { icon: Users, label: 'Kelas Kecil', color: 'from-purple-500 to-purple-600' },
                                        { icon: Trophy, label: 'Prestasi Gemilang', color: 'from-amber-500 to-amber-600' },
                                        { icon: Award, label: 'Sertifikasi', color: 'from-emerald-500 to-emerald-600' },
                                    ].map((item, index) => (
                                        <div key={index} className="rounded-xl bg-white/5 p-4">
                                            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${item.color}`}>
                                                <item.icon className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-300">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="glass-navy absolute -right-4 -bottom-4 rounded-2xl p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                                        <Star className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">4.9/5</div>
                                        <div className="text-xs text-slate-400">Rating Terbaik</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 pt-2"
                >
                    <div className="h-2 w-1 rounded-full bg-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// Features Section
function FeaturesSection() {
    const features = [
        {
            icon: GraduationCap,
            title: 'Pengajar Profesional',
            description: 'Tim pengajar berpengalaman dengan latar belakang pendidikan terbaik dari universitas ternama.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: BookOpen,
            title: 'Kurikulum Modern',
            description: 'Kurikulum yang dirancang sesuai perkembangan zaman dan kebutuhan industri masa kini.',
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: Trophy,
            title: 'Fasilitas Lengkap',
            description: 'Laboratorium, perpustakaan digital, dan ruang kelas modern dengan teknologi terkini.',
            color: 'from-amber-500 to-amber-600',
        },
        {
            icon: Users,
            title: 'Komunitas Solid',
            description: 'Bergabung dengan komunitas siswa dan alumni yang saling mendukung dan berkolaborasi.',
            color: 'from-emerald-500 to-emerald-600',
        },
    ];

    return (
        <section id="about" className="bg-slate-50 py-24 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="text-center"
                >
                    <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Mengapa Memilih Kami</span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        Keunggulan{' '}
                        <span className="text-gradient">VNS SCHOOL</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="mx-auto mb-16 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                        Kami berkomitmen untuk memberikan pendidikan berkualitas tinggi dengan pendekatan inovatif dan personal.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={scaleIn}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                        >
                            <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                <feature.icon className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>

                            {/* Hover Effect */}
                            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 transition-opacity group-hover:opacity-100`} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Subjects Section
function SubjectsSection({ subjects }: { subjects: Subject[] }) {
    return (
        <section id="subjects" className="py-24">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="text-center"
                >
                    <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Program Unggulan</span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        Mata Pelajaran{' '}
                        <span className="text-gradient">Populer</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="mx-auto mb-16 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                        Eksplorasi berbagai mata pelajaran dengan kurikulum terkini dan metode pembelajaran interaktif.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {subjects.map((subject, index) => {
                        const IconComponent = iconMap[subject.icon] || BookOpen;
                        return (
                            <motion.div
                                key={subject.id}
                                variants={scaleIn}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                                        style={{ backgroundColor: `${subject.color}20` }}
                                    >
                                        <IconComponent className="h-6 w-6" style={{ color: subject.color }} />
                                    </div>
                                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                        {subject.code}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {subject.name}
                                </h3>
                                <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{subject.description}</p>
                                <button
                                    className="flex items-center gap-2 text-sm font-semibold transition-colors"
                                    style={{ color: subject.color }}
                                >
                                    Lihat Detail
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>

                                {/* Decorative Element */}
                                <div
                                    className="absolute -right-12 -bottom-12 h-32 w-32 rounded-full opacity-10"
                                    style={{ backgroundColor: subject.color }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <section id="testimonials" className="gradient-hero relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="text-center"
                >
                    <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                        <Quote className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Testimoni</span>
                    </motion.div>

                    <motion.h2
                        variants={fadeInUp}
                        className="mb-4 text-3xl font-bold text-white md:text-4xl"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        Kata Mereka Tentang{' '}
                        <span className="text-gradient">VNS SCHOOL</span>
                    </motion.h2>

                    <motion.p variants={fadeInUp} className="mx-auto mb-16 max-w-2xl text-lg text-slate-300">
                        Dengarkan pengalaman nyata dari siswa, alumni, dan orang tua tentang perjalanan mereka bersama kami.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid gap-6 md:grid-cols-2"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            variants={scaleIn}
                            className="glass-navy rounded-2xl p-8"
                        >
                            {/* Rating */}
                            <div className="mb-4 flex gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="mb-6 text-lg leading-relaxed text-slate-300">"{testimonial.content}"</p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={fadeInUp}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 p-12 text-center shadow-2xl md:p-16"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                backgroundSize: '40px 40px',
                            }}
                        />
                    </div>

                    <div className="relative">
                        <h2
                            className="mb-4 text-3xl font-bold text-white md:text-4xl"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                            Siap Memulai Perjalanan Pendidikan Anda?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                            Bergabunglah dengan ribuan siswa yang telah meraih impian mereka. Daftarkan diri Anda sekarang dan
                            mulai perjalanan menuju kesuksesan.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/daftar"
                                className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-all hover:shadow-xl"
                            >
                                Daftar Siswa Baru
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
                            >
                                Sudah Punya Akun? Masuk
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Footer Section
function Footer() {
    return (
        <footer id="contact" className="gradient-navy border-t border-white/10 py-16">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                VNS SCHOOL
                            </span>
                        </Link>
                        <p className="mb-6 text-slate-400">
                            Mencetak generasi unggul yang siap menghadapi tantangan masa depan dengan pendidikan berkualitas.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="mb-4 font-semibold text-white">Menu</h4>
                        <ul className="space-y-2">
                            {['Beranda', 'Tentang Kami', 'Program', 'Fasilitas', 'Kontak'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 transition-colors hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-white">Program</h4>
                        <ul className="space-y-2">
                            {['SMA', 'SMK', 'Bimbel', 'Ekstrakurikuler', 'Beasiswa'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 transition-colors hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold text-white">Kontak</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li>Jl. Pendidikan No. 123</li>
                            <li>Jakarta Selatan, 12345</li>
                            <li>info@eduprime.id</li>
                            <li>(021) 1234-5678</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 text-center">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} VNS SCHOOL. All rights reserved. Made with ❤️ for education.
                    </p>
                </div>
            </div>
        </footer>
    );
}

// Main Component
export default function Welcome({ canRegister, subjects, testimonials }: PageProps) {
    return (
        <>
            <Head title="VNS SCHOOL - Pendidikan Berkualitas untuk Masa Depan">
                <meta name="description" content="VNS SCHOOL adalah sekolah modern dengan pendidikan berkualitas tinggi, fasilitas modern, dan pengajar profesional untuk masa depan cerah anak Anda." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-slate-900">
                <Navbar />
                <HeroSection />
                <FeaturesSection />
                <SubjectsSection subjects={subjects} />
                <TestimonialsSection testimonials={testimonials} />
                <CTASection />
                <Footer />
            </div>
        </>
    );
}

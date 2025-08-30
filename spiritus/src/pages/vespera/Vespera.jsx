import React, { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
// --- Icon Components (New & Revised Set) ---
const Stethoscope = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2a3.3 3.3 0 0 1 3.3 3.3c0 .8-.3 1.5-.8 2.1l-1.1 1.1c-.2.2-.2.5 0 .7l.2.2c.2.2.5.2.7 0l1-1c.5-.5.7-1.2.7-1.8A3.8 3.8 0 0 0 5 2.3Z"/><path d="M18.8 2.3a.3.3 0 1 1 .3-.3 3.3 3.3 0 0 0-3.3 3.3c0 .8.3 1.5.8 2.1l1.1 1.1c.2.2.2.5 0 .7l-.2.2c-.2.2-.5.2-.7 0l-1-1c-.5-.5-.7-1.2-.7-1.8A3.8 3.8 0 0 1 19 2.3Z"/><path d="M5 8.5V10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5"/><path d="M12 11v10"/><circle cx="12" cy="17" r="4"/></svg>
);
const Hospital = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 6v4"/><path d="M14 8h-4"/><path d="M14 16h-4"/><path d="M12 14v4"/><path d="M20 12h-4v8h4V12Z"/><path d="M4 20V10a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10"/><path d="M10 20V8h4v12"/><path d="M18 4H6a2 2 0 0 0-2 2v2"/><path d="M22 4h-2"/></svg>
);
const FileClock = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="8" cy="16" r="4"/><path d="M8 14v2h2"/></svg>
);
const Truck = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4h-8v-4Z"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>
);
const Sprout = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 20h10"/><path d="M10 20c-.5-2.5-1.2-5-2-7-1.3-3.3-2-6.5-2-8 0-1.2 1-2 2-2s2 .8 2 2c0 1.5-.7 4.7-2 8-.8 2-1.5 4.5-2 7Z"/><path d="M14 20c.5-2.5 1.2-5 2-7 1.3-3.3 2-6.5 2-8 0-1.2-1-2-2-2s-2 .8-2 2c0 1.5.7 4.7 2 8 .8 2 1.5 4.5 2 7Z"/></svg>
);
const TestTube2 = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>
);
const BadgeInfo = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.78l8.74 8.74a4 4 0 0 1-4.78 4.78Z"/><path d="M12 12h.01"/><path d="M16 8v.01"/><path d="M8 16v.01"/></svg>
);
const Dna = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.5A3.5 3.5 0 0 1 7.5 11H12"/><path d="M16.5 11a3.5 3.5 0 1 1 0 7H12"/><path d="M12 11V4.5A3.5 3.5 0 0 1 8.5 8H4"/><path d="M12 18v-7"/><path d="M8.5 14.5a3.5 3.5 0 1 1 0-7H12"/></svg>
);

// --- GlowCard Component for Mouse-Tracking Glow Effect ---
const GlowCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                cardRef.current.style.setProperty("--mouse-x", `${x}px`);
                cardRef.current.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (card) {
                card.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`card-glow ${className}`}>
            {children}
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    // Animated text for hero
    const heroTitle = "Unifying The Future of Global Health";
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 },
        },
    };
    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    // --- Mouse-following background effect ---
    useEffect(() => {
        const container = document.querySelector(".interactive-bg-container");
        const handleMouseMove = (e) => {
            if (container) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                container.style.setProperty("--mouse-x-bg", `${x}px`);
                container.style.setProperty("--mouse-y-bg", `${y}px`);
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            {/* Global Styles and Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Lora:ital,wght@0,400;0;600;1,400&display=swap');
                body { font-family: 'Inter', sans-serif; background-color: #010409; color: #E6EDF3; }
                .font-serif { font-family: 'Lora', serif; }
                .interactive-bg-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; background-color: #010409; overflow: hidden; }
                .interactive-bg-container::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.04) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.6; }
                .interactive-bg-container::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle 500px at var(--mouse-x-bg) var(--mouse-y-bg), rgba(29, 78, 216, 0.1), transparent 70%); }
                .card-glow { background: rgba(10, 14, 23, 0.5); position: relative; border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
                .card-glow:before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 0.75rem; border: 1px solid transparent; background: radial-gradient(300px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 80%) border-box; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
                .roadmap-line { position: absolute; left: 20px; top: 20px; bottom: 20px; width: 2px; background: linear-gradient(to bottom, transparent, #1d4ed8, transparent); }
                .roadmap-dot { position: absolute; left: 50%; top: 0; transform: translate(-50%, -50%); width: 16px; height: 16px; border-radius: 9999px; background-color: #010409; border: 3px solid #3b82f6; }
                .gradient-text { background: linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            `}</style>

            <main ref={ref} className="bg-transparent text-gray-200 overflow-x-hidden relative">
                <div className="interactive-bg-container"></div>
                
                <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/10 backdrop-blur-lg border-b border-gray-500/10">
                    <div className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">VESPERA</div>
                    <nav className="hidden md:flex items-center space-x-8 text-sm text-gray-400">
                        <a href="#roadmap" className="hover:text-white transition-colors duration-300">Our Vision</a>
                        <a href="#ecosystem" className="hover:text-white transition-colors duration-300">Ecosystem</a>
                        <a href="#partners" className="hover:text-white transition-colors duration-300">Partners</a>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                    <motion.div style={{ y }} className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] z-0"></motion.div>
                    <div className="z-10">
                        <motion.h1 variants={titleVariants} initial="hidden" animate="visible" className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 max-w-5xl mx-auto">
                            {heroTitle.split("").map((char, index) => (
                                <motion.span key={index} variants={charVariants}>{char}</motion.span>
                            ))}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }} className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                            A seamless, intelligent, and universal platform for healthcare, from mental wellness to biotechnology, designed for all of humanity.
                        </motion.p>
                        <motion.a href="#roadmap" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2, ease: "backOut" }} whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(59, 130, 246, 0.6)" }} whileTap={{ scale: 0.95 }} className="mt-12 inline-block px-8 py-3 rounded-full text-white font-bold shadow-lg transition-all text-lg" style={{ background: "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)" }}>
                            Explore The Vision
                        </motion.a>
                    </div>
                </section>

                {/* Roadmap Section */}
                <section id="roadmap" className="py-20 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Three-Stage Vision</h2>
                            <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg">We are building the future of health in three revolutionary phases. Each stage builds upon the last, creating a comprehensive ecosystem for human well-being and advancement.</p>
                        </motion.div>
                        <div className="grid md:grid-cols-3 gap-8">
                           {[
                                { name: "Spiritus", title: "The Global Mental Health Network", description: "Our foundational stage. A unified platform connecting therapists, clinics, and hospitals worldwide to create an accessible, seamless network for mental healthcare.", icon: Stethoscope },
                                { name: "Vespera", title: "The All-in-One Health System", description: "The expansion into a complete health ecosystem. Manage appointments, medical records, prescriptions, insurance, and even transportation with a single, universal Vespera ID.", icon: Hospital },
                                { name: "Angelus", title: "The Future of Biotechnology", description: "The ultimate frontier. Pioneering gene editing, cellular agriculture, and novel bio-engineering to eliminate disease and create a sustainable future for humanity.", icon: Dna },
                           ].map((stage, i) => (
                                <motion.div key={stage.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}>
                                    <GlowCard className="p-8 rounded-xl h-full flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/50 hover:border-blue-500/50">
                                        <div className="flex items-center justify-between w-full mb-4">
                                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">{stage.name}</span>
                                            <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg"><stage.icon className="h-6 w-6 text-blue-400" /></div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-white">{stage.title}</h3>
                                        <p className="text-gray-400 leading-relaxed text-base">{stage.description}</p>
                                    </GlowCard>
                                </motion.div>
                           ))}
                        </div>
                    </div>
                </section>

                {/* Vespera Ecosystem Section */}
                <section id="ecosystem" className="py-20 px-4 bg-gray-900/30">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }} className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Vespera Ecosystem</h2>
                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">One system to manage every aspect of your health journey, giving you unprecedented control and convenience.</p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: BadgeInfo, title: "Universal Vespera ID", description: "Your single, secure key to the entire health ecosystem. Access records, book appointments, and purchase medicine instantly." },
                                { icon: FileClock, title: "Unified Health Records", description: "All your medical history, lab results, scan reports, and prescriptions in one secure, accessible place." },
                                { icon: Stethoscope, title: "Seamless Appointments", description: "Find and book appointments with any doctor, specialist, or lab. Skip the queues and manage your schedule effortlessly." },
                                { icon: Truck, title: "Integrated Logistics", description: "Arrange transportation for appointments, from cabs to emergency ambulance services, directly within the app." },
                                { icon: Hospital, title: "Medicine & Pharmacy Network", description: "Get prescriptions filled, order medicines for delivery, or find nearby pharmacies that accept your Vespera ID." },
                                { icon: Hospital, title: "Insurance & Health Plans", description: "Integrate your health insurance for direct billing and explore curated health plans tailored to your needs." },
                            ].map((feature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.7 }} className="flex items-start space-x-6 p-4">
                                     <div className="flex-shrink-0 p-4 bg-gray-800/50 border border-gray-700 rounded-lg mt-1">
                                        <feature.icon className="h-7 w-7 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                        <p className="mt-2 text-gray-400">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Angelus Vision Section */}
                <section id="vision" className="relative py-32 sm:py-48 px-4 overflow-hidden">
                    <motion.div style={{ y: useTransform(scrollYProgress, [0.8, 1], [-100, 100]) }} className="absolute inset-0 bg-grid-white/[0.03] z-0"></motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-[#010409] z-10"></div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }} className="container mx-auto max-w-5xl text-center relative z-20">
                        <div className="text-center mb-4">
                            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold px-4 py-2 rounded-full tracking-wider">THE ANGELUS INITIATIVE</span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
                           Beyond treatment, we aim for transcendence—engineering a future where disease is a choice and human potential is unbound.
                        </h2>
                    </motion.div>
                </section>

                {/* CTA / Partners Section */}
                <section id="partners" className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <GlowCard className="text-center p-10 md:p-16 rounded-xl border border-blue-500/20">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">Become a Foundational Partner</h2>
                                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">This vision requires a coalition of pioneers. We are seeking partners in healthcare, logistics, insurance, and biotechnology to build this future with us.</p>
                                <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                                    <input type="email" className="w-full px-5 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-colors" placeholder="your.email@organization.com" required />
                                    <button type="submit" className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 whitespace-nowrap">Inquire</button>
                                </form>
                                <p className="text-xs text-gray-600 mt-4">Your inquiry will be kept strictly confidential.</p>
                            </GlowCard>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pt-12 pb-20 px-4">
                    <div className="container mx-auto max-w-6xl text-center text-gray-500">
                        <div className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6">VESPERA SYSTEMS</div>
                        <div className="flex justify-center space-x-6 md:space-x-8 mb-6 text-sm">
                            <a href="#roadmap" className="hover:text-white transition-colors">Vision</a>    
                            <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
                            <a href="#partners" className="hover:text-white transition-colors">Partners</a>
                        </div>

                        <div className="flex justify-center space-x-6 md:space-x-8 mb-6 text-sm">
                            <a href="/" className="gradient-text font-bold transition-colors">Spiritus</a>
                            <Link to="/neha" style={{
                                                                background:
                                                                    "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                                                                WebkitBackgroundClip: "text",
                                                                WebkitTextFillColor: "transparent",
                                                            }}
                                                            className="font-bold">
                                                            NEHA
                                                        </Link>
                            <Link to="/about" style={{
                                                                background:
                                                                    "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                                                                WebkitBackgroundClip: "text",
                                                                WebkitTextFillColor: "transparent",
                                                            }}
                                                            className="font-bold">
                                                            About
                                                        </Link>
                                                        <Link to="/contact" style={{
                                                                background:
                                                                    "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                                                                WebkitBackgroundClip: "text",
                                                                WebkitTextFillColor: "transparent",
                                                            }}
                                                            className="font-bold">
                                                            Contact
                                                        </Link>
                        </div>
                        <p className="text-sm">&copy; {new Date().getFullYear()} Vespera Systems. Engineering the future of humanity's health.</p>
                    </div>
                </footer>
            </main>
        </>
    );
}
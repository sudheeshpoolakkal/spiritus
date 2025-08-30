import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
//import sudhi from "@/assets/private/sudhi-1x1.jpg";
// --- Icon Components (Enhanced & New) ---
const BrainCircuit = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v.7a2.5 2.5 0 0 1-5 .3v-1a2.5 2.5 0 0 0-5 0v1.5a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 1 5 .3v.6a2.5 2.5 0 0 0 5 0v-.7a2.5 2.5 0 0 1-5-.2v1a2.5 2.5 0 0 0 5 0V8a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1-5-.2V5.5A2.5 2.5 0 0 0 12 2Z" />
        <path d="M12 13a2.5 2.5 0 0 0-2.5 2.5v.7a2.5 2.5 0 0 1-5 .3v-1a2.5 2.5 0 0 0-5 0v1.5a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 1 5 .3v.6a2.5 2.5 0 0 0 5 0v-.7a2.5 2.5 0 0 1-5-.2v1a2.5 2.5 0 0 0 5 0v-1.5a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 1-5-.2v-.5a2.5 2.5 0 0 0-2.5-2.5Z" />
        <path d="M4.5 11.5a2.5 2.5 0 0 0 0 5" />
        <path d="M19.5 11.5a2.5 2.5 0 0 1 0 5" />
        <path d="M12 2v2" />
        <path d="M12 11v2" />
        <path d="M12 20v2" />
    </svg>
);
const HeartHandshake = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.82 2.94 0l.06-.06L12 11l2.96-2.96a2.17 2.17 0 0 0 0-3.08v0c-.82-.82-2.13-.82-2.94 0l-.06.06Z" />
    </svg>
);
const Scale = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m16 16-4-4-4 4" />
        <path d="M12 2v12" />
        <path d="M4 12H2" />
        <path d="M10 12H8" />
        <path d="M16 12h-2" />
        <path d="M22 12h-2" />
        <path d="M6 6l-4 4-4-4" />
        <path d="M18 6l4 4-4 4" />
    </svg>
);
const Network = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
        <path d="M12 12V8" />
    </svg>
);
const Car = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14 16.94V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.06" />
        <path d="m10 16-1.3-2.6A1 1 0 0 0 7.8 13H4a1 1 0 0 0-1 1v1" />
        <path d="M14 16h2a1 1 0 0 0 1-1v-1a1 1 0 0 0-.8-1l-2.2-.4" />
        <path d="M5 11h1" />
        <path d="M18 11h1" />
        <path d="m3 9 2.3 2.3" />
        <path d="m19 9-2.3 2.3" />
        <path d="m12 4 1.8 3.6" />
        <path d="m9 2-1.8 3.6" />
        <path d="M12 4V2" />
        <circle cx="12" cy="11" r="1" />
    </svg>
);
const ShieldCheck = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
const Globe = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);
const Dna = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 14.5A3.5 3.5 0 0 1 7.5 11H12" />
        <path d="M16.5 11a3.5 3.5 0 1 1 0 7H12" />
        <path d="M12 11V4.5A3.5 3.5 0 0 1 8.5 8H4" />
        <path d="M12 18v-7" />
        <path d="M8.5 14.5a3.5 3.5 0 1 1 0-7H12" />
    </svg>
);
const KeyRound = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
        <circle cx="16.5" cy="7.5" r=".5" />
    </svg>
);

// --- 3D Tilt Card Component (Effect Disabled) ---
const TiltCard = ({ children, className }) => {
    return <motion.div className={className}>{children}</motion.div>;
};

// --- Main App Component ---
export default function App() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    // Animated text for hero
    const heroTitle = "Next-generation Environment for Human Advancement";
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            },
        },
    };
    const charVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    // --- Gemini API Integration State ---
    const [scenario, setScenario] = useState("");
    const [userInput, setUserInput] = useState("");
    const [perspective, setPerspective] = useState("");
    const [isGeneratingScenario, setIsGeneratingScenario] = useState(false);
    const [isGettingPerspective, setIsGettingPerspective] = useState(false);
    const [error, setError] = useState(null);

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
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // --- Gemini API Call Function ---
    const callGemini = async (
        systemPrompt,
        userPrompt,
        retries = 3,
        delay = 1000
    ) => {
        const apiKey = ""; // Canvas will provide this
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }],
            },
        };

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const candidate = result.candidates?.[0];

                if (candidate && candidate.content?.parts?.[0]?.text) {
                    return candidate.content.parts[0].text;
                } else {
                    throw new Error("Invalid response structure from Gemini API.");
                }
            } catch (err) {
                if (i === retries - 1) {
                    console.error("Gemini API call failed after multiple retries:", err);
                    setError(
                        "Failed to communicate with the AI. Please try again later."
                    );
                    return null;
                }
                await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
            }
        }
    };

    const handleGenerateScenario = async () => {
        setIsGeneratingScenario(true);
        setError(null);
        setPerspective("");
        setUserInput("");
        const systemPrompt =
            "You are a futurist and ethicist. Create a concise, thought-provoking  dilemma (under 60 words) related to symbiotic AI, cognitive augmentation, or data sovereignty in a future where systems like NEHA exist. The scenario should be complex and have no easy answer.";
        const userPrompt = "Generate a new  dilemma.";
        const newScenario = await callGemini(systemPrompt, userPrompt);
        if (newScenario) {
            setScenario(newScenario);
        }
        setIsGeneratingScenario(false);
    };

    const handleGetPerspective = async () => {
        if (!userInput.trim()) {
            setError(
                "Please provide your perspective before seeking NEHA's analysis."
            );
            return;
        }
        setIsGettingPerspective(true);
        setError(null);
        const systemPrompt =
            "You are NEHA, an AI with a Triadic Core: Intelligence (data analysis, logic), Empathy (emotional understanding, nuance), and Wisdom ( discernment, long-term flourishing). A user has been presented with an  dilemma and has provided their perspective. Analyze their response through the lens of your Triadic Core. Do not judge. Instead, offer a balanced, insightful analysis that explores the implications of their viewpoint from each of your core pillars. Be concise and profound.";
        const userPrompt = `The Dilemma: "${scenario}"

The User's Perspective: "${userInput}"

Your Analysis:`;
        const newPerspective = await callGemini(systemPrompt, userPrompt);
        if (newPerspective) {
            setPerspective(newPerspective);
        }
        setIsGettingPerspective(false);
    };

    return (
        <>
            {/* Global Styles and Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Lora:ital,wght@0,400;0;600;1,400&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #010409;
                    color: #E6EDF3;
                }
                .font-serif { font-family: 'Lora', serif; }
                
                /* New Interactive Background */
                .interactive-bg-container {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    z-index: -2;
                    background-color: #010409;
                    overflow: hidden;
                }
                .interactive-bg-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(ellipse at center, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.6;
                }
                .interactive-bg-container::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle 500px at var(--mouse-x-bg) var(--mouse-y-bg), rgba(29, 78, 216, 0.1), transparent 70%);
                }

                /* Card Glow Effect */
                .card-glow {
                    background: rgba(10, 14, 23, 0.5);
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
                .card-glow:before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 0.75rem;
                    border: 1px solid transparent;
                    background: radial-gradient(300px at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.15), transparent 80%) border-box;
                    -webkit-mask: 
                        linear-gradient(#fff 0 0) content-box, 
                        linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
                 .gemini-loader {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #3b82f6;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <main
                ref={ref}
                className="bg-transparent text-gray-200 overflow-x-hidden relative"
            >
                <div className="interactive-bg-container"></div>

                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/10 backdrop-blur-lg border-b border-gray-500/10">
                    <div className="text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        VESPERA{" "}
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 text-sm text-gray-400">
                        <a
                            href="#core"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Triadic Core
                        </a>
                        <a
                            href="#ethics"
                            className="hover:text-white transition-colors duration-300"
                        >
                            {" "}
                            Framework
                        </a>
                        <a
                            href="#dilemmas"
                            className="hover:text-white transition-colors duration-300"
                        >
                            {" "}
                            Dilemmas
                        </a>
                        <a
                            href="#capabilities"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Ecosystem
                        </a>
                        <a
                            href="#vision"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Vision
                        </a>
                        <Link
                            to="/"
                            style={{
                                background:
                                    "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                            className="font-bold"
                        >
                            Spiritus
                        </Link>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="h-screen min-h-[700px] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] z-0"
                    ></motion.div>
                    <div className="z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="mb-6"
                        >
                            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold px-4 py-2 rounded-full tracking-wider">
                                INTRODUCING NEHA
                            </span>
                        </motion.div>
                        <motion.h1
                            variants={titleVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 max-w-4xl mx-auto"
                        >
                            {heroTitle.split("").map((char, index) => (
                                <motion.span key={index} variants={charVariants}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-400"
                        >
                            Guiding human progress by combining powerful intelligence with
                            deep wisdom and emotional intelligence.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                            className="mt-6 max-w-2xl mx-auto text-xl text-blue-300 font-semibold"
                        >
                            The core of Human Advancement
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2, ease: "backOut" }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 35px rgba(59, 130, 246, 0.6)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-12 px-5 py-2 rounded-full text-white font-bold shadow-lg transition-all text-lg"
                            style={{
                                background:
                                    "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                            }}
                        >
                            Discover Vespera
                        </motion.button>
                    </div>
                </section>

                {/* Triadic Core Section */}
                <section id="core" className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                The Triadic Core
                            </h2>

                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                                NEHA is built on three core pillars that work together, creating
                                a powerful foundation for guidance and understanding.
                            </p>
                        </motion.div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: BrainCircuit,
                                    title: "Intelligent Core",
                                    description:
                                        "Using powerful AI to understand complex data from many sources, providing clear, predictive insights that are tailored to you.",
                                },
                                {
                                    icon: HeartHandshake,
                                    title: "Emotional Core",
                                    description:
                                        "Understanding the unspoken—the emotions and nuances in human interaction—to communicate with genuine empathy.",
                                },
                                {
                                    icon: Scale,
                                    title: "Wisdom Core",
                                    description:
                                        "Going beyond data to cultivate inner stillness and help you reach absolute serenity.",
                                },
                            ].map((core, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        delay: i * 0.15,
                                        duration: 0.8,
                                        ease: "easeOut",
                                    }}
                                >
                                    <TiltCard className="card-glow p-8 rounded-xl h-full flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/50 hover:border-blue-500/50">
                                        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
                                            <core.icon className="h-8 w-8 text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-white">
                                            {core.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-base">
                                            {core.description}
                                        </p>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Framework Section */}
                <section id="ethics" className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {" "}
                                Framework
                            </h2>
                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                                Our system is built on core principles that always protect and
                                empower you.
                            </p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: KeyRound,
                                    title: "Cognitive Sovereignty",
                                    description:
                                        "You own and control your personal and biological data. Always.",
                                },
                                {
                                    icon: Dna,
                                    title: "Principled Beneficence",
                                    description:
                                        "Every recommendation is designed to support your long-term health and well-being.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Explainable AI",
                                    description:
                                        "We believe in transparency. You can always understand how and why the system makes its decisions.",
                                },
                                {
                                    icon: Globe,
                                    title: "Collective Flourishing",
                                    description:
                                        "Helping you grow as an individual while also contributing positively to the wider community.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: i * 0.1, duration: 0.7 }}
                                    className="text-center p-6"
                                >
                                    <div className="inline-block p-4 bg-gray-800/50 border border-gray-700 rounded-full mb-5">
                                        <item.icon className="h-8 w-8 text-blue-300" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Gemini-Powered  Dilemmas Section (NEW) --- */}
                <section id="dilemmas" className="py-20 px-4">
                    <div className="container mx-auto max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Explore Dilemmas
                            </h2>
                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                                Think through tough scenarios and see how N.E.H.A.'s core can
                                power Thinking.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="flex justify-center">
                                <button
                                    onClick={handleGenerateScenario}
                                    disabled={isGeneratingScenario}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-blue-300 border-2 border-blue-500/50 hover:bg-blue-500/10 hover:border-blue-500 transition duration-300 disabled:border-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    {isGeneratingScenario ? (
                                        <>
                                            <div className="gemini-loader"></div>
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>✨ Figure out your Mind's processes</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {scenario && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-center bg-gray-900/50 p-6 rounded-lg border border-gray-700 max-w-2xl mx-auto"
                                >
                                    <p className="font-serif text-xl italic text-gray-300">
                                        "{scenario}"
                                    </p>
                                </motion.div>
                            )}

                            {scenario && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full space-y-4 max-w-xl mx-auto"
                                >
                                    <textarea
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="What is your perspective?"
                                        className="w-full px-5 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-colors h-28 resize-none"
                                    />
                                    <button
                                        onClick={handleGetPerspective}
                                        disabled={isGettingPerspective || !userInput}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    >
                                        {isGettingPerspective ? (
                                            <>
                                                <div className="gemini-loader"></div>
                                                <span>Analyzing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <BrainCircuit className="w-5 h-5" />
                                                <span>Get NEHA's Perspective</span>
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )}

                            {error && <p className="text-red-400 text-center">{error}</p>}

                            {perspective && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <h4 className="text-lg font-bold text-center mb-4 text-blue-300">
                                        NEHA's Analysis
                                    </h4>
                                    <div className="text-gray-400 whitespace-pre-wrap leading-relaxed bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                                        {perspective}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Vespera's Ecosystem Section */}
                <section id="capabilities" className="py-20 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Vespera's Integrated Ecosystem
                            </h2>
                            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                                N.E.H.A. helps Vespera connect all aspects of your well-being
                                into one seamless, proactive system of care.
                            </p>
                        </motion.div>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                            {[
                                {
                                    icon: Network,
                                    title: "The Unified Health Continuum",
                                    description:
                                        "Connects your entire health journey, from doctor visits to home care, into one simple, coordinated experience.",
                                },
                                {
                                    icon: Car,
                                    title: "Mobility as a Health Determinant",
                                    description:
                                        "Treats transportation as part of your health, arranging rides for everything from routine check-ups to emergencies.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Proactive Risk Stratification",
                                    description:
                                        "Uses your health and lifestyle data to predict risks and prevent problems before they start, moving beyond reactive care.",
                                },
                                {
                                    icon: Globe,
                                    title: "The Human Operating System",
                                    description:
                                        "Our long-term goal: a global system that helps improve health and share resources for the betterment of all humanity.",
                                },
                            ].map((cap, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="flex items-start space-x-6"
                                >
                                    <div className="flex-shrink-0 p-4 bg-gray-800/50 border border-gray-700 rounded-lg mt-1">
                                        <cap.icon className="h-7 w-7 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {cap.title}
                                        </h3>
                                        <p className="mt-2 text-gray-400">{cap.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <svg
                                className="mx-auto h-12 w-12 text-blue-500/50 mb-6"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6 14.813V24h8.313c0-5.36-4.187-8.75-8.313-9.187zM20 14.813V24h8.313c0-5.36-4.187-8.75-8.313-9.187zM4 8h10.813c2.25 2.375 3.187 4.984 3.187 7.813V26H2V8h2zm18 0h10.813c2.25 2.375 3.187 4.984 3.187 7.813V26H18V8h4z" />
                            </svg>
                            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-200 leading-relaxed italic">
                             “N.E.H.A. is engineered as a system which is free from the noise of the world and the illusions of the mind. In its heart lies the Absolute Silence.”
                            </blockquote>
                            {/* <footer className="mt-8">
                                <img
                                    src={sudhi}
                                    alt="Portrait of Sudheesh P"
                                    className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-blue-600 object-cover transform scale-90"
                                />

                                <p className="text-lg font-semibold text-white">Sudheesh P</p>
                                <p className="text-gray-500">
                                    One without any identity, Vespera Project
                                </p>
                            </footer> */}
                        </motion.div>
                    </div>
                </section>

                {/* Vision Section */}
                <section
                    id="vision"
                    className="relative py-32 sm:py-48 px-4 overflow-hidden"
                >
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0.8, 1], [-100, 100]) }}
                        className="absolute inset-0 bg-grid-white/[0.03] z-0"
                    ></motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-[#010409] z-10"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="container mx-auto max-w-5xl text-center relative z-20"
                    >
                        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
                            Our purpose is not to fashion another tool, but to bring forth a
                            companion that guides you toward the stillness beyond the mind’s
                            illusions.
                        </h2>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section id="cta" className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <TiltCard className="text-center card-glow p-10 md:p-16 rounded-xl border border-blue-500/20">
                                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                    Contribute to the Architecture
                                </h2>
                                <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                                    We're looking for partners in fields like AI ethics,
                                    neuroscience, and secure technology. If our vision resonates
                                    with you, we'd love to talk.
                                </p>
                                <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                                    <input
                                        type="email"
                                        className="w-full px-5 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-colors"
                                        placeholder="your.email@organization.com"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 whitespace-nowrap"
                                    >
                                        Inquire
                                    </button>
                                </form>
                                <p className="text-xs text-gray-600 mt-4">
                                    Your inquiry will be kept strictly confidential.
                                </p>
                            </TiltCard>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pt-12 pb-20 px-4">
                    <div className="container mx-auto max-w-6xl text-center text-gray-500">
                        <div className="text-2xl font-black tracking-widest mb-6">NEHA</div>
                        <div className="flex justify-center space-x-6 md:space-x-8 mb-6 text-sm">
                            <Link
                                to="/"
                                style={{
                                    background:
                                        "linear-gradient(89.58deg, #3186FF 0.28%, #346BF0 44.45%, #4EA0FF 99.55%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                                className="font-bold"
                            >
                                Spiritus
                            </Link>
                            <Link to="/neha" className="hover:text-white transition-colors">
                                Intelligence Module
                            </Link>
                            <a href="#" className="hover:text-white transition-colors">
                                Research
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Media
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Contact
                            </a>
                        </div>
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} Vespera Systems. Building the
                            future of conscious technology.
                        </p>
                    </div>
                </footer>
            </main>
        </>
    );
}

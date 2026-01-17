import React from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Chrome, Brain, Database, Search, FileText, Sparkles, BookOpen } from 'lucide-react';

const Login = () => {
    // Mock login mutation
    const loginMutation = useMutation({
        mutationFn: async (provider) => {
            // Simulate network request
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`Logging in with ${provider}`);
                    resolve({ success: true, user: { name: 'Student' } });
                }, 1000);
            });
        },
        onSuccess: (data) => {
            console.log('Login successful', data);
            // Handle navigation or state update here
        },
    });

    const handleGoogleLogin = () => {
        loginMutation.mutate('google');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex overflow-hidden font-inter">
            {/* Left Side - Bento Grid */}
            <motion.div
                className="hidden lg:flex w-[60%] p-8 items-center justify-center bg-[#111111]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full max-w-4xl max-h-[800px]">

                    {/* Main Large Block - Retrieval */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 row-span-2 bg-[#1a1a1a] rounded-3xl p-6 flex flex-col justify-between border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="z-10">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm">
                                <Database className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-display font-medium mb-2">Intelligent Retrieval</h3>
                            <p className="text-gray-400 text-sm">Access your entire knowledge base instantly with RAG technology.</p>
                        </div>
                        <div className="h-24 w-full bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl mt-4 border border-white/5" />
                    </motion.div>

                    {/* Top Right Block - Yellow/Focus */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 row-span-2 bg-[#fefce8] text-black rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-8 w-8 rounded-full bg-black/10 flex items-center justify-center">
                                <Brain className="w-4 h-4 text-black" />
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider bg-black/5 px-2 py-1 rounded-full">AI Tutor</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-display font-medium leading-tight mb-2">Context-Aware Learning</h3>
                            <p className="text-black/60 font-medium">Ask detailed questions, get answers grounded in your notes.</p>
                        </div>
                    </motion.div>

                    {/* Middle Left - Purple/Speed */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 row-span-2 bg-[#a855f7] rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/30 transition-colors duration-500" />
                        <h3 className="text-3xl font-display font-medium mb-1 relative z-10">Learn Faster.</h3>
                        <h3 className="text-3xl font-display font-medium text-purple-200 relative z-10">Retain More.</h3>
                    </motion.div>

                    {/* Middle Right - Dark/Search */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-2 row-span-1 bg-[#1a1a1a] rounded-3xl p-6 flex items-center gap-4 border border-white/5"
                    >
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Search className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-medium font-display text-lg">Semantic Search</h4>
                            <p className="text-xs text-gray-500">Find concepts, not just keywords</p>
                        </div>
                    </motion.div>

                    {/* Bottom Right - Small 1 */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 row-span-1 bg-[#1a1a1a] rounded-3xl p-4 flex items-center justify-center border border-white/5 hover:bg-[#222] transition-colors"
                    >
                        <FileText className="text-gray-400 w-6 h-6" />
                    </motion.div>

                    {/* Bottom Right - Small 2 */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 row-span-1 bg-white text-black rounded-3xl p-4 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        <Sparkles className="fill-black w-6 h-6" />
                    </motion.div>

                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-[#0a0a0a]">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-display font-bold tracking-tight text-white">Unlock Your Knowledge</h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Sign in to your AI-powered study workspace.
                        </p>
                    </div>

                    <div className="mt-10 space-y-6">

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-[#0a0a0a] px-2 text-gray-500">Continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={loginMutation.isPending}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-4 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loginMutation.isPending ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <Chrome className="h-5 w-5" />
                            )}
                            <span>Log in with Google</span>
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-8">
                            By clicking continue, you agree to our{' '}
                            <a href="#" className="font-semibold text-white hover:text-gray-300">Terms of Service</a>{' '}
                            and{' '}
                            <a href="#" className="font-semibold text-white hover:text-gray-300">Privacy Policy</a>
                        </p>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

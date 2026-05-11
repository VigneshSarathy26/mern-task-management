import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, CheckSquare, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-black p-2 rounded-xl">
              <Layout className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tighter uppercase">Protocol</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Access the Workspace</h1>
          <p className="text-zinc-500 text-sm">Initialize your session to manage the platform.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Password</label>
                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-3">
              Initialize Session <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 space-y-4">
            <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
              <Github className="w-4 h-4" /> Continue with GitHub
            </button>
          </div>
        </motion.div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Don't have an access key? <a href="#" className="text-black font-semibold hover:underline">Contact Administrator</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

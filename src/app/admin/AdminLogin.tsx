import { Link } from 'react-router-dom';

export function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[400px] rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-xl font-semibold tracking-tight text-white">Painel administrativo</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Painel desativado ate a nova API com Neon ser implementada.
        </p>
        <Link to="/" className="mt-8 block text-center text-sm text-zinc-500 hover:text-zinc-300">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}

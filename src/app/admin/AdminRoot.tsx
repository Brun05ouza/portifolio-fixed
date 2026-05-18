import { Link } from 'react-router-dom';

/**
 * O CMS antigo dependia de banco direto no navegador. Ele fica desativado enquanto
 * a nova integracao com backend/Neon nao existir.
 */
export function AdminRoot() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] p-8 text-zinc-100">
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-semibold text-white">Admin</h1>
        <p className="mt-2 text-sm text-zinc-400">
          O painel antigo foi desativado porque a integracao direta com banco foi removida. Para usar o Neon com
          seguranca, este app precisa de uma API/backend entre o navegador e o banco.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm text-cyan-400 hover:underline">
          Voltar ao site
        </Link>
      </div>
    </div>
  );
}

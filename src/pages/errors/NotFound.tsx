import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center space-y-8 px-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-full p-6">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-200">Página Não Encontrada</h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi removida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Voltar ao Início
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
          >
            Página Anterior
          </button>
        </div>
      </div>
    </div>
  );
}

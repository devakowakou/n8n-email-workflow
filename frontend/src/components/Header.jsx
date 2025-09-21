import { Mail, RefreshCw } from 'lucide-react';

const Header = ({ onRefresh, isLoading }) => (
  <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Mail className="w-8 h-8" />
          Gestionnaire d'Emails
        </h1>
        <p className="text-blue-100 mt-1">Interface de consultation des emails du jour</p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors disabled:opacity-50"
        title="Actualiser"
      >
        <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  </header>
);

export default Header;
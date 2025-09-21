import { Bot } from 'lucide-react';

const SummaryCard = ({ summary, isLoading, error }) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      <Bot className="w-6 h-6 text-blue-600" />
      Résumé automatique de la journée
    </h2>
    
    {isLoading && (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Génération du résumé...</span>
      </div>
    )}
    
    {error && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erreur lors du chargement du résumé</p>
      </div>
    )}
    
    {summary && !isLoading && !error && (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="prose prose-sm max-w-none">
          {typeof summary === 'string' ? (
            <p className="whitespace-pre-line">{summary}</p>
          ) : (
            <div>
              <p className="font-medium mb-2">📊 Statistiques:</p>
              <p>• {summary.count || 0} emails reçus</p>
              <p>• {summary.statistics?.nonLus || 0} emails non lus</p>
              <p>• {summary.statistics?.expediteursUniques || 0} expéditeurs uniques</p>
              {summary.resumeIA && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium mb-2">🤖 Résumé IA:</p>
                  <p className="text-gray-700">{summary.resumeIA}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export default SummaryCard;
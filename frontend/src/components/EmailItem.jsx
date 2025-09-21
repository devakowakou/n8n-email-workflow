import { User, Calendar, Send } from 'lucide-react';

const EmailItem = ({ email, onReply }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return '';
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p className="text-sm font-medium text-blue-600 truncate">{email.expediteur || email.sender}</p>
            {email.isUnread && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Non lu</span>
            )}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {email.objet || email.subject}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {truncateContent(email.contenu || email.snippet)}
          </p>
          
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(email.dateReception || email.date)}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={() => onReply(email)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
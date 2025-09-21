import { Mail } from 'lucide-react';
import EmailItem from './EmailItem';

const EmailList = ({ emails, isLoading, error, onReply }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3">Chargement des emails</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des emails</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!emails.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Aucun email trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Emails du jour ({emails.length})
      </h2>
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default EmailList;
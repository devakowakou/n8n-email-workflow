import { useState, useEffect } from 'react';
import { X, Check, Send } from 'lucide-react';

const ReplyModal = ({ isOpen, email, onClose, onSend }) => {
  const [replyData, setReplyData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    if (email && isOpen) {
      setReplyData({
        to: email.expediteur || email.sender || '',
        subject: `Re: ${email.objet || email.subject || ''}`,
        message: ''
      });
      setSendStatus(null);
    }
  }, [email, isOpen]);

  const handleSend = async () => {
    setIsSending(true);
    
    try {
      const success = await onSend(replyData);
      if (success) {
        setSendStatus({ type: 'success', message: 'Email envoyé avec succès!' });
        setTimeout(() => {
          onClose();
          setSendStatus(null);
        }, 2000);
      } else {
        setSendStatus({ type: 'error', message: 'Erreur lors de l\'envoi' });
      }
    } catch (error) {
      setSendStatus({ type: 'error', message: error.message });
    } finally {
      setIsSending(false);
    }
  };

  const generateAutoReply = () => {
    setReplyData(prev => ({
      ...prev,
      message: `Bonjour,\n\nMerci pour votre message. J'ai bien reçu votre email concernant "${email?.objet || email?.subject || ''}" et vous recontacterai dans les plus brefs délais.\n\nCordialement`
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Répondre à l'email</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {sendStatus && (
            <div className={`mb-4 p-4 rounded-lg ${
              sendStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                {sendStatus.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                {sendStatus.message}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">À :</label>
              <input
                type="email"
                value={replyData.to}
                onChange={(e) => setReplyData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objet :</label>
              <input
                type="text"
                value={replyData.subject}
                onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Message :</label>
                <button
                  type="button"
                  onClick={generateAutoReply}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                Réponse auto
                </button>
              </div>
              <textarea
                value={replyData.message}
                onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Votre message..."
                required
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSending}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Envoyer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
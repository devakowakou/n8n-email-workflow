import { useState, useEffect } from 'react';

import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import SummaryCard from './components/SummaryCard';
import EmailList from './components/EmailList';
import ReplyModal from './components/ReplyModal';

import { fetchEmails, sendEmailReply } from './services/api';

const App = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [summary, setSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const loadEmails = async () => {
    setIsLoading(true);
    setError(null);
    setSummaryLoading(true);
    setSummaryError(null);
    
    try {
      const data = await fetchEmails();
      setEmails(data.emails);
      setSummary(data);
    } catch (err) {
      setError(err.message);
      setSummaryError(err.message);
    } finally {
      setIsLoading(false);
      setSummaryLoading(false);
    }
  };

  const sendReply = async (replyData) => {
    await sendEmailReply(replyData);
    return true;
  };

  useEffect(() => {
    let filtered = emails;
    
    if (searchTerm) {
      filtered = filtered.filter(email => {
        const searchFields = [
          email.expediteur || email.sender || '',
          email.objet || email.subject || '',
          email.contenu || email.snippet || ''
        ];
        return searchFields.some(field => 
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    // Filtre par type
    if (filterType === 'unread') {
      filtered = filtered.filter(email => email.isUnread);
    } else if (filterType === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(email => {
        const emailDate = new Date(email.dateReception || email.date);
        return emailDate.toDateString() === today;
      });
    }
    
    setFilteredEmails(filtered);
  }, [emails, searchTerm, filterType]);

  useEffect(() => {
    loadEmails();
  }, []);

  const handleRefresh = () => {
    loadEmails();
  };

  const handleReply = (email) => {
    setSelectedEmail(email);
    setIsReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
    setSelectedEmail(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onRefresh={handleRefresh} isLoading={isLoading} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
        
        <SummaryCard
          summary={summary}
          isLoading={summaryLoading}
          error={summaryError}
        />
        
        <EmailList
          emails={filteredEmails}
          isLoading={isLoading}
          error={error}
          onReply={handleReply}
        />
      </main>
      
      <ReplyModal
        isOpen={isReplyModalOpen}
        email={selectedEmail}
        onClose={handleCloseReplyModal}
        onSend={sendReply}
      />
    </div>
  );
};

export default App;
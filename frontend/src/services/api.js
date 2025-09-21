const API_BASE = import.meta.env.VITE_API_BASE;

export const API_ENDPOINTS = {
  emails: `${API_BASE}/emails`,
  sendReply: `${API_BASE}/api/send-reply`
};

export const fetchEmails = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.emails);
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.emails && Array.isArray(data.emails)) {
      return data;
    } else {
      throw new Error('Format de données invalide');
    }
  } catch (error) {
    console.error('Erreur chargement emails:', error);
    throw error;
  }
};

export const sendEmailReply = async (replyData) => {
  try {
    const response = await fetch(API_ENDPOINTS.sendReply, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(replyData),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi');
    }
    
    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw error;
  }
};
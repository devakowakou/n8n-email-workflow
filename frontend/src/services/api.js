const API_BASE = import.meta.env.VITE_API_BASE;

export const API_ENDPOINTS = {
  emails: `${API_BASE}/emails`,
  sendReply: `${API_BASE}/api/send-reply`
};

// Fonction utilitaire pour requêtes API
async function apiRequest(url, options = {}, errorMsg = 'Erreur API') {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status}: ${response.statusText})`);
    }
    // Si pas de contenu (ex: 204), ne pas parser JSON
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.error(errorMsg + ':', error);
    throw error;
  }
}

export const fetchEmails = async () => {
  const data = await apiRequest(API_ENDPOINTS.emails, {}, 'Erreur chargement emails');
  if (data.emails && Array.isArray(data.emails)) {
    return data;
  } else {
    throw new Error('Format de données invalide');
  }
};

export const sendEmailReply = async (replyData) => {
  await apiRequest(
    API_ENDPOINTS.sendReply,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(replyData),
    },
    "Erreur lors de l'envoi"
  );
  return true;
};
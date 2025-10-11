export interface Message {
  id: string
  type: "ai" | "user" | "options"
  content: string
  timestamp: Date
  options?: string[]
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export interface StoredChat {
  id: string
  title: string
  messages: Message[]
  createdAt: string
  lastUpdated: string
}

const STORAGE_KEY = 'valentino-session-chats';

export const saveChatsToStorage = (chats: Chat[]): void => {
  try {
    const storedChats: StoredChat[] = chats.map(chat => ({
      ...chat,
      createdAt: chat.createdAt.toISOString(),
      lastUpdated: new Date().toISOString()
    }));
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storedChats));
    console.log('Chats saved to sessionStorage:', storedChats.length);
  } catch (error) {
    console.error('Error saving chats to sessionStorage:', error);
  }
};

export const loadChatsFromStorage = (): Chat[] => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('No chats found in sessionStorage');
      return [];
    }
    
    const storedChats: StoredChat[] = JSON.parse(stored);
    const chats: Chat[] = storedChats.map(chat => ({
      ...chat,
      createdAt: new Date(chat.createdAt),
      messages: chat.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
    
    console.log('Chats loaded from sessionStorage:', chats.length);
    return chats;
  } catch (error) {
    console.error('Error loading chats from sessionStorage:', error);
    return [];
  }
};

export const saveSingleChat = (chat: Chat): void => {
  try {
    const chats = loadChatsFromStorage();
    const updatedChats = chats.map(c => c.id === chat.id ? chat : c);
    
    // If chat doesn't exist, add it
    if (!chats.find(c => c.id === chat.id)) {
      updatedChats.push(chat);
    }
    
    saveChatsToStorage(updatedChats);
    console.log('Single chat saved:', chat.id);
  } catch (error) {
    console.error('Error saving single chat:', error);
  }
};

export const deleteChatFromStorage = (chatId: string): void => {
  try {
    const chats = loadChatsFromStorage();
    const updatedChats = chats.filter(c => c.id !== chatId);
    saveChatsToStorage(updatedChats);
    console.log('Chat deleted from storage:', chatId);
  } catch (error) {
    console.error('Error deleting chat from storage:', error);
  }
};

export const clearAllChats = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    console.log('All chats cleared from sessionStorage');
  } catch (error) {
    console.error('Error clearing all chats:', error);
  }
};

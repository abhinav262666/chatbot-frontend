import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [webSearch, setWebSearch] = useState(false);

  // Placeholder chat list
  const chats = [
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn">+ New Chat</button>
      </div>
      <div className="chat-list">
        {chats.map(chat => (
          <div className="chat-item" key={chat.id}>{chat.name}</div>
        ))}
      </div>
      <div className="sidebar-footer">
        <button className="add-docs-btn">+ Add Docs</button>
        <div className="websearch-switch">
          <label>
            Web Search
            <input
              type="checkbox"
              checked={webSearch}
              onChange={() => setWebSearch(v => !v)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 
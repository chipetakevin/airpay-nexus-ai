
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

interface WhatsAppChatViewProps {
  messages: Message[];
  currentInput: string;
  setCurrentInput: (value: string) => void;
  onSendMessage: () => void;
}

const WhatsAppChatView: React.FC<WhatsAppChatViewProps> = ({
  messages,
  currentInput,
  setCurrentInput,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <>
      <div className="p-2 space-y-2 bg-gray-100 min-h-full">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-2 py-1 rounded-lg text-xs ${
              msg.type === 'user' 
                ? 'bg-green-600 text-white rounded-br-none' 
                : 'bg-white text-gray-900 rounded-bl-none shadow'
            }`}>
              <p className="whitespace-pre-line">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'user' ? 'text-green-200' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-white border-t flex items-center gap-2 sticky bottom-0">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-2 py-1 text-xs border rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <Button 
          onClick={onSendMessage}
          size="sm"
          className="rounded-full bg-green-600 hover:bg-green-700 w-6 h-6 p-0"
          disabled={!currentInput.trim()}
        >
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </>
  );
};

export default WhatsAppChatView;

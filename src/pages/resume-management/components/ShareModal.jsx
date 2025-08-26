import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, resume }) => {
  const [shareUrl] = useState(`https://resumebuilder.com/share/${resume?.id || 'abc123'}`);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Hi! I'd like to share my resume "${resume?.title || 'My Resume'}" with you. Please take a look and let me know your thoughts.`);

  if (!isOpen || !resume) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleSendEmail = () => {
    // Simulate email sending
    console.log('Sending email to:', email);
    onClose();
  };

  const shareOptions = [
    { name: 'LinkedIn', icon: 'Linkedin', color: 'bg-blue-600' },
    { name: 'Twitter', icon: 'Twitter', color: 'bg-blue-400' },
    { name: 'Facebook', icon: 'Facebook', color: 'bg-blue-700' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: 'bg-green-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Share Resume</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Share URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Share Link
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUrl}
                iconName={copied ? "Check" : "Copy"}
                iconPosition="left"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Social Share */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Share on Social Media
            </label>
            <div className="grid grid-cols-4 gap-3">
              {shareOptions?.map((option) => (
                <button
                  key={option?.name}
                  className={`${option?.color} text-white p-3 rounded-lg hover:opacity-90 transition-opacity duration-150 flex flex-col items-center space-y-1`}
                >
                  <Icon name={option?.icon} size={20} />
                  <span className="text-xs">{option?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Email Share */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Send via Email
            </label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Add a personal message..."
            />
            <Button
              variant="default"
              onClick={handleSendEmail}
              disabled={!email}
              iconName="Send"
              iconPosition="left"
              fullWidth
            >
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
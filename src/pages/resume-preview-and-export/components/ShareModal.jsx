import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const ShareModal = ({ isOpen, onClose, resumeTitle }) => {
  const [shareUrl] = useState(`https://resumebuilder.com/share/john-doe-resume-2025`);
  const [expiryDays, setExpiryDays] = useState('30');
  const [requirePassword, setRequirePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [allowDownload, setAllowDownload] = useState(true);
  const [trackViews, setTrackViews] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Resume: ${resumeTitle}`);
    const body = encodeURIComponent(`Hi,\n\nI'm sharing my resume with you. You can view it at:\n${shareUrl}\n\nBest regards`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSocialShare = (platform) => {
    const text = encodeURIComponent(`Check out my professional resume: ${resumeTitle}`);
    const url = encodeURIComponent(shareUrl);
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Share Resume</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="h-8 w-8 p-0"
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Share URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Share Link</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-muted focus:outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyUrl}
                iconName={copied ? "Check" : "Copy"}
                className="px-3"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Share Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <label className="text-sm text-foreground min-w-[100px]">Expires in:</label>
                <select
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e?.target?.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="never">Never</option>
                </select>
              </div>

              <Checkbox
                label="Require password"
                checked={requirePassword}
                onChange={(e) => setRequirePassword(e?.target?.checked)}
              />

              {requirePassword && (
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e?.target?.value)}
                  className="ml-6"
                />
              )}

              <Checkbox
                label="Allow downloads"
                description="Recipients can download the resume"
                checked={allowDownload}
                onChange={(e) => setAllowDownload(e?.target?.checked)}
              />

              <Checkbox
                label="Track views"
                description="Get notified when someone views your resume"
                checked={trackViews}
                onChange={(e) => setTrackViews(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Quick Share Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Quick Share</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailShare}
                iconName="Mail"
                iconPosition="left"
                fullWidth
              >
                Email
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('linkedin')}
                iconName="Linkedin"
                iconPosition="left"
                fullWidth
              >
                LinkedIn
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('twitter')}
                iconName="Twitter"
                iconPosition="left"
                fullWidth
              >
                Twitter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSocialShare('facebook')}
                iconName="Facebook"
                iconPosition="left"
                fullWidth
              >
                Facebook
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              fullWidth
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
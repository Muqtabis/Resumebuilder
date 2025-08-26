import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ resumeData, onSave }) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'
  const [lastSaved, setLastSaved] = useState(new Date());

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [resumeData]);

  const handleAutoSave = async () => {
    if (saveStatus === 'saving') return;

    setSaveStatus('saving');
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as backup
      localStorage.setItem('resume_draft', JSON.stringify({
        ...resumeData,
        lastSaved: new Date()?.toISOString()
      }));

      if (onSave) {
        await onSave(resumeData);
      }

      setSaveStatus('saved');
      setLastSaved(new Date());
    } catch (error) {
      setSaveStatus('error');
      console.error('Auto-save failed:', error);
    }
  };

  const handleManualSave = () => {
    handleAutoSave();
  };

  const formatLastSaved = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return date?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
  };

  const getStatusConfig = () => {
    switch (saveStatus) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          className: 'text-warning animate-spin'
        };
      case 'saved':
        return {
          icon: 'CheckCircle',
          text: `Saved ${formatLastSaved(lastSaved)}`,
          className: 'text-success'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Save failed',
          className: 'text-error'
        };
      default:
        return {
          icon: 'Save',
          text: 'Not saved',
          className: 'text-muted-foreground'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-2 mb-4">
      <div className="flex items-center space-x-2">
        <Icon 
          name={statusConfig?.icon} 
          size={16} 
          className={statusConfig?.className}
        />
        <span className="text-sm text-foreground">
          {statusConfig?.text}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {saveStatus === 'error' && (
          <button
            onClick={handleManualSave}
            className="text-xs text-primary hover:text-primary/80 transition-colors duration-150"
          >
            Retry
          </button>
        )}
        
        <button
          onClick={handleManualSave}
          disabled={saveStatus === 'saving'}
          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 disabled:opacity-50"
        >
          <Icon name="Save" size={14} />
          <span>Save Now</span>
        </button>
      </div>
    </div>
  );
};

export default AutoSaveIndicator;
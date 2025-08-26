import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'default', loading = false }) => {
  if (!isOpen) return null;

  const getIconAndColor = () => {
    switch (type) {
      case 'delete':
        return { icon: 'Trash2', color: 'text-error' };
      case 'archive':
        return { icon: 'Archive', color: 'text-warning' };
      case 'share':
        return { icon: 'Share2', color: 'text-primary' };
      default:
        return { icon: 'AlertCircle', color: 'text-muted-foreground' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${color}`}>
              <Icon name={icon} size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{message}</p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant={type === 'delete' ? 'destructive' : 'default'}
              onClick={onConfirm}
              loading={loading}
            >
              {type === 'delete' ? 'Delete' : 'Confirm'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
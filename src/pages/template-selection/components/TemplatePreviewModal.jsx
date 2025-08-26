import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplatePreviewModal = ({ template, isOpen, onClose, onSelect }) => {
  if (!isOpen || !template) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleSelectTemplate = () => {
    onSelect(template);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-elevation-3">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{template?.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {template?.industries?.join(", ")} • {template?.experienceLevel}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(90vh-140px)]">
          {/* Preview Image */}
          <div className="flex-1 p-6 bg-muted flex items-center justify-center overflow-auto">
            <div className="max-w-md w-full">
              <Image
                src={template?.fullPreviewImage}
                alt={`${template?.name} full preview`}
                className="w-full h-auto rounded-lg shadow-elevation-2"
              />
            </div>
          </div>

          {/* Template Details */}
          <div className="lg:w-80 p-6 border-l border-border overflow-auto">
            <div className="space-y-6">
              {/* Features */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Features</h3>
                <div className="space-y-2">
                  {template?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Customization</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Palette" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Colors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Type" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Fonts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Layout" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Layout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Move" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Sections</span>
                  </div>
                </div>
              </div>

              {/* Export Formats */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Export Formats</h3>
                <div className="flex flex-wrap gap-2">
                  {template?.exportFormats?.map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Downloads</div>
                    <div className="font-medium text-foreground">{template?.downloads}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Rating</div>
                    <div className="font-medium text-foreground flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span>{template?.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {template?.isATSFriendly && (
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} className="text-success" />
                <span>ATS Friendly</span>
              </div>
            )}
            {template?.isPopular && (
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <span>Popular Choice</span>
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSelectTemplate}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Use This Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewModal;
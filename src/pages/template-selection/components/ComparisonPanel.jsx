import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ selectedTemplates, onRemoveTemplate, onSelectTemplate, onClearAll }) => {
  if (selectedTemplates?.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevation-3 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="GitCompare" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">
              Compare Templates ({selectedTemplates?.length}/3)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              iconName="X"
            >
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTemplates?.map((template) => (
            <div
              key={template?.id}
              className="bg-muted rounded-lg p-3 relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => onRemoveTemplate(template?.id)}
                className="absolute top-1 right-1 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-150"
              >
                <Icon name="X" size={12} />
              </button>

              <div className="flex space-x-3">
                {/* Template Thumbnail */}
                <div className="w-16 h-20 bg-card rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={template?.previewImage}
                    alt={`${template?.name} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Template Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {template?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template?.industries?.[0]} • {template?.experienceLevel}
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={10} />
                      <span>{template?.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={10} className="text-warning fill-current" />
                      <span>{template?.rating}</span>
                    </div>
                    {template?.isATSFriendly && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={10} className="text-success" />
                        <span>ATS</span>
                      </div>
                    )}
                  </div>

                  {/* Select Button */}
                  <Button
                    variant="default"
                    size="xs"
                    onClick={() => onSelectTemplate(template)}
                    className="mt-2 w-full"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Placeholder */}
          {selectedTemplates?.length < 3 && (
            <div className="bg-muted rounded-lg p-3 border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">
                  Select up to {3 - selectedTemplates?.length} more templates to compare
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
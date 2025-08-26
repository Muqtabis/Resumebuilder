import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onPreview, onSelect, isSelected }) => {
  const handlePreviewClick = (e) => {
    e?.stopPropagation();
    onPreview(template);
  };

  const handleSelectClick = (e) => {
    e?.stopPropagation();
    onSelect(template);
  };

  return (
    <div 
      className={`group relative bg-card border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-elevation-2 hover:scale-105 cursor-pointer ${
        isSelected ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
      }`}
      onClick={handlePreviewClick}
    >
      {/* Template Preview Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={template?.previewImage}
          alt={`${template?.name} resume template preview`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewClick}
              iconName="Eye"
              className="bg-white text-foreground hover:bg-gray-50"
            >
              Preview
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSelectClick}
              iconName="Check"
            >
              Select
            </Button>
          </div>
        </div>

        {/* Popular Badge */}
        {template?.isPopular && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </div>
        )}

        {/* ATS Badge */}
        {template?.isATSFriendly && (
          <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>ATS</span>
          </div>
        )}
      </div>
      {/* Template Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{template?.name}</h3>
        
        {/* Industry Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {template?.industries?.slice(0, 2)?.map((industry) => (
            <span
              key={industry}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {industry}
            </span>
          ))}
          {template?.industries?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{template?.industries?.length - 2}
            </span>
          )}
        </div>

        {/* Experience Level */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="User" size={14} />
            <span>{template?.experienceLevel}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Download" size={14} />
            <span>{template?.downloads}</span>
          </span>
        </div>

        {/* Mobile Select Button */}
        <div className="mt-3 md:hidden">
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            fullWidth
            onClick={handleSelectClick}
            iconName={isSelected ? "Check" : "Plus"}
          >
            {isSelected ? "Selected" : "Select Template"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
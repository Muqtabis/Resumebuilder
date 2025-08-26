import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResumeCard = ({ resume, onEdit, onDuplicate, onShare, onArchive, onDelete, isSelected, onSelect }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-success text-success-foreground';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      case 'shared':
        return 'bg-primary text-primary-foreground';
      case 'archived':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-200 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {/* Header with checkbox and actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(resume?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg truncate">{resume?.title}</h3>
            <p className="text-sm text-muted-foreground">{resume?.template}</p>
          </div>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
            className="p-1"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
          
          {showActions && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowActions(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
                <div className="py-1">
                  <button
                    onClick={() => { onEdit(resume?.id); setShowActions(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="Edit3" size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => { onDuplicate(resume?.id); setShowActions(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="Copy" size={14} />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => { onShare(resume?.id); setShowActions(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="Share2" size={14} />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => { onArchive(resume?.id); setShowActions(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    <Icon name="Archive" size={14} />
                    <span>Archive</span>
                  </button>
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => { onDelete(resume?.id); setShowActions(false); }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted"
                  >
                    <Icon name="Trash2" size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Resume Preview */}
      <div className="mb-4">
        <div className="aspect-[8.5/11] bg-muted rounded-lg overflow-hidden border border-border">
          <Image
            src={resume?.thumbnail}
            alt={`${resume?.title} preview`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Status and Info */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resume?.status)}`}>
          {resume?.status?.charAt(0)?.toUpperCase() + resume?.status?.slice(1)}
        </span>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {resume?.views > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{resume?.views}</span>
            </div>
          )}
          {resume?.downloads > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>{resume?.downloads}</span>
            </div>
          )}
        </div>
      </div>
      {/* Tags */}
      {resume?.tags && resume?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {resume?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {resume?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{resume?.tags?.length - 3}
            </span>
          )}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Modified {formatDate(resume?.lastModified)}</span>
        <Link
          to="/resume-builder"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Open
        </Link>
      </div>
    </div>
  );
};

export default ResumeCard;
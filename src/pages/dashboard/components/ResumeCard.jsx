import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResumeCard = ({ resume, onDuplicate, onShare, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleAction = (action, resumeId) => {
    handleMenuClose();
    switch(action) {
      case 'duplicate':
        onDuplicate(resumeId);
        break;
      case 'share':
        onShare(resumeId);
        break;
      case 'delete':
        onDelete(resumeId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Resume Preview */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <Image
          src={resume?.thumbnail}
          alt={`${resume?.name} preview`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <Link to={`/resume-builder?id=${resume?.id}`}>
              <Button variant="default" size="sm" iconName="Edit3" iconPosition="left">
                Edit
              </Button>
            </Link>
            <Link to={`/resume-preview-and-export?id=${resume?.id}`}>
              <Button variant="outline" size="sm" iconName="Eye" iconPosition="left" className="bg-card">
                View
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Badge */}
        {resume?.status && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              resume?.status === 'active' ?'bg-success text-success-foreground' 
                : resume?.status === 'draft' ?'bg-warning text-warning-foreground' :'bg-secondary text-secondary-foreground'
            }`}>
              {resume?.status?.charAt(0)?.toUpperCase() + resume?.status?.slice(1)}
            </span>
          </div>
        )}
      </div>
      {/* Resume Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-1">
              {resume?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {resume?.template} • Updated {formatDate(resume?.lastModified)}
            </p>
          </div>
          
          {/* More Actions Menu */}
          <div className="relative ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMenuToggle}
              className="w-8 h-8 p-0"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>

            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={handleMenuClose}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
                  <div className="py-1">
                    <button 
                      onClick={() => handleAction('duplicate', resume?.id)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                    >
                      <Icon name="Copy" size={16} />
                      <span>Duplicate</span>
                    </button>
                    <button 
                      onClick={() => handleAction('share', resume?.id)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                    >
                      <Icon name="Share2" size={16} />
                      <span>Share</span>
                    </button>
                    <Link 
                      to={`/resume-preview-and-export?id=${resume?.id}`}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                      onClick={handleMenuClose}
                    >
                      <Icon name="Download" size={16} />
                      <span>Download</span>
                    </Link>
                    <div className="border-t border-border my-1" />
                    <button 
                      onClick={() => handleAction('delete', resume?.id)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-muted transition-colors duration-150"
                    >
                      <Icon name="Trash2" size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{resume?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{resume?.downloads}</span>
            </div>
          </div>
          {resume?.shared && (
            <div className="flex items-center space-x-1 text-primary">
              <Icon name="Share2" size={14} />
              <span>Shared</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
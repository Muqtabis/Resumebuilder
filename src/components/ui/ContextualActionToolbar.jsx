import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const ContextualActionToolbar = () => {
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsExporting(false);
  };

  const handleShare = () => {
    // Share functionality
    console.log('Share resume');
  };

  const handlePreview = () => {
    // Preview functionality
    console.log('Preview resume');
  };

  // Show toolbar only on specific routes
  const showToolbar = ['/resume-builder', '/resume-preview-and-export']?.includes(location?.pathname);

  if (!showToolbar) return null;

  // Different actions based on current route
  const isBuilderPage = location?.pathname === '/resume-builder';
  const isPreviewPage = location?.pathname === '/resume-preview-and-export';

  return (
    <>
      {/* Desktop Toolbar */}
      <div className="hidden md:block fixed top-20 right-6 z-50">
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-2 backdrop-blur-light">
          <div className="flex flex-col space-y-2">
            {isBuilderPage && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                  className="justify-start"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreview}
                  iconName="Eye"
                  iconPosition="left"
                  className="justify-start"
                >
                  Preview
                </Button>
              </>
            )}
            {isPreviewPage && (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleExport}
                  loading={isExporting}
                  iconName="Download"
                  iconPosition="left"
                  className="justify-start"
                >
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  iconName="Share2"
                  iconPosition="left"
                  className="justify-start"
                >
                  Share
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Buttons */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <div className="flex flex-col space-y-3">
          {isBuilderPage && (
            <>
              <Button
                variant="default"
                size="icon"
                onClick={handleSave}
                loading={isSaving}
                className="w-12 h-12 rounded-full shadow-elevation-2 hover:scale-105 transition-transform duration-150"
              >
                <Icon name="Save" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreview}
                className="w-12 h-12 rounded-full shadow-elevation-2 hover:scale-105 transition-transform duration-150 bg-card"
              >
                <Icon name="Eye" size={20} />
              </Button>
            </>
          )}
          {isPreviewPage && (
            <>
              <Button
                variant="default"
                size="icon"
                onClick={handleExport}
                loading={isExporting}
                className="w-12 h-12 rounded-full shadow-elevation-2 hover:scale-105 transition-transform duration-150"
              >
                <Icon name="Download" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="w-12 h-12 rounded-full shadow-elevation-2 hover:scale-105 transition-transform duration-150 bg-card"
              >
                <Icon name="Share2" size={20} />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContextualActionToolbar;
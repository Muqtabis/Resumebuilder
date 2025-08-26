import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const PreviewToolbar = ({ 
  zoomLevel, 
  onZoomIn, 
  onZoomOut, 
  onZoomReset,
  currentPage,
  totalPages,
  onPageChange,
  onToggleFullscreen,
  isFullscreen 
}) => {
  const [showPageInput, setShowPageInput] = useState(false);
  const [pageInputValue, setPageInputValue] = useState(currentPage?.toString());

  const handlePageInputSubmit = (e) => {
    e?.preventDefault();
    const pageNum = parseInt(pageInputValue);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
    setShowPageInput(false);
    setPageInputValue(currentPage?.toString());
  };

  const handlePageInputCancel = () => {
    setShowPageInput(false);
    setPageInputValue(currentPage?.toString());
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-3 shadow-elevation-1">
      {/* Zoom Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          disabled={zoomLevel <= 50}
          iconName="ZoomOut"
          className="h-8 w-8 p-0"
        />
        <span className="text-sm font-medium text-foreground min-w-[60px] text-center">
          {zoomLevel}%
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          disabled={zoomLevel >= 200}
          iconName="ZoomIn"
          className="h-8 w-8 p-0"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onZoomReset}
          className="text-xs px-2 h-8"
        >
          Reset
        </Button>
      </div>
      {/* Page Navigation */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          iconName="ChevronLeft"
          className="h-8 w-8 p-0"
        />
        
        {showPageInput ? (
          <form onSubmit={handlePageInputSubmit} className="flex items-center space-x-1">
            <input
              type="number"
              value={pageInputValue}
              onChange={(e) => setPageInputValue(e?.target?.value)}
              className="w-12 h-8 text-center text-sm border border-border rounded px-1 focus:outline-none focus:ring-2 focus:ring-ring"
              min="1"
              max={totalPages}
              autoFocus
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              iconName="Check"
              className="h-8 w-8 p-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePageInputCancel}
              iconName="X"
              className="h-8 w-8 p-0"
            />
          </form>
        ) : (
          <button
            onClick={() => setShowPageInput(true)}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-150 px-2 py-1 rounded"
          >
            {currentPage} of {totalPages}
          </button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          iconName="ChevronRight"
          className="h-8 w-8 p-0"
        />
      </div>
      {/* View Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFullscreen}
          iconName={isFullscreen ? "Minimize2" : "Maximize2"}
          className="h-8 w-8 p-0"
        />
      </div>
    </div>
  );
};

export default PreviewToolbar;
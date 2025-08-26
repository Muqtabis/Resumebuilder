import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy, 
  filterBy, 
  setFilterBy,
  viewMode,
  setViewMode,
  selectedCount,
  onBulkAction
}) => {
  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'template', label: 'Template Type' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Resumes' },
    { value: 'complete', label: 'Complete' },
    { value: 'draft', label: 'Draft' },
    { value: 'shared', label: 'Shared' },
    { value: 'archived', label: 'Archived' }
  ];

  const bulkActions = [
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'share', label: 'Share Selected', icon: 'Share2' },
    { value: 'archive', label: 'Archive Selected', icon: 'Archive' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and View Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            placeholder="Sort by..."
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
          <Select
            placeholder="Filter by status..."
            options={filterOptions}
            value={filterBy}
            onChange={setFilterBy}
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedCount > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {selectedCount} resume{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <div className="flex flex-wrap gap-2">
            {bulkActions?.map((action) => (
              <Button
                key={action?.value}
                variant={action?.value === 'delete' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => onBulkAction(action?.value)}
                iconName={action?.icon}
                iconPosition="left"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
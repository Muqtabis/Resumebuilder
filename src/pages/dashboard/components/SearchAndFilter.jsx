import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, totalResumes = 0 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'All Resumes', count: totalResumes },
    { id: 'recent', label: 'Recent', count: 8 },
    { id: 'favorites', label: 'Favorites', count: 3 },
    { id: 'shared', label: 'Shared', count: 2 },
    { id: 'draft', label: 'Drafts', count: 1 }
  ];

  const sortOptions = [
    { id: 'modified', label: 'Last Modified' },
    { id: 'created', label: 'Date Created' },
    { id: 'name', label: 'Name A-Z' },
    { id: 'views', label: 'Most Viewed' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilter(filterId);
    setIsFilterOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex items-center space-x-3">
          {/* Filter Tabs - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {filters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => handleFilterChange(filter?.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                  activeFilter === filter?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {filter?.label}
                <span className="ml-1 text-xs opacity-75">({filter?.count})</span>
              </button>
            ))}
          </div>

          {/* Filter Dropdown - Mobile */}
          <div className="lg:hidden relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              iconName="Filter"
              iconPosition="left"
            >
              {filters?.find(f => f?.id === activeFilter)?.label}
            </Button>

            {isFilterOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-3 z-50">
                  <div className="py-1">
                    {filters?.map((filter) => (
                      <button
                        key={filter?.id}
                        onClick={() => handleFilterChange(filter?.id)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors duration-150 ${
                          activeFilter === filter?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <span>{filter?.label}</span>
                        <span className="text-xs opacity-75">({filter?.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sort */}
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowUpDown"
            iconPosition="left"
          >
            <span className="hidden sm:inline">Sort</span>
          </Button>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg p-1">
            <button className="p-1 rounded text-primary bg-primary/10">
              <Icon name="Grid3x3" size={16} />
            </button>
            <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150">
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Active Search/Filter Indicator */}
      {(searchTerm || activeFilter !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>
                {searchTerm ? `Searching for "${searchTerm}"` : ''}
                {searchTerm && activeFilter !== 'all' ? ' in ' : ''}
                {activeFilter !== 'all' ? filters?.find(f => f?.id === activeFilter)?.label : ''}
              </span>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
                onSearch('');
                onFilter('all');
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ filters, activeFilters, onFilterChange, onClearAll }) => {
  const handleChipClick = (filterType, value) => {
    const currentValues = activeFilters?.[filterType] || [];
    const isActive = currentValues?.includes(value);
    
    let newValues;
    if (isActive) {
      newValues = currentValues?.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    onFilterChange(filterType, newValues);
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(values => values?.length > 0);

  return (
    <div className="space-y-4">
      {/* Clear All Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={onClearAll}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 flex items-center space-x-1"
          >
            <Icon name="X" size={14} />
            <span>Clear all filters</span>
          </button>
        </div>
      )}
      {/* Filter Categories */}
      <div className="space-y-3">
        {Object.entries(filters)?.map(([filterType, options]) => (
          <div key={filterType}>
            <h4 className="text-sm font-medium text-foreground mb-2 capitalize">
              {filterType?.replace(/([A-Z])/g, ' $1')?.trim()}
            </h4>
            <div className="flex flex-wrap gap-2">
              {options?.map((option) => {
                const isActive = (activeFilters?.[filterType] || [])?.includes(option?.value);
                return (
                  <button
                    key={option?.value}
                    onClick={() => handleChipClick(filterType, option?.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 hover:scale-105 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      {option?.icon && <Icon name={option?.icon} size={14} />}
                      <span>{option?.label}</span>
                      {isActive && <Icon name="Check" size={12} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Active Filter Summary */}
      {hasActiveFilters && (
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {Object.entries(activeFilters)?.reduce((total, [, values]) => total + values?.length, 0)} filters active
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterChips;
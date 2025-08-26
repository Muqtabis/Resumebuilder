import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search templates by keyword or job title..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions] = useState([
    "Software Engineer",
    "Marketing Manager",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Sales Representative",
    "Business Analyst",
    "Project Manager",
    "Graphic Designer",
    "Financial Analyst"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const filtered = suggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered?.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Icon name="Search" size={20} />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm?.length > 0 && setShowSuggestions(filteredSuggestions?.length > 0)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowSuggestions(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 z-20 max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
                Suggested job titles
              </div>
              {filteredSuggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="Briefcase" size={14} className="text-muted-foreground" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
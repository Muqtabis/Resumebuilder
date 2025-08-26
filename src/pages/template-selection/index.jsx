import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualActionToolbar from '../../components/ui/ContextualActionToolbar';
import TemplateCard from './components/TemplateCard';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import ComparisonPanel from './components/ComparisonPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [comparisonTemplates, setComparisonTemplates] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    experienceLevel: [],
    features: []
  });

  // Mock template data
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop",
      industries: ["Technology", "Finance", "Consulting"],
      experienceLevel: "Mid-Senior",
      downloads: "12.5k",
      rating: 4.8,
      isPopular: true,
      isATSFriendly: true,
      features: ["ATS Optimized", "Clean Layout", "Professional Design", "Easy Customization"],
      exportFormats: ["PDF", "Word", "Plain Text"],
      description: `A clean and modern resume template perfect for professionals in technology, finance, and consulting industries.`
    },
    {
      id: 2,
      name: "Creative Designer",
      previewImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop",
      industries: ["Design", "Marketing", "Creative"],
      experienceLevel: "All Levels",
      downloads: "8.2k",
      rating: 4.6,
      isPopular: false,
      isATSFriendly: false,
      features: ["Creative Layout", "Portfolio Section", "Color Customization", "Visual Elements"],
      exportFormats: ["PDF", "PNG"],
      description: `A vibrant and creative template designed for designers, marketers, and creative professionals.`
    },
    {
      id: 3,
      name: "Executive Leadership",
      previewImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      industries: ["Executive", "Management", "Leadership"],
      experienceLevel: "Senior",
      downloads: "15.1k",
      rating: 4.9,
      isPopular: true,
      isATSFriendly: true,
      features: ["Executive Format", "Achievement Focus", "Leadership Emphasis", "Premium Design"],
      exportFormats: ["PDF", "Word"],
      description: `An elegant template designed specifically for senior executives and leadership positions.`
    },
    {
      id: 4,
      name: "Fresh Graduate",
      previewImage: "https://images.unsplash.com/photo-1494790108755-2616c96c5e24?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1494790108755-2616c96c5e24?w=600&h=800&fit=crop",
      industries: ["Entry Level", "Student", "Internship"],
      experienceLevel: "Entry",
      downloads: "9.7k",
      rating: 4.4,
      isPopular: false,
      isATSFriendly: true,
      features: ["Entry Level Focus", "Education Emphasis", "Skills Highlight", "Clean Design"],
      exportFormats: ["PDF", "Word", "Plain Text"],
      description: `Perfect for recent graduates and entry-level professionals starting their careers.`
    },
    {
      id: 5,
      name: "Healthcare Professional",
      previewImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop",
      industries: ["Healthcare", "Medical", "Nursing"],
      experienceLevel: "Mid-Senior",
      downloads: "6.3k",
      rating: 4.7,
      isPopular: false,
      isATSFriendly: true,
      features: ["Medical Format", "Certification Focus", "Professional Layout", "Industry Specific"],
      exportFormats: ["PDF", "Word"],
      description: `Tailored for healthcare professionals with emphasis on certifications and medical experience.`
    },
    {
      id: 6,
      name: "Tech Specialist",
      previewImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      fullPreviewImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
      industries: ["Technology", "Software", "Engineering"],
      experienceLevel: "All Levels",
      downloads: "11.8k",
      rating: 4.8,
      isPopular: true,
      isATSFriendly: true,
      features: ["Tech Focus", "Skills Matrix", "Project Showcase", "Modern Design"],
      exportFormats: ["PDF", "Word", "Plain Text"],
      description: `Optimized for technology professionals with emphasis on technical skills and projects.`
    }
  ];

  // Filter options
  const filterOptions = {
    industry: [
      { value: "Technology", label: "Technology", icon: "Code" },
      { value: "Design", label: "Design", icon: "Palette" },
      { value: "Healthcare", label: "Healthcare", icon: "Heart" },
      { value: "Finance", label: "Finance", icon: "DollarSign" },
      { value: "Marketing", label: "Marketing", icon: "TrendingUp" },
      { value: "Executive", label: "Executive", icon: "Crown" }
    ],
    experienceLevel: [
      { value: "Entry", label: "Entry Level", icon: "User" },
      { value: "Mid-Senior", label: "Mid-Senior", icon: "Users" },
      { value: "Senior", label: "Senior", icon: "UserCheck" },
      { value: "All Levels", label: "All Levels", icon: "Globe" }
    ],
    features: [
      { value: "ATS", label: "ATS Friendly", icon: "Shield" },
      { value: "Creative", label: "Creative Design", icon: "Palette" },
      { value: "Professional", label: "Professional", icon: "Briefcase" },
      { value: "Modern", label: "Modern Layout", icon: "Zap" }
    ]
  };

  // Sort options
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "downloads", label: "Most Downloaded" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" }
  ];

  // Filter and search templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(template =>
        template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        template?.industries?.some(industry => 
          industry?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        ) ||
        template?.experienceLevel?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filters
    Object.entries(activeFilters)?.forEach(([filterType, values]) => {
      if (values?.length > 0) {
        filtered = filtered?.filter(template => {
          switch (filterType) {
            case 'industry':
              return values?.some(value => 
                template?.industries?.some(industry => industry?.includes(value))
              );
            case 'experienceLevel':
              return values?.includes(template?.experienceLevel);
            case 'features':
              return values?.some(value => {
                if (value === 'ATS') return template?.isATSFriendly;
                if (value === 'Creative') return template?.industries?.includes('Design');
                if (value === 'Professional') return template?.isPopular;
                if (value === 'Modern') return template?.rating >= 4.5;
                return false;
              });
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b?.isPopular ? 1 : 0) - (a?.isPopular ? 1 : 0);
        case 'downloads':
          return parseFloat(b?.downloads) - parseFloat(a?.downloads);
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.id - a?.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [templates, searchTerm, activeFilters, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({
      industry: [],
      experienceLevel: [],
      features: []
    });
    setSearchTerm('');
  };

  const handleTemplatePreview = (template) => {
    setPreviewTemplate(template);
    setIsPreviewModalOpen(true);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Navigate to resume builder with selected template
    navigate('/resume-builder', { state: { selectedTemplate: template } });
  };

  const handleComparisonAdd = (template) => {
    if (comparisonTemplates?.length < 3 && !comparisonTemplates?.find(t => t?.id === template?.id)) {
      setComparisonTemplates(prev => [...prev, template]);
    }
  };

  const handleComparisonRemove = (templateId) => {
    setComparisonTemplates(prev => prev?.filter(t => t?.id !== templateId));
  };

  const handleComparisonClear = () => {
    setComparisonTemplates([]);
  };

  const isTemplateInComparison = (templateId) => {
    return comparisonTemplates?.some(t => t?.id === templateId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualActionToolbar />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="py-8 border-b border-border">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Choose Your Perfect Resume Template
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select from our collection of professionally designed, ATS-friendly templates 
                tailored for different industries and experience levels.
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="py-6 space-y-6">
            {/* Search Bar and Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <SearchBar onSearch={handleSearch} />
              <div className="flex items-center space-x-4">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by..."
                  className="w-48"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAllFilters}
                  iconName="RotateCcw"
                  className="whitespace-nowrap"
                >
                  Reset All
                </Button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="bg-card border border-border rounded-lg p-6">
              <FilterChips
                filters={filterOptions}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAllFilters}
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredTemplates?.length} of {templates?.length} templates
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Click any template to preview, or select multiple to compare</span>
            </div>
          </div>

          {/* Templates Grid */}
          {filteredTemplates?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {filteredTemplates?.map((template) => (
                <div key={template?.id} className="relative">
                  <TemplateCard
                    template={template}
                    onPreview={handleTemplatePreview}
                    onSelect={handleTemplateSelect}
                    isSelected={selectedTemplate?.id === template?.id}
                  />
                  
                  {/* Comparison Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      onClick={() => 
                        isTemplateInComparison(template?.id) 
                          ? handleComparisonRemove(template?.id)
                          : handleComparisonAdd(template)
                      }
                      disabled={!isTemplateInComparison(template?.id) && comparisonTemplates?.length >= 3}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                        isTemplateInComparison(template?.id)
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-white border-border hover:border-primary'
                      } ${!isTemplateInComparison(template?.id) && comparisonTemplates?.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isTemplateInComparison(template?.id) && (
                        <Icon name="Check" size={12} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find the perfect template.
              </p>
              <Button
                variant="outline"
                onClick={handleClearAllFilters}
                iconName="RotateCcw"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onSelect={handleTemplateSelect}
      />
      {/* Comparison Panel */}
      <ComparisonPanel
        selectedTemplates={comparisonTemplates}
        onRemoveTemplate={handleComparisonRemove}
        onSelectTemplate={handleTemplateSelect}
        onClearAll={handleComparisonClear}
      />
    </div>
  );
};

export default TemplateSelection;
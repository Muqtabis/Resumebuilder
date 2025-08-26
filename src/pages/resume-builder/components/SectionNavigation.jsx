import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SectionNavigation = ({ activeSection, onSectionChange, completedSections = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sections = [
    { id: 'contact', label: 'Contact Info', icon: 'User' },
    { id: 'summary', label: 'Summary', icon: 'FileText' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'skills', label: 'Skills', icon: 'Award' },
    { id: 'projects', label: 'Projects', icon: 'Code' },
    { id: 'certifications', label: 'Certifications', icon: 'Certificate' },
    { id: 'languages', label: 'Languages', icon: 'Globe' }
  ];

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsExpanded(false);
  };

  const isCompleted = (sectionId) => completedSections?.includes(sectionId);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-card border-r border-border h-full">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Resume Sections</h2>
          <nav className="space-y-2">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => handleSectionClick(section?.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-150 hover:scale-105 ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={18} />
                <span className="font-medium">{section?.label}</span>
                {isCompleted(section?.id) && (
                  <Icon name="CheckCircle" size={16} className="ml-auto text-success" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden bg-card border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-6 py-4 text-left"
        >
          <div className="flex items-center space-x-3">
            <Icon name={sections?.find(s => s?.id === activeSection)?.icon || 'FileText'} size={20} />
            <span className="font-medium text-foreground">
              {sections?.find(s => s?.id === activeSection)?.label || 'Select Section'}
            </span>
          </div>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>

        {isExpanded && (
          <div className="border-t border-border bg-muted/50">
            <div className="grid grid-cols-2 gap-2 p-4">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => handleSectionClick(section?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.label}</span>
                  {isCompleted(section?.id) && (
                    <Icon name="CheckCircle" size={12} className="ml-auto text-success" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionNavigation;
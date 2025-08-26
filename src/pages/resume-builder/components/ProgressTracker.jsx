import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ completedSections, totalSections, currentSection }) => {
  const progressPercentage = (completedSections?.length / totalSections) * 100;

  const sectionStatus = [
    { id: 'contact', label: 'Contact', icon: 'User' },
    { id: 'summary', label: 'Summary', icon: 'FileText' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'skills', label: 'Skills', icon: 'Award' }
  ];

  const getStatusIcon = (sectionId) => {
    if (completedSections?.includes(sectionId)) {
      return <Icon name="CheckCircle" size={16} className="text-success" />;
    } else if (currentSection === sectionId) {
      return <Icon name="Clock" size={16} className="text-warning" />;
    } else {
      return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Resume Progress</h3>
        <span className="text-sm text-muted-foreground">
          {completedSections?.length}/{totalSections} sections completed
        </span>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Section Status */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {sectionStatus?.map((section) => (
          <div 
            key={section?.id}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-150 ${
              currentSection === section?.id ? 'bg-primary/10' : 'bg-transparent'
            }`}
          >
            {getStatusIcon(section?.id)}
            <span className="text-xs font-medium text-foreground truncate">
              {section?.label}
            </span>
          </div>
        ))}
      </div>
      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Trophy" size={16} />
            <span className="text-sm font-medium">
              Congratulations! Your resume is complete and ready for export.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
import React from 'react';
import ResumeCard from './ResumeCard';
import Icon from '../../../components/AppIcon';

const ResumeList = ({ 
  resumes, 
  viewMode, 
  selectedResumes, 
  onSelectResume, 
  onEdit, 
  onDuplicate, 
  onShare, 
  onArchive, 
  onDelete 
}) => {
  if (resumes?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No resumes found</h3>
        <p className="text-muted-foreground mb-6">
          Create your first resume to get started with your job search.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4';

  return (
    <div className={gridClasses}>
      {resumes?.map((resume) => (
        <ResumeCard
          key={resume?.id}
          resume={resume}
          isSelected={selectedResumes?.includes(resume?.id)}
          onSelect={onSelectResume}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onShare={onShare}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ResumeList;
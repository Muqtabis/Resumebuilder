import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ResumePreview = ({ resumeData, isVisible, onToggle }) => {
  const {
    contact = {},
    summary = {},
    experience = [],
    education = [],
    skills = {}
  } = resumeData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderSkillsSection = (skillsArray, title) => {
    if (!skillsArray || skillsArray?.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {skillsArray?.map((skill, index) => (
            <span 
              key={skill?.id || index} 
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {skill?.name || skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Preview Panel */}
      <div className={`hidden lg:block transition-all duration-300 ${isVisible ? 'w-2/5' : 'w-0'} overflow-hidden bg-background border-l border-border`}>
        {isVisible && (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                iconName="X"
              />
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-white shadow-elevation-2 rounded-lg p-8 max-w-2xl mx-auto" style={{ minHeight: '11in', width: '8.5in', transform: 'scale(0.6)', transformOrigin: 'top center' }}>
                <ResumeContent 
                  contact={contact}
                  summary={summary}
                  experience={experience}
                  education={education}
                  skills={skills}
                  formatDate={formatDate}
                  renderSkillsSection={renderSkillsSection}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-24 right-4 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="w-12 h-12 rounded-full shadow-elevation-2"
        >
          <Icon name="Eye" size={20} />
        </Button>
      </div>

      {/* Mobile Preview Modal */}
      {isVisible && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Resume Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName="X"
            />
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white shadow-elevation-2 rounded-lg p-6">
              <ResumeContent 
                contact={contact}
                summary={summary}
                experience={experience}
                education={education}
                skills={skills}
                formatDate={formatDate}
                renderSkillsSection={renderSkillsSection}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ResumeContent = ({ contact, summary, experience, education, skills, formatDate, renderSkillsSection }) => (
  <div className="space-y-6 text-gray-900">
    {/* Header */}
    <div className="text-center border-b border-gray-200 pb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {contact?.firstName} {contact?.lastName}
      </h1>
      {summary?.jobTitle && (
        <p className="text-lg text-gray-600 mb-3">{summary?.jobTitle}</p>
      )}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        {contact?.email && <span>{contact?.email}</span>}
        {contact?.phone && <span>{contact?.phone}</span>}
        {contact?.address && <span>{contact?.address}, {contact?.city}, {contact?.state}</span>}
        {contact?.linkedin && <span>LinkedIn: {contact?.linkedin}</span>}
      </div>
    </div>

    {/* Professional Summary */}
    {summary?.professionalSummary && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{summary?.professionalSummary}</p>
      </div>
    )}

    {/* Experience */}
    {experience?.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience?.map((exp, index) => (
            <div key={exp?.id || index}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp?.jobTitle}</h3>
                  <p className="text-gray-700">{exp?.company} | {exp?.location}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(exp?.startDate)} - {exp?.isCurrentJob ? 'Present' : formatDate(exp?.endDate)}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{exp?.description}</p>
              {exp?.achievements && exp?.achievements?.filter(a => a?.trim())?.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp?.achievements?.filter(a => a?.trim())?.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {education?.length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Education
        </h2>
        <div className="space-y-3">
          {education?.map((edu, index) => (
            <div key={edu?.id || index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu?.degree} {edu?.fieldOfStudy && `in ${edu?.fieldOfStudy}`}
                  </h3>
                  <p className="text-gray-700">{edu?.institution} | {edu?.location}</p>
                  {edu?.gpa && <p className="text-sm text-gray-600">GPA: {edu?.gpa}</p>}
                  {edu?.honors && <p className="text-sm text-gray-600">{edu?.honors}</p>}
                </div>
                <div className="text-sm text-gray-600">
                  {formatDate(edu?.graduationDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Skills */}
    {(skills?.technicalSkills?.length > 0 || skills?.softSkills?.length > 0 || skills?.languages?.length > 0 || skills?.tools?.length > 0) && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSkillsSection(skills?.technicalSkills, 'Technical Skills')}
          {renderSkillsSection(skills?.softSkills, 'Soft Skills')}
          {renderSkillsSection(skills?.languages, 'Programming Languages')}
          {renderSkillsSection(skills?.tools, 'Tools & Technologies')}
        </div>
      </div>
    )}
  </div>
);

export default ResumePreview;
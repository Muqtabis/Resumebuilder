import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExperienceSection = ({ data = [], onChange, onComplete }) => {
  const [experiences, setExperiences] = useState(data?.length > 0 ? data : [createEmptyExperience()]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  function createEmptyExperience() {
    return {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      achievements: ['']
    };
  }

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    if (field === 'isCurrentJob' && value) {
      updatedExperiences[index].endDate = '';
    }
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].achievements[achIndex] = value;
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const addAchievement = (expIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences?.[expIndex]?.achievements?.push('');
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const removeAchievement = (expIndex, achIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences?.[expIndex]?.achievements?.splice(achIndex, 1);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const addExperience = () => {
    const newExperiences = [...experiences, createEmptyExperience()];
    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  const removeExperience = (index) => {
    if (experiences?.length > 1) {
      const updatedExperiences = experiences?.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
      onChange(updatedExperiences);
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedExperiences = [...experiences];
    const draggedItem = updatedExperiences?.[draggedIndex];
    updatedExperiences?.splice(draggedIndex, 1);
    updatedExperiences?.splice(dropIndex, 0, draggedItem);
    
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    setDraggedIndex(null);
  };

  const handleComplete = () => {
    onComplete('experience');
  };

  const isFormValid = experiences?.every(exp => 
    exp?.jobTitle?.trim() && exp?.company?.trim() && exp?.startDate && 
    (exp?.isCurrentJob || exp?.endDate) && exp?.description?.trim()
  );

  const achievementSuggestions = [
    "Increased team productivity by 25% through implementation of agile methodologies",
    "Led cross-functional team of 8 developers to deliver project 2 weeks ahead of schedule",
    "Reduced system downtime by 40% through proactive monitoring and optimization",
    "Mentored 5 junior developers, resulting in 100% retention rate",
    "Implemented automated testing suite, reducing bugs in production by 60%"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Briefcase" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
            <p className="text-sm text-muted-foreground">Add your professional experience in reverse chronological order</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={addExperience}
          iconName="Plus"
          iconPosition="left"
        >
          Add Experience
        </Button>
      </div>
      <div className="space-y-6">
        {experiences?.map((experience, index) => (
          <div
            key={experience?.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="bg-card border border-border rounded-lg p-6 cursor-move hover:shadow-elevation-1 transition-shadow duration-150"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Experience {index + 1}</span>
              </div>
              {experiences?.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Job Title"
                type="text"
                placeholder="e.g., Senior Software Engineer"
                value={experience?.jobTitle}
                onChange={(e) => handleExperienceChange(index, 'jobTitle', e?.target?.value)}
                required
              />

              <Input
                label="Company"
                type="text"
                placeholder="e.g., Tech Corp Inc."
                value={experience?.company}
                onChange={(e) => handleExperienceChange(index, 'company', e?.target?.value)}
                required
              />

              <Input
                label="Location"
                type="text"
                placeholder="e.g., New York, NY"
                value={experience?.location}
                onChange={(e) => handleExperienceChange(index, 'location', e?.target?.value)}
              />

              <div className="space-y-2">
                <Checkbox
                  label="I currently work here"
                  checked={experience?.isCurrentJob}
                  onChange={(e) => handleExperienceChange(index, 'isCurrentJob', e?.target?.checked)}
                />
              </div>

              <Input
                label="Start Date"
                type="date"
                value={experience?.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e?.target?.value)}
                required
              />

              <Input
                label="End Date"
                type="date"
                value={experience?.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e?.target?.value)}
                disabled={experience?.isCurrentJob}
                required={!experience?.isCurrentJob}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Job Description *
              </label>
              <textarea
                className="w-full min-h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-input text-foreground placeholder:text-muted-foreground"
                placeholder="Describe your role, responsibilities, and key contributions..."
                value={experience?.description}
                onChange={(e) => handleExperienceChange(index, 'description', e?.target?.value)}
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Key Achievements</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(index)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Achievement
                </Button>
              </div>

              {experience?.achievements?.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="e.g., Increased sales by 30% through strategic partnerships"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, achIndex, e?.target?.value)}
                    />
                  </div>
                  {experience?.achievements?.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index, achIndex)}
                      iconName="X"
                      className="text-error hover:text-error"
                    />
                  )}
                </div>
              ))}

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2">💡 Achievement suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {achievementSuggestions?.slice(0, 3)?.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleAchievementChange(index, experience?.achievements?.length - 1, suggestion)}
                      className="text-xs bg-card border border-border rounded px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
                    >
                      {suggestion?.substring(0, 40)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-6 border-t border-border">
        <Button
          variant={isFormValid ? "default" : "outline"}
          onClick={handleComplete}
          iconName="CheckCircle"
          iconPosition="left"
          disabled={!isFormValid}
        >
          Complete Section
        </Button>
      </div>
    </div>
  );
};

export default ExperienceSection;
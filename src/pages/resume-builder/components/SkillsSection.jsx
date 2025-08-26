import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SkillsSection = ({ data = {}, onChange, onComplete }) => {
  const [skillsData, setSkillsData] = useState({
    technicalSkills: data?.technicalSkills || [],
    softSkills: data?.softSkills || [],
    languages: data?.languages || [],
    tools: data?.tools || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState('technicalSkills');

  const skillCategoryOptions = [
    { value: 'technicalSkills', label: 'Technical Skills' },
    { value: 'softSkills', label: 'Soft Skills' },
    { value: 'languages', label: 'Programming Languages' },
    { value: 'tools', label: 'Tools & Technologies' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const skillSuggestions = {
    technicalSkills: ['Project Management', 'Data Analysis', 'Quality Assurance', 'System Administration', 'Database Management'],
    softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management'],
    languages: ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL'],
    tools: ['Git', 'Docker', 'AWS', 'Figma', 'Jira', 'Slack', 'Microsoft Office']
  };

  const handleAddSkill = () => {
    if (newSkill?.trim()) {
      const updatedSkillsData = { ...skillsData };
      const newSkillObj = {
        id: Date.now(),
        name: newSkill?.trim(),
        proficiency: 'intermediate'
      };
      
      updatedSkillsData[skillCategory] = [...updatedSkillsData?.[skillCategory], newSkillObj];
      setSkillsData(updatedSkillsData);
      onChange(updatedSkillsData);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (category, skillId) => {
    const updatedSkillsData = { ...skillsData };
    updatedSkillsData[category] = updatedSkillsData?.[category]?.filter(skill => skill?.id !== skillId);
    setSkillsData(updatedSkillsData);
    onChange(updatedSkillsData);
  };

  const handleProficiencyChange = (category, skillId, proficiency) => {
    const updatedSkillsData = { ...skillsData };
    const skillIndex = updatedSkillsData?.[category]?.findIndex(skill => skill?.id === skillId);
    if (skillIndex !== -1) {
      updatedSkillsData[category][skillIndex].proficiency = proficiency;
      setSkillsData(updatedSkillsData);
      onChange(updatedSkillsData);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setNewSkill(suggestion);
  };

  const handleComplete = () => {
    onComplete('skills');
  };

  const totalSkills = Object.values(skillsData)?.reduce((total, skills) => total + skills?.length, 0);
  const isFormValid = totalSkills >= 3;

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return 'bg-warning';
      case 'intermediate': return 'bg-primary';
      case 'advanced': return 'bg-success';
      case 'expert': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getProficiencyWidth = (proficiency) => {
    switch (proficiency) {
      case 'beginner': return 'w-1/4';
      case 'intermediate': return 'w-1/2';
      case 'advanced': return 'w-3/4';
      case 'expert': return 'w-full';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Award" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Skills & Expertise</h2>
          <p className="text-sm text-muted-foreground">Showcase your technical and soft skills with proficiency levels</p>
        </div>
      </div>
      {/* Add New Skill */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium text-foreground">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={skillCategoryOptions}
            value={skillCategory}
            onChange={setSkillCategory}
          />
          <Input
            label="Skill Name"
            type="text"
            placeholder="Enter skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleAddSkill()}
          />
          <div className="flex items-end">
            <Button
              variant="default"
              onClick={handleAddSkill}
              iconName="Plus"
              iconPosition="left"
              disabled={!newSkill?.trim()}
              className="w-full"
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Skill Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">💡 Popular {skillCategoryOptions?.find(opt => opt?.value === skillCategory)?.label}:</p>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions?.[skillCategory]?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-card border border-border rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Skills Display */}
      <div className="space-y-6">
        {skillCategoryOptions?.map((category) => (
          <div key={category?.value} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">{category?.label}</h3>
              <span className="text-sm text-muted-foreground">
                {skillsData?.[category?.value]?.length || 0} skills
              </span>
            </div>

            {skillsData?.[category?.value]?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData?.[category?.value]?.map((skill) => (
                  <div key={skill?.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-foreground">{skill?.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(category?.value, skill?.id)}
                        iconName="X"
                        className="text-error hover:text-error"
                      />
                    </div>

                    <div className="space-y-2">
                      <Select
                        label="Proficiency Level"
                        options={proficiencyLevels}
                        value={skill?.proficiency}
                        onChange={(value) => handleProficiencyChange(category?.value, skill?.id, value)}
                      />

                      {/* Visual Proficiency Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Proficiency</span>
                          <span className="capitalize">{skill?.proficiency}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProficiencyColor(skill?.proficiency)} ${getProficiencyWidth(skill?.proficiency)}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Plus" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No {category?.label?.toLowerCase()} added yet</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-sm text-primary">
          <Icon name="Info" size={16} />
          <span>
            Total Skills: {totalSkills} | Recommended: At least 8-12 skills across different categories
          </span>
        </div>
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

export default SkillsSection;
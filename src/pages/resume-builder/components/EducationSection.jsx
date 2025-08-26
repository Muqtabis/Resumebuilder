import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const EducationSection = ({ data = [], onChange, onComplete }) => {
  const [educations, setEducations] = useState(data?.length > 0 ? data : [createEmptyEducation()]);

  function createEmptyEducation() {
    return {
      id: Date.now(),
      degree: '',
      fieldOfStudy: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      honors: '',
      relevantCoursework: ['']
    };
  }

  const degreeOptions = [
    { value: 'high-school', label: 'High School Diploma' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'other', label: 'Other' }
  ];

  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const handleCourseworkChange = (eduIndex, courseIndex, value) => {
    const updatedEducations = [...educations];
    updatedEducations[eduIndex].relevantCoursework[courseIndex] = value;
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const addCoursework = (eduIndex) => {
    const updatedEducations = [...educations];
    updatedEducations?.[eduIndex]?.relevantCoursework?.push('');
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const removeCoursework = (eduIndex, courseIndex) => {
    const updatedEducations = [...educations];
    updatedEducations?.[eduIndex]?.relevantCoursework?.splice(courseIndex, 1);
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const addEducation = () => {
    const newEducations = [...educations, createEmptyEducation()];
    setEducations(newEducations);
    onChange(newEducations);
  };

  const removeEducation = (index) => {
    if (educations?.length > 1) {
      const updatedEducations = educations?.filter((_, i) => i !== index);
      setEducations(updatedEducations);
      onChange(updatedEducations);
    }
  };

  const handleComplete = () => {
    onComplete('education');
  };

  const isFormValid = educations?.every(edu => 
    edu?.degree && edu?.institution?.trim() && edu?.graduationDate
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="GraduationCap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Education</h2>
            <p className="text-sm text-muted-foreground">Add your educational background and qualifications</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={addEducation}
          iconName="Plus"
          iconPosition="left"
        >
          Add Education
        </Button>
      </div>
      <div className="space-y-6">
        {educations?.map((education, index) => (
          <div
            key={education?.id}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Education {index + 1}</span>
              {educations?.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  iconName="Trash2"
                  className="text-error hover:text-error"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Degree Type"
                options={degreeOptions}
                value={education?.degree}
                onChange={(value) => handleEducationChange(index, 'degree', value)}
                placeholder="Select degree type"
                required
              />

              <Input
                label="Field of Study"
                type="text"
                placeholder="e.g., Computer Science"
                value={education?.fieldOfStudy}
                onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e?.target?.value)}
              />

              <Input
                label="Institution"
                type="text"
                placeholder="e.g., University of California"
                value={education?.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e?.target?.value)}
                required
              />

              <Input
                label="Location"
                type="text"
                placeholder="e.g., Berkeley, CA"
                value={education?.location}
                onChange={(e) => handleEducationChange(index, 'location', e?.target?.value)}
              />

              <Input
                label="Graduation Date"
                type="date"
                value={education?.graduationDate}
                onChange={(e) => handleEducationChange(index, 'graduationDate', e?.target?.value)}
                required
              />

              <Input
                label="GPA (Optional)"
                type="text"
                placeholder="e.g., 3.8/4.0"
                value={education?.gpa}
                onChange={(e) => handleEducationChange(index, 'gpa', e?.target?.value)}
              />

              <div className="md:col-span-2">
                <Input
                  label="Honors & Awards"
                  type="text"
                  placeholder="e.g., Magna Cum Laude, Dean's List"
                  value={education?.honors}
                  onChange={(e) => handleEducationChange(index, 'honors', e?.target?.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Relevant Coursework</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addCoursework(index)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Course
                </Button>
              </div>

              {education?.relevantCoursework?.map((course, courseIndex) => (
                <div key={courseIndex} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="e.g., Data Structures and Algorithms"
                      value={course}
                      onChange={(e) => handleCourseworkChange(index, courseIndex, e?.target?.value)}
                    />
                  </div>
                  {education?.relevantCoursework?.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCoursework(index, courseIndex)}
                      iconName="X"
                      className="text-error hover:text-error"
                    />
                  )}
                </div>
              ))}

              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Info" size={14} />
                  <span>Include courses relevant to your target job position</span>
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

export default EducationSection;
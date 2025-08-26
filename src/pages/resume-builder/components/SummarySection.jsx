import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SummarySection = ({ data = {}, onChange, onComplete }) => {
  const [summaryData, setSummaryData] = useState({
    professionalSummary: data?.professionalSummary || '',
    jobTitle: data?.jobTitle || '',
    yearsOfExperience: data?.yearsOfExperience || ''
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const aiSuggestions = [
    "Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-quality solutions that improve user experience and business outcomes.",
    "Results-driven marketing professional with expertise in digital marketing, content strategy, and brand management. Successfully increased brand awareness by 40% and generated $2M+ in revenue through innovative campaigns and data-driven strategies.",
    "Dedicated project manager with 7+ years coordinating complex initiatives across multiple departments. Expert in Agile methodologies, stakeholder management, and process optimization, consistently delivering projects on time and under budget."
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...summaryData, [field]: value };
    setSummaryData(updatedData);
    onChange(updatedData);
  };

  const handleGenerateSuggestion = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomSuggestion = aiSuggestions?.[Math.floor(Math.random() * aiSuggestions?.length)];
    handleInputChange('professionalSummary', randomSuggestion);
    setIsGenerating(false);
    setShowSuggestions(false);
  };

  const handleUseSuggestion = (suggestion) => {
    handleInputChange('professionalSummary', suggestion);
    setShowSuggestions(false);
  };

  const handleComplete = () => {
    onComplete('summary');
  };

  const isFormValid = summaryData?.professionalSummary?.trim()?.length > 50;
  const wordCount = summaryData?.professionalSummary?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Professional Summary</h2>
          <p className="text-sm text-muted-foreground">Write a compelling summary that highlights your key strengths</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Current Job Title"
          type="text"
          placeholder="e.g., Senior Software Engineer"
          value={summaryData?.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
        />

        <Input
          label="Years of Experience"
          type="number"
          placeholder="e.g., 5"
          value={summaryData?.yearsOfExperience}
          onChange={(e) => handleInputChange('yearsOfExperience', e?.target?.value)}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Professional Summary *
          </label>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${wordCount < 30 ? 'text-warning' : wordCount > 100 ? 'text-error' : 'text-success'}`}>
              {wordCount} words
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSuggestions(!showSuggestions)}
              iconName="Lightbulb"
              iconPosition="left"
            >
              AI Suggestions
            </Button>
          </div>
        </div>

        <div className="relative">
          <textarea
            className="w-full min-h-32 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-input text-foreground placeholder:text-muted-foreground"
            placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives. Aim for 50-150 words."
            value={summaryData?.professionalSummary}
            onChange={(e) => handleInputChange('professionalSummary', e?.target?.value)}
            rows={6}
          />
          <div className="absolute bottom-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateSuggestion}
              loading={isGenerating}
              iconName="Wand2"
              iconPosition="left"
            >
              Generate with AI
            </Button>
          </div>
        </div>

        {showSuggestions && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">AI-Generated Suggestions</h4>
            {aiSuggestions?.map((suggestion, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-3">
                <p className="text-sm text-foreground mb-3">{suggestion}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUseSuggestion(suggestion)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Use This
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Tip: Keep it concise (50-150 words) and focus on your most relevant achievements</span>
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

export default SummarySection;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContextualActionToolbar from '../../components/ui/ContextualActionToolbar';
import SectionNavigation from './components/SectionNavigation';
import ContactSection from './components/ContactSection';
import SummarySection from './components/SummarySection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ResumePreview from './components/ResumePreview';
import ProgressTracker from './components/ProgressTracker';
import AutoSaveIndicator from './components/AutoSaveIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('contact');
  const [completedSections, setCompletedSections] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    contact: {},
    summary: {},
    experience: [],
    education: [],
    skills: {},
    projects: [],
    certifications: [],
    languages: []
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resume_draft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
        
        // Determine completed sections based on saved data
        const completed = [];
        if (parsedData?.contact?.firstName && parsedData?.contact?.lastName) completed?.push('contact');
        if (parsedData?.summary?.professionalSummary) completed?.push('summary');
        if (parsedData?.experience?.length > 0) completed?.push('experience');
        if (parsedData?.education?.length > 0) completed?.push('education');
        if (Object.values(parsedData?.skills || {})?.some(arr => arr?.length > 0)) completed?.push('skills');
        
        setCompletedSections(completed);
      } catch (error) {
        console.error('Failed to load saved resume data:', error);
      }
    }
  }, []);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSectionComplete = (sectionId) => {
    if (!completedSections?.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
    
    // Auto-advance to next section
    const sections = ['contact', 'summary', 'experience', 'education', 'skills'];
    const currentIndex = sections?.indexOf(sectionId);
    if (currentIndex < sections?.length - 1) {
      setActiveSection(sections?.[currentIndex + 1]);
    }
  };

  const handleDataChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSaveResume = async (data) => {
    // Simulate API call to save resume
    console.log('Saving resume data:', data);
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'contact':
        return (
          <ContactSection
            data={resumeData?.contact}
            onChange={(data) => handleDataChange('contact', data)}
            onComplete={handleSectionComplete}
          />
        );
      case 'summary':
        return (
          <SummarySection
            data={resumeData?.summary}
            onChange={(data) => handleDataChange('summary', data)}
            onComplete={handleSectionComplete}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            data={resumeData?.experience}
            onChange={(data) => handleDataChange('experience', data)}
            onComplete={handleSectionComplete}
          />
        );
      case 'education':
        return (
          <EducationSection
            data={resumeData?.education}
            onChange={(data) => handleDataChange('education', data)}
            onComplete={handleSectionComplete}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            data={resumeData?.skills}
            onChange={(data) => handleDataChange('skills', data)}
            onComplete={handleSectionComplete}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">Section Not Available</h3>
            <p className="text-muted-foreground">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Resume Builder - Create Your Professional Resume</title>
        <meta name="description" content="Build your professional resume with our intuitive resume builder. Add your experience, education, skills, and more with real-time preview." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <ContextualActionToolbar />
        
        <div className="pt-16 pb-20 lg:pb-4">
          <div className="flex h-screen">
            {/* Section Navigation */}
            <SectionNavigation
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              completedSections={completedSections}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex transition-all duration-300 ${showPreview ? 'lg:w-3/5' : 'w-full'}`}>
              <div className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto p-6">
                  {/* Progress Tracker */}
                  <ProgressTracker
                    completedSections={completedSections}
                    totalSections={5}
                    currentSection={activeSection}
                  />

                  {/* Auto-save Indicator */}
                  <AutoSaveIndicator
                    resumeData={resumeData}
                    onSave={handleSaveResume}
                  />

                  {/* Preview Toggle for Desktop */}
                  <div className="hidden lg:flex justify-end mb-6">
                    <Button
                      variant={showPreview ? "default" : "outline"}
                      onClick={() => setShowPreview(!showPreview)}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                  </div>

                  {/* Active Section Content */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    {renderActiveSection()}
                  </div>

                  {/* Section Navigation Footer */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const sections = ['contact', 'summary', 'experience', 'education', 'skills'];
                        const currentIndex = sections?.indexOf(activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(sections?.[currentIndex - 1]);
                        }
                      }}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      disabled={activeSection === 'contact'}
                    >
                      Previous
                    </Button>

                    <div className="text-sm text-muted-foreground">
                      Step {['contact', 'summary', 'experience', 'education', 'skills']?.indexOf(activeSection) + 1} of 5
                    </div>

                    <Button
                      variant="default"
                      onClick={() => {
                        const sections = ['contact', 'summary', 'experience', 'education', 'skills'];
                        const currentIndex = sections?.indexOf(activeSection);
                        if (currentIndex < sections?.length - 1) {
                          setActiveSection(sections?.[currentIndex + 1]);
                        }
                      }}
                      iconName="ChevronRight"
                      iconPosition="right"
                      disabled={activeSection === 'skills'}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Preview Panel */}
            <ResumePreview
              resumeData={resumeData}
              isVisible={showPreview}
              onToggle={() => setShowPreview(!showPreview)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualActionToolbar from '../../components/ui/ContextualActionToolbar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import PreviewToolbar from './components/PreviewToolbar';
import ExportPanel from './components/ExportPanel';
import ResumePreview from './components/ResumePreview';
import ShareModal from './components/ShareModal';
import QualityCheck from './components/QualityCheck';

const ResumePreviewAndExport = () => {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Mock resume data
  const resumeData = {
    personalInfo: {
      fullName: "John Doe",
      title: "Senior Software Engineer",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe"
    },
    summary: `Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring development teams. Passionate about emerging technologies and driving innovation in fast-paced environments.`,
    experience: [
      {
        position: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        achievements: [
          "Led development of microservices architecture serving 1M+ daily active users",
          "Reduced system latency by 40% through performance optimization initiatives",
          "Mentored 5 junior developers and established code review best practices",
          "Implemented CI/CD pipelines reducing deployment time by 60%"
        ]
      },
      {
        position: "Software Engineer",
        company: "Digital Innovations LLC",
        duration: "Jun 2019 - Dec 2021",
        location: "San Francisco, CA",
        achievements: [
          "Developed and maintained React-based web applications with 99.9% uptime",
          "Collaborated with cross-functional teams to deliver 15+ product features",
          "Optimized database queries resulting in 25% improvement in response times",
          "Participated in agile development processes and sprint planning"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2015 - 2019",
        location: "Berkeley, CA",
        gpa: "3.8/4.0"
      }
    ],
    skills: {
      "Programming Languages": ["JavaScript", "Python", "Java", "TypeScript"],
      "Frameworks & Libraries": ["React", "Node.js", "Express", "Django"],
      "Databases": ["PostgreSQL", "MongoDB", "Redis"],
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Jenkins"]
    },
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023"
      },
      {
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        year: "2022"
      }
    ]
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setShowSidebar(!isFullscreen);
  };

  const handleExport = async (exportOptions) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsExporting(false);
          // Simulate download
          const link = document.createElement('a');
          link.href = '#';
          link.download = `${exportOptions?.fileName}.${exportOptions?.format}`;
          link?.click();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleFixIssue = (issueId) => {
    console.log('Fixing issue:', issueId);
    // Navigate to builder with specific issue highlighted
    navigate('/resume-builder', { state: { fixIssue: issueId } });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case '=': case'+':
            e?.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e?.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e?.preventDefault();
            handleZoomReset();
            break;
          case 's':
            e?.preventDefault();
            handleShare();
            break;
        }
      }
      
      if (e?.key === 'Escape' && isFullscreen) {
        handleToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualActionToolbar />
      <div className={`pt-16 ${!isFullscreen ? 'pb-16 md:pb-0' : ''} flex h-screen`}>
        {/* Main Preview Area */}
        <div className={`flex-1 flex flex-col ${showSidebar ? 'mr-80' : ''} transition-all duration-300`}>
          {/* Preview Toolbar */}
          {!isFullscreen && (
            <div className="p-4 border-b border-border bg-card">
              <PreviewToolbar
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onZoomReset={handleZoomReset}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onToggleFullscreen={handleToggleFullscreen}
                isFullscreen={isFullscreen}
              />
            </div>
          )}

          {/* Resume Preview */}
          <div className="flex-1 overflow-hidden">
            <ResumePreview
              zoomLevel={zoomLevel}
              currentPage={currentPage}
              isFullscreen={isFullscreen}
              resumeData={resumeData}
            />
          </div>

          {/* Fullscreen Controls */}
          {isFullscreen && (
            <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
              <div className="bg-card border border-border rounded-lg p-2 shadow-elevation-2">
                <PreviewToolbar
                  zoomLevel={zoomLevel}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onZoomReset={handleZoomReset}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onToggleFullscreen={handleToggleFullscreen}
                  isFullscreen={isFullscreen}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {showSidebar && !isFullscreen && (
          <div className="fixed right-0 top-16 bottom-0 w-80 bg-background border-l border-border overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Quick Actions */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Actions</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(false)}
                  iconName="X"
                  className="h-8 w-8 p-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/resume-builder')}
                  iconName="Edit3"
                  iconPosition="left"
                  fullWidth
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  iconName="Share2"
                  iconPosition="left"
                  fullWidth
                >
                  Share
                </Button>
              </div>

              {/* Quality Check */}
              <QualityCheck
                resumeData={resumeData}
                onFixIssue={handleFixIssue}
              />

              {/* Export Panel */}
              <ExportPanel
                onExport={handleExport}
                isExporting={isExporting}
                exportProgress={exportProgress}
              />

              {/* Template Options */}
              <div className="bg-card border border-border rounded-lg p-4 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Template Options</h3>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Palette"
                    iconPosition="left"
                    fullWidth
                  >
                    Change Colors
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Type"
                    iconPosition="left"
                    fullWidth
                  >
                    Change Font
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Layout"
                    iconPosition="left"
                    fullWidth
                  >
                    Switch Template
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Sidebar Button (when hidden) */}
        {!showSidebar && !isFullscreen && (
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowSidebar(true)}
            iconName="PanelRight"
            className="fixed right-4 top-24 z-50 w-12 h-12 rounded-full shadow-elevation-2"
          />
        )}
      </div>
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        resumeTitle={resumeData?.personalInfo?.fullName + " - Resume"}
      />
      {/* Mobile Export FAB */}
      <div className="md:hidden fixed bottom-20 left-4 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={() => handleExport({ format: 'pdf', fileName: 'John_Doe_Resume' })}
          loading={isExporting}
          className="w-14 h-14 rounded-full shadow-elevation-3 hover:scale-105 transition-transform duration-150"
        >
          <Icon name="Download" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ResumePreviewAndExport;
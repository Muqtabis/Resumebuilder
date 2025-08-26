import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeSection = ({ userName = "John" }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const tips = [
    "Keep your resume updated with your latest achievements",
    "Tailor your resume for each job application",
    "Use action verbs to describe your accomplishments",
    "Quantify your achievements with specific numbers"
  ];

  const randomTip = tips?.[Math.floor(Math.random() * tips?.length)];

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getCurrentGreeting()}, {userName}! 👋
          </h1>
          <p className="text-primary-foreground/90 mb-4 lg:mb-0 max-w-2xl">
            Ready to take your career to the next level? Create a professional resume that stands out from the crowd.
          </p>
          
          {/* Pro Tip */}
          <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-yellow-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-foreground/95">Pro Tip:</p>
                <p className="text-sm text-primary-foreground/80">{randomTip}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col sm:flex-row lg:flex-col space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-3">
          <Link to="/template-selection">
            <Button 
              variant="secondary" 
              size="lg" 
              iconName="Plus" 
              iconPosition="left"
              className="w-full sm:w-auto lg:w-full bg-white text-primary hover:bg-white/90"
            >
              Create New Resume
            </Button>
          </Link>
          <Link to="/resume-management">
            <Button 
              variant="outline" 
              size="lg" 
              iconName="FolderOpen" 
              iconPosition="left"
              className="w-full sm:w-auto lg:w-full border-white/30 text-primary-foreground hover:bg-white/10"
            >
              View All Resumes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
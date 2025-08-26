import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Browse Templates",
      description: "Explore our collection of professional resume templates",
      icon: "FileText",
      color: "primary",
      link: "/template-selection"
    },
    {
      id: 2,
      title: "Import from LinkedIn",
      description: "Automatically populate your resume with LinkedIn data",
      icon: "Download",
      color: "success",
      action: "import"
    },
    {
      id: 3,
      title: "Cover Letter Builder",
      description: "Create matching cover letters for your applications",
      icon: "Mail",
      color: "warning",
      action: "cover-letter"
    },
    {
      id: 4,
      title: "Resume Analytics",
      description: "Track views, downloads, and application success",
      icon: "BarChart3",
      color: "secondary",
      action: "analytics"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: "text-primary bg-primary/10 border-primary/20",
      success: "text-success bg-success/10 border-success/20",
      warning: "text-warning bg-warning/10 border-warning/20",
      secondary: "text-secondary bg-secondary/10 border-secondary/20"
    };
    return colors?.[color] || colors?.primary;
  };

  const handleAction = (action) => {
    switch(action) {
      case 'import': console.log('Import from LinkedIn');
        break;
      case 'cover-letter':
        console.log('Open cover letter builder');
        break;
      case 'analytics': console.log('Open analytics dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div key={action?.id}>
            {action?.link ? (
              <Link to={action?.link} className="block">
                <div className={`p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 hover:shadow-elevation-1 cursor-pointer ${getColorClasses(action?.color)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Icon name={action?.icon} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                      <p className="text-sm text-muted-foreground">{action?.description}</p>
                    </div>
                    <Icon name="ArrowRight" size={16} className="flex-shrink-0 opacity-60" />
                  </div>
                </div>
              </Link>
            ) : (
              <button 
                onClick={() => handleAction(action?.action)}
                className={`w-full p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 hover:shadow-elevation-1 text-left ${getColorClasses(action?.color)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon name={action?.icon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                    <p className="text-sm text-muted-foreground">{action?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="flex-shrink-0 opacity-60" />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "resume_created",
      title: "Created new resume",
      description: "Software Engineer Resume - Modern Template",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: "Plus",
      color: "success"
    },
    {
      id: 2,
      type: "resume_updated",
      title: "Updated resume",
      description: "Marketing Manager Resume - Added new experience",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: "Edit3",
      color: "primary"
    },
    {
      id: 3,
      type: "resume_downloaded",
      title: "Downloaded resume",
      description: "Data Analyst Resume - PDF format",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: "Download",
      color: "secondary"
    },
    {
      id: 4,
      type: "resume_shared",
      title: "Shared resume",
      description: "Product Manager Resume - Shared via link",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: "Share2",
      color: "warning"
    },
    {
      id: 5,
      type: "template_viewed",
      title: "Viewed template",
      description: "Executive Template - Professional Design",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: "Eye",
      color: "secondary"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: "text-primary bg-primary/10",
      success: "text-success bg-success/10",
      warning: "text-warning bg-warning/10",
      secondary: "text-secondary bg-secondary/10"
    };
    return colors?.[color] || colors?.primary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <Icon name="Clock" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getColorClasses(activity?.color)}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">{activity?.title}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
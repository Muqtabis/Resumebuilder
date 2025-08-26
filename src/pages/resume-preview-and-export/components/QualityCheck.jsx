import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QualityCheck = ({ resumeData, onFixIssue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock quality check results
  const qualityIssues = [
    {
      id: 1,
      type: 'warning',
      category: 'Content',
      title: 'Missing Skills Section',
      description: 'Consider adding a skills section to highlight your technical abilities.',
      severity: 'medium',
      fixable: true
    },
    {
      id: 2,
      type: 'error',
      category: 'Formatting',
      title: 'Inconsistent Date Format',
      description: 'Use consistent date formatting throughout your resume (MM/YYYY).',
      severity: 'high',
      fixable: true
    },
    {
      id: 3,
      type: 'info',
      category: 'ATS',
      title: 'ATS Optimization',
      description: 'Your resume is 85% ATS-friendly. Consider using standard section headers.',
      severity: 'low',
      fixable: false
    },
    {
      id: 4,
      type: 'warning',
      category: 'Length',
      title: 'Resume Length',
      description: 'Your resume is 2.3 pages. Consider condensing to 1-2 pages for better readability.',
      severity: 'medium',
      fixable: false
    }
  ];

  const getIssueIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'AlertCircle';
    }
  };

  const getIssueColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-primary/10 text-primary border-primary/20'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded border ${colors?.[severity]}`}>
        {severity?.charAt(0)?.toUpperCase() + severity?.slice(1)}
      </span>
    );
  };

  const overallScore = Math.round(((qualityIssues?.length - qualityIssues?.filter(i => i?.type === 'error')?.length) / qualityIssues?.length) * 100);

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="CheckCircle" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quality Check</h3>
            <p className="text-sm text-muted-foreground">Resume score: {overallScore}%</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          className="h-8 w-8 p-0"
        />
      </div>
      {/* Score Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Overall Quality</span>
          <span className="text-foreground font-medium">{overallScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              overallScore >= 80 ? 'bg-success' : 
              overallScore >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>
      {/* Issues Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-error">
            {qualityIssues?.filter(i => i?.type === 'error')?.length}
          </p>
          <p className="text-xs text-muted-foreground">Errors</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-warning">
            {qualityIssues?.filter(i => i?.type === 'warning')?.length}
          </p>
          <p className="text-xs text-muted-foreground">Warnings</p>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-primary">
            {qualityIssues?.filter(i => i?.type === 'info')?.length}
          </p>
          <p className="text-xs text-muted-foreground">Suggestions</p>
        </div>
      </div>
      {/* Detailed Issues */}
      {isExpanded && (
        <div className="space-y-3 pt-4 border-t border-border">
          {qualityIssues?.map((issue) => (
            <div key={issue?.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon 
                name={getIssueIcon(issue?.type)} 
                size={16} 
                className={getIssueColor(issue?.type)} 
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{issue?.title}</h4>
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(issue?.severity)}
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-background rounded">
                      {issue?.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{issue?.description}</p>
                {issue?.fixable && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFixIssue(issue?.id)}
                    iconName="Wrench"
                    iconPosition="left"
                    className="text-xs"
                  >
                    Quick Fix
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Action Button */}
      <Button
        variant="outline"
        size="sm"
        iconName="RefreshCw"
        iconPosition="left"
        fullWidth
        className="mt-4"
      >
        Run Quality Check Again
      </Button>
    </div>
  );
};

export default QualityCheck;
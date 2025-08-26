import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualActionToolbar from '../../components/ui/ContextualActionToolbar';
import WelcomeSection from './components/WelcomeSection';
import MetricsCard from './components/MetricsCard';
import SearchAndFilter from './components/SearchAndFilter';
import ResumeCard from './components/ResumeCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredResumes, setFilteredResumes] = useState([]);

  // Mock user data
  const userData = {
    name: "John",
    totalResumes: 12,
    totalViews: 1847,
    totalDownloads: 234,
    activeApplications: 8
  };

  // Mock resume data
  const mockResumes = [
    {
      id: 1,
      name: "Software Engineer Resume",
      template: "Modern Professional",
      lastModified: "2025-01-23T10:30:00Z",
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop",
      status: "active",
      views: 156,
      downloads: 23,
      shared: true
    },
    {
      id: 2,
      name: "Marketing Manager Resume",
      template: "Creative Design",
      lastModified: "2025-01-22T14:15:00Z",
      thumbnail: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=400&h=500&fit=crop",
      status: "active",
      views: 89,
      downloads: 12,
      shared: false
    },
    {
      id: 3,
      name: "Data Analyst Resume",
      template: "Clean Minimal",
      lastModified: "2025-01-21T09:45:00Z",
      thumbnail: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=400&h=500&fit=crop",
      status: "draft",
      views: 34,
      downloads: 5,
      shared: false
    },
    {
      id: 4,
      name: "Product Manager Resume",
      template: "Executive Style",
      lastModified: "2025-01-20T16:20:00Z",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      status: "active",
      views: 203,
      downloads: 31,
      shared: true
    },
    {
      id: 5,
      name: "UX Designer Resume",
      template: "Portfolio Focus",
      lastModified: "2025-01-19T11:10:00Z",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=500&fit=crop",
      status: "active",
      views: 127,
      downloads: 18,
      shared: false
    },
    {
      id: 6,
      name: "Sales Representative Resume",
      template: "Dynamic Layout",
      lastModified: "2025-01-18T13:30:00Z",
      thumbnail: "https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg?w=400&h=500&fit=crop",
      status: "active",
      views: 78,
      downloads: 9,
      shared: false
    }
  ];

  // Filter resumes based on search and filter criteria
  useEffect(() => {
    let filtered = mockResumes;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(resume =>
        resume?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resume?.template?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'recent':
          filtered = filtered?.slice(0, 3); // Show only recent ones
          break;
        case 'favorites':
          filtered = filtered?.filter(resume => resume?.views > 100); // Mock favorites logic
          break;
        case 'shared':
          filtered = filtered?.filter(resume => resume?.shared);
          break;
        case 'draft':
          filtered = filtered?.filter(resume => resume?.status === 'draft');
          break;
        default:
          break;
      }
    }

    setFilteredResumes(filtered);
  }, [searchTerm, activeFilter]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const handleDuplicateResume = (resumeId) => {
    console.log('Duplicate resume:', resumeId);
    // Implementation for duplicating resume
  };

  const handleShareResume = (resumeId) => {
    console.log('Share resume:', resumeId);
    // Implementation for sharing resume
  };

  const handleDeleteResume = (resumeId) => {
    console.log('Delete resume:', resumeId);
    // Implementation for deleting resume
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualActionToolbar />
      {/* Main Content */}
      <main className="pt-20 pb-20 md:pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <WelcomeSection userName={userData?.name} />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Total Resumes"
              value={userData?.totalResumes}
              change="+2 this month"
              changeType="positive"
              icon="FileText"
              color="primary"
            />
            <MetricsCard
              title="Profile Views"
              value={userData?.totalViews?.toLocaleString()}
              change="+12% this week"
              changeType="positive"
              icon="Eye"
              color="success"
            />
            <MetricsCard
              title="Downloads"
              value={userData?.totalDownloads}
              change="+5 today"
              changeType="positive"
              icon="Download"
              color="warning"
            />
            <MetricsCard
              title="Active Applications"
              value={userData?.activeApplications}
              change="2 pending"
              changeType="neutral"
              icon="Send"
              color="secondary"
            />
          </div>

          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            totalResumes={mockResumes?.length}
          />

          {/* Resume Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                My Resumes
                <span className="ml-2 text-lg text-muted-foreground">
                  ({filteredResumes?.length})
                </span>
              </h2>
              <Link to="/template-selection">
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Create New
                </Button>
              </Link>
            </div>

            {filteredResumes?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResumes?.map((resume) => (
                  <ResumeCard
                    key={resume?.id}
                    resume={resume}
                    onDuplicate={handleDuplicateResume}
                    onShare={handleShareResume}
                    onDelete={handleDeleteResume}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {searchTerm || activeFilter !== 'all' ? 'No resumes found' : 'No resumes yet'}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {searchTerm || activeFilter !== 'all' ?'Try adjusting your search or filter criteria to find what you\'re looking for.'
                    : 'Get started by creating your first professional resume with our easy-to-use builder.'
                  }
                </p>
                {(!searchTerm && activeFilter === 'all') && (
                  <Link to="/template-selection">
                    <Button variant="default" iconName="Plus" iconPosition="left">
                      Create Your First Resume
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Bottom Section - Quick Actions and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
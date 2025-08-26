import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContextualActionToolbar from '../../components/ui/ContextualActionToolbar';
import FilterBar from './components/FilterBar';
import ResumeList from './components/ResumeList';
import ConfirmationModal from './components/ConfirmationModal';
import ShareModal from './components/ShareModal';
import StatsCard from './components/StatsCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ResumeManagement = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastModified');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [shareModal, setShareModal] = useState({ isOpen: false, resume: null });
  const [loading, setLoading] = useState(false);

  // Mock resume data
  const mockResumes = [
    {
      id: 'resume-001',
      title: 'Software Engineer Resume',
      template: 'Modern Professional',
      status: 'complete',
      lastModified: new Date('2025-08-20'),
      created: new Date('2025-08-15'),
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
      views: 45,
      downloads: 12,
      tags: ['Software', 'React', 'JavaScript', 'Frontend']
    },
    {
      id: 'resume-002',
      title: 'Marketing Manager CV',
      template: 'Creative Bold',
      status: 'draft',
      lastModified: new Date('2025-08-18'),
      created: new Date('2025-08-10'),
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
      views: 23,
      downloads: 5,
      tags: ['Marketing', 'Digital', 'Strategy']
    },
    {
      id: 'resume-003',
      title: 'Data Scientist Portfolio',
      template: 'Academic Clean',
      status: 'shared',
      lastModified: new Date('2025-08-22'),
      created: new Date('2025-08-12'),
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      views: 67,
      downloads: 18,
      tags: ['Data Science', 'Python', 'Machine Learning', 'Analytics']
    },
    {
      id: 'resume-004',
      title: 'UX Designer Resume',
      template: 'Minimalist',
      status: 'complete',
      lastModified: new Date('2025-08-19'),
      created: new Date('2025-08-08'),
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8c5?w=400&h=500&fit=crop',
      views: 34,
      downloads: 8,
      tags: ['UX Design', 'Figma', 'Prototyping']
    },
    {
      id: 'resume-005',
      title: 'Project Manager CV',
      template: 'Executive',
      status: 'archived',
      lastModified: new Date('2025-08-16'),
      created: new Date('2025-08-05'),
      thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
      views: 12,
      downloads: 3,
      tags: ['Project Management', 'Agile', 'Leadership']
    },
    {
      id: 'resume-006',
      title: 'Sales Representative Resume',
      template: 'Professional Blue',
      status: 'draft',
      lastModified: new Date('2025-08-21'),
      created: new Date('2025-08-14'),
      thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
      views: 8,
      downloads: 2,
      tags: ['Sales', 'B2B', 'CRM']
    }
  ];

  useEffect(() => {
    // Simulate loading resumes
    setLoading(true);
    setTimeout(() => {
      setResumes(mockResumes);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort resumes
  const filteredAndSortedResumes = useMemo(() => {
    let filtered = resumes?.filter(resume => {
      const matchesSearch = resume?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           resume?.template?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           resume?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesFilter = filterBy === 'all' || resume?.status === filterBy;
      
      return matchesSearch && matchesFilter;
    });

    // Sort resumes
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'template':
          return a?.template?.localeCompare(b?.template);
        case 'created':
          return new Date(b.created) - new Date(a.created);
        case 'lastModified':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });

    return filtered;
  }, [resumes, searchQuery, sortBy, filterBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = resumes?.length;
    const complete = resumes?.filter(r => r?.status === 'complete')?.length;
    const totalViews = resumes?.reduce((sum, r) => sum + r?.views, 0);
    const totalDownloads = resumes?.reduce((sum, r) => sum + r?.downloads, 0);

    return {
      total,
      complete,
      totalViews,
      totalDownloads
    };
  }, [resumes]);

  const handleSelectResume = (resumeId, isSelected) => {
    setSelectedResumes(prev => 
      isSelected 
        ? [...prev, resumeId]
        : prev?.filter(id => id !== resumeId)
    );
  };

  const handleSelectAll = () => {
    if (selectedResumes?.length === filteredAndSortedResumes?.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(filteredAndSortedResumes?.map(r => r?.id));
    }
  };

  const handleEdit = (resumeId) => {
    navigate('/resume-builder', { state: { resumeId } });
  };

  const handleDuplicate = (resumeId) => {
    const resume = resumes?.find(r => r?.id === resumeId);
    if (resume) {
      const duplicatedResume = {
        ...resume,
        id: `resume-${Date.now()}`,
        title: `${resume?.title} (Copy)`,
        status: 'draft',
        lastModified: new Date(),
        created: new Date(),
        views: 0,
        downloads: 0
      };
      setResumes(prev => [duplicatedResume, ...prev]);
    }
  };

  const handleShare = (resumeId) => {
    const resume = resumes?.find(r => r?.id === resumeId);
    setShareModal({ isOpen: true, resume });
  };

  const handleArchive = (resumeId) => {
    setConfirmModal({
      isOpen: true,
      type: 'archive',
      data: { resumeId },
      title: 'Archive Resume',
      message: 'Are you sure you want to archive this resume? You can restore it later from the archived section.'
    });
  };

  const handleDelete = (resumeId) => {
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { resumeId },
      title: 'Delete Resume',
      message: 'Are you sure you want to delete this resume? This action cannot be undone.'
    });
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        console.log('Exporting resumes:', selectedResumes);
        break;
      case 'share': 
        console.log('Sharing resumes:', selectedResumes);
        break;
      case 'archive':
        setConfirmModal({
          isOpen: true,
          type: 'archive',
          data: { resumeIds: selectedResumes },
          title: 'Archive Resumes',
          message: `Are you sure you want to archive ${selectedResumes?.length} resume${selectedResumes?.length !== 1 ? 's' : ''}?`
        });
        break;
      case 'delete':
        setConfirmModal({
          isOpen: true,
          type: 'delete',
          data: { resumeIds: selectedResumes },
          title: 'Delete Resumes',
          message: `Are you sure you want to delete ${selectedResumes?.length} resume${selectedResumes?.length !== 1 ? 's' : ''}? This action cannot be undone.`
        });
        break;
    }
  };

  const handleConfirmAction = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { type, data } = confirmModal;
    
    if (type === 'delete') {
      if (data?.resumeId) {
        setResumes(prev => prev?.filter(r => r?.id !== data?.resumeId));
      } else if (data?.resumeIds) {
        setResumes(prev => prev?.filter(r => !data?.resumeIds?.includes(r?.id)));
        setSelectedResumes([]);
      }
    } else if (type === 'archive') {
      if (data?.resumeId) {
        setResumes(prev => prev?.map(r => 
          r?.id === data?.resumeId ? { ...r, status: 'archived' } : r
        ));
      } else if (data?.resumeIds) {
        setResumes(prev => prev?.map(r => 
          data?.resumeIds?.includes(r?.id) ? { ...r, status: 'archived' } : r
        ));
        setSelectedResumes([]);
      }
    }
    
    setLoading(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  if (loading && resumes?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-20 bg-muted rounded-lg mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)]?.map((_, i) => (
                  <div key={i} className="h-80 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContextualActionToolbar />
      <div className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Resumes</h1>
              <p className="text-muted-foreground">
                Manage and organize your resume collection
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/template-selection')}
                iconName="Plus"
                iconPosition="left"
              >
                New Resume
              </Button>
              {selectedResumes?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleSelectAll}
                  iconName={selectedResumes?.length === filteredAndSortedResumes?.length ? "Square" : "CheckSquare"}
                  iconPosition="left"
                >
                  {selectedResumes?.length === filteredAndSortedResumes?.length ? 'Deselect All' : 'Select All'}
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Resumes"
              value={stats?.total}
              icon="FileText"
              color="primary"
            />
            <StatsCard
              title="Complete"
              value={stats?.complete}
              icon="CheckCircle"
              color="success"
            />
            <StatsCard
              title="Total Views"
              value={stats?.totalViews}
              icon="Eye"
              trend="up"
              trendValue="+12%"
              color="primary"
            />
            <StatsCard
              title="Downloads"
              value={stats?.totalDownloads}
              icon="Download"
              trend="up"
              trendValue="+8%"
              color="success"
            />
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedCount={selectedResumes?.length}
            onBulkAction={handleBulkAction}
          />

          {/* Resume List */}
          <ResumeList
            resumes={filteredAndSortedResumes}
            viewMode={viewMode}
            selectedResumes={selectedResumes}
            onSelectResume={handleSelectResume}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onShare={handleShare}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />

          {/* Empty State */}
          {filteredAndSortedResumes?.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No resumes found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterBy('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <ConfirmationModal
        isOpen={confirmModal?.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, type: '', data: null })}
        onConfirm={handleConfirmAction}
        title={confirmModal?.title}
        message={confirmModal?.message}
        type={confirmModal?.type}
        loading={loading}
      />
      <ShareModal
        isOpen={shareModal?.isOpen}
        onClose={() => setShareModal({ isOpen: false, resume: null })}
        resume={shareModal?.resume}
      />
    </div>
  );
};

export default ResumeManagement;
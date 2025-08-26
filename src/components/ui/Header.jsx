import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Templates', path: '/template-selection', icon: 'FileText' },
    { label: 'Builder', path: '/resume-builder', icon: 'Edit3' },
    { label: 'Preview', path: '/resume-preview-and-export', icon: 'Eye' },
    { label: 'My Resumes', path: '/resume-management', icon: 'FolderOpen' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border backdrop-blur-light">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="FileText" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">ResumeBuilder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:scale-105 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Account Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUserMenuToggle}
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-150"
          >
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </Button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={handleUserMenuClose}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-50 animate-scale-in">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="CreditCard" size={16} />
                    <span>Subscription</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-colors duration-150">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border backdrop-blur-light">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-150 hover:scale-105 min-w-0 ${
                isActivePath(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
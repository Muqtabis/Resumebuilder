import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ResumePreviewAndExport from './pages/resume-preview-and-export';
import ResumeManagement from './pages/resume-management';
import Dashboard from './pages/dashboard';
import TemplateSelection from './pages/template-selection';
import ResumeBuilder from './pages/resume-builder';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume-preview-and-export" element={<ResumePreviewAndExport />} />
        <Route path="/resume-management" element={<ResumeManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

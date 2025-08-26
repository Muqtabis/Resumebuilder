import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportPanel = ({ onExport, isExporting, exportProgress }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [fileName, setFileName] = useState('John_Doe_Resume');
  const [atsOptimized, setAtsOptimized] = useState(true);
  const [includeColors, setIncludeColors] = useState(true);
  const [paperSize, setPaperSize] = useState('a4');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Best for most applications' },
    { value: 'docx', label: 'Word Document', description: 'Editable format' },
    { value: 'txt', label: 'Plain Text', description: 'ATS-friendly format' },
    { value: 'html', label: 'HTML Page', description: 'Web-friendly format' }
  ];

  const paperSizeOptions = [
    { value: 'a4', label: 'A4 (210 × 297 mm)' },
    { value: 'letter', label: 'Letter (8.5 × 11 in)' },
    { value: 'legal', label: 'Legal (8.5 × 14 in)' }
  ];

  const handleExport = () => {
    const exportOptions = {
      format: selectedFormat,
      fileName,
      atsOptimized,
      includeColors,
      paperSize
    };
    onExport(exportOptions);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return 'FileText';
      case 'docx': return 'FileType';
      case 'txt': return 'File';
      case 'html': return 'Globe';
      default: return 'Download';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Export Resume</h3>
        <Icon name="Download" size={20} className="text-muted-foreground" />
      </div>
      {/* Format Selection */}
      <div className="space-y-3">
        <Select
          label="Export Format"
          options={formatOptions}
          value={selectedFormat}
          onChange={setSelectedFormat}
          className="w-full"
        />
      </div>
      {/* File Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">File Name</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e?.target?.value)}
            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter file name"
          />
          <span className="text-sm text-muted-foreground">
            .{selectedFormat}
          </span>
        </div>
      </div>
      {/* Quick Options */}
      <div className="space-y-3">
        <Checkbox
          label="ATS-Optimized"
          description="Optimize for Applicant Tracking Systems"
          checked={atsOptimized}
          onChange={(e) => setAtsOptimized(e?.target?.checked)}
        />
        
        {selectedFormat !== 'txt' && (
          <Checkbox
            label="Include Colors"
            description="Maintain template colors and styling"
            checked={includeColors}
            onChange={(e) => setIncludeColors(e?.target?.checked)}
          />
        )}
      </div>
      {/* Advanced Options Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-150"
      >
        <Icon 
          name={showAdvanced ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
        <span>Advanced Options</span>
      </button>
      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-4 pt-2 border-t border-border">
          <Select
            label="Paper Size"
            options={paperSizeOptions}
            value={paperSize}
            onChange={setPaperSize}
            className="w-full"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Checkbox
              label="Include Margins"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Page Numbers"
             
              onChange={() => {}}
            />
          </div>
        </div>
      )}
      {/* Export Progress */}
      {isExporting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Generating {selectedFormat?.toUpperCase()}...</span>
            <span className="text-foreground font-medium">{exportProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        </div>
      )}
      {/* Export Button */}
      <Button
        variant="default"
        size="lg"
        onClick={handleExport}
        loading={isExporting}
        iconName={getFormatIcon(selectedFormat)}
        iconPosition="left"
        fullWidth
        disabled={!fileName?.trim()}
      >
        {isExporting ? 'Generating...' : `Export as ${selectedFormat?.toUpperCase()}`}
      </Button>
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          fullWidth
        >
          Share Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Cloud"
          iconPosition="left"
          fullWidth
        >
          Save to Cloud
        </Button>
      </div>
    </div>
  );
};

export default ExportPanel;
import React from 'react';
import Icon from '../../../components/AppIcon';

const ResumePreview = ({ 
  zoomLevel, 
  currentPage, 
  isFullscreen,
  resumeData 
}) => {
  const scaleStyle = {
    transform: `scale(${zoomLevel / 100})`,
    transformOrigin: 'top center'
  };

  return (
    <div className={`flex justify-center ${isFullscreen ? 'h-screen' : 'h-full'} overflow-auto bg-muted p-4`}>
      <div 
        className="bg-white shadow-elevation-3 rounded-lg overflow-hidden"
        style={{
          width: '210mm',
          minHeight: '297mm',
          ...scaleStyle
        }}
      >
        {/* Resume Header */}
        <div className="bg-primary text-primary-foreground p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{resumeData?.personalInfo?.fullName}</h1>
              <p className="text-lg opacity-90 mb-4">{resumeData?.personalInfo?.title}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} color="currentColor" />
                  <span>{resumeData?.personalInfo?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} color="currentColor" />
                  <span>{resumeData?.personalInfo?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} color="currentColor" />
                  <span>{resumeData?.personalInfo?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Linkedin" size={16} color="currentColor" />
                  <span>{resumeData?.personalInfo?.linkedin}</span>
                </div>
              </div>
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={32} color="currentColor" />
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b-2 border-primary">
              Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {resumeData?.summary}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData?.experience?.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{job?.position}</h3>
                      <p className="text-primary font-medium">{job?.company}</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{job?.duration}</p>
                      <p>{job?.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    {job?.achievements?.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData?.education?.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{edu?.degree}</h3>
                    <p className="text-primary font-medium">{edu?.institution}</p>
                    {edu?.gpa && <p className="text-sm text-muted-foreground">GPA: {edu?.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{edu?.year}</p>
                    <p>{edu?.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(resumeData?.skills)?.map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-foreground mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills?.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
              Certifications
            </h2>
            <div className="space-y-2">
              {resumeData?.certifications?.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">{cert?.name}</h3>
                    <p className="text-sm text-primary">{cert?.issuer}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert?.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Page Footer */}
        <div className="px-8 pb-4 text-center">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} • Generated on {new Date()?.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
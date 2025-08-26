import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactSection = ({ data = {}, onChange, onComplete }) => {
  const [contactData, setContactData] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    address: data?.address || '',
    city: data?.city || '',
    state: data?.state || '',
    zipCode: data?.zipCode || '',
    linkedin: data?.linkedin || '',
    website: data?.website || '',
    github: data?.github || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const updatedData = { ...contactData, [field]: value };
    setContactData(updatedData);
    onChange(updatedData);
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!contactData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!contactData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!contactData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(contactData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!contactData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleComplete = () => {
    if (validateForm()) {
      onComplete('contact');
    }
  };

  const isFormValid = contactData?.firstName && contactData?.lastName && contactData?.email && contactData?.phone;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="User" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
          <p className="text-sm text-muted-foreground">Add your personal and contact details</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={contactData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={contactData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={contactData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={contactData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            type="text"
            placeholder="123 Main Street"
            value={contactData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
          />
        </div>

        <Input
          label="City"
          type="text"
          placeholder="New York"
          value={contactData?.city}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
        />

        <Input
          label="State"
          type="text"
          placeholder="NY"
          value={contactData?.state}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
        />

        <Input
          label="ZIP Code"
          type="text"
          placeholder="10001"
          value={contactData?.zipCode}
          onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
        />

        <Input
          label="LinkedIn Profile"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={contactData?.linkedin}
          onChange={(e) => handleInputChange('linkedin', e?.target?.value)}
        />

        <Input
          label="Website"
          type="url"
          placeholder="https://yourwebsite.com"
          value={contactData?.website}
          onChange={(e) => handleInputChange('website', e?.target?.value)}
        />

        <Input
          label="GitHub Profile"
          type="url"
          placeholder="https://github.com/yourusername"
          value={contactData?.github}
          onChange={(e) => handleInputChange('github', e?.target?.value)}
        />
      </div>
      <div className="flex justify-end pt-6 border-t border-border">
        <Button
          variant={isFormValid ? "default" : "outline"}
          onClick={handleComplete}
          iconName="CheckCircle"
          iconPosition="left"
          disabled={!isFormValid}
        >
          Complete Section
        </Button>
      </div>
    </div>
  );
};

export default ContactSection;
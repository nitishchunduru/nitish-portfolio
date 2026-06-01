'use client'

import { useState, useEffect, useRef } from 'react'
import { Linkedin, Mail, Phone, Download, ChevronDown, ArrowRight, Github, FileText, Trash2, Eye, Settings, Upload, X, Check, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Bootstrap Icons mapping
const bootstrapIcons = {
  'SAP MM': 'bi-box-seam',
  'Procurement': 'bi-cart-check',
  'Purchase Orders': 'bi-file-earmark-text',
  'Inventory': 'bi-archive',
  'Goods Receipt': 'bi-box-arrow-in-down',
  'Goods Issue': 'bi-box-arrow-up',
  'Vendor Management': 'bi-people',
  'SAP Fiori': 'bi-grid-3x3-gap',
  'Data Validation': 'bi-check2-circle',
  'Testing': 'bi-clipboard-check',
  'Documentation': 'bi-journal-text',
  'Analytics': 'bi-bar-chart',
  'Contact': 'bi-envelope',
  'Phone': 'bi-telephone',
  'LinkedIn': 'bi-linkedin',
  'GitHub': 'bi-github'
};

// Configurable Variables
const resumeUrl = "/Nitish_Chunduru_SAP_MM_Resume.pdf";

const personalDetails = {
  name: "Nitish Chunduru",
  headline: "SAP MM Consultant",
  subtitle: "SAP S4HANA | SAP Fiori | Procurement | Inventory Management | P2P Cycle",
  email: "chundurunitish2001@gmail.com",
  phone: "+91 8074300526",
  linkedin: "https://www.linkedin.com/in/nitish-chunduru",
  github: "https://github.com/nitishchunduru",
};

// Format date consistently
const getFormattedDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// LocalStorage utilities
const storageUtils = {
  getProfileImage: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('profileImage');
  },
  setProfileImage: (imageData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileImage', imageData);
    }
  },
  getProfileSettings: () => {
    if (typeof window === 'undefined') return { zoom: 1, positionX: 0, positionY: 0 };
    const stored = localStorage.getItem('profileSettings');
    return stored ? JSON.parse(stored) : { zoom: 1, positionX: 0, positionY: 0 };
  },
  setProfileSettings: (settings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileSettings', JSON.stringify(settings));
    }
  },
  deleteProfileImage: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('profileImage');
      localStorage.removeItem('profileSettings');
    }
  },
  getPersonalDetails: () => {
    if (typeof window === 'undefined') return personalDetails;
    const stored = localStorage.getItem('personalDetails');
    return stored ? JSON.parse(stored) : personalDetails;
  },
  setPersonalDetails: (details) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personalDetails', JSON.stringify(details));
    }
  },
  getResumeUrl: () => {
    if (typeof window === 'undefined') return resumeUrl;
    return localStorage.getItem('resumeUrl') || resumeUrl;
  },
  setResumeUrl: (url) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeUrl', url);
    }
  },
  getIsAdmin: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isAdmin') === 'true';
  },
  setIsAdmin: (isAdmin) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    }
  }
};

export default function Portfolio() {
  // State management - Dark theme only
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileSettings, setProfileSettings] = useState({ zoom: 1, positionX: 0, positionY: 0 });
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [tempImageData, setTempImageData] = useState(null);
  const [tempImageSettings, setTempImageSettings] = useState({ zoom: 1, positionX: 0, positionY: 0 });
  const [details, setDetails] = useState(personalDetails);
  const [resumeUrl_, setResumeUrl_] = useState(resumeUrl);
  const [resumeMetadata, setResumeMetadata] = useState({
    name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
    uploadDate: getFormattedDate(),
    fileSize: "2.4 MB"
  });
  const [notification, setNotification] = useState(null);
  const [adminFormData, setAdminFormData] = useState(personalDetails);
  const imageCanvasRef = useRef(null);

  // Initialize and load data on mount
  useEffect(() => {
    const savedImage = storageUtils.getProfileImage();
    setProfileImage(savedImage);
    
    const savedSettings = storageUtils.getProfileSettings();
    setProfileSettings(savedSettings);
    
    const savedDetails = storageUtils.getPersonalDetails();
    setDetails(savedDetails);
    setAdminFormData(savedDetails);
    
    const savedResumeUrl = storageUtils.getResumeUrl();
    setResumeUrl_(savedResumeUrl);
    
    const isAdminMode = storageUtils.getIsAdmin();
    setIsAdmin(isAdminMode);
  }, []);

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image must be less than 5MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showNotification('Only JPG, PNG, and WebP formats allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result;
      setTempImageData(imageData);
      setTempImageSettings({ zoom: 1, positionX: 0, positionY: 0 });
      setShowImageEditor(true);
    };
    reader.readAsDataURL(file);
  };

  // Save image with settings
  const saveImageWithSettings = () => {
    if (!tempImageData) return;
    
    storageUtils.setProfileImage(tempImageData);
    storageUtils.setProfileSettings(tempImageSettings);
    
    setProfileImage(tempImageData);
    setProfileSettings(tempImageSettings);
    setShowImageEditor(false);
    setTempImageData(null);
    
    showNotification('Profile image updated successfully');
  };

  // Delete profile image
  const deleteProfileImage = () => {
    storageUtils.deleteProfileImage();
    setProfileImage(null);
    setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 });
    showNotification('Profile image deleted');
  };

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('Resume must be less than 10MB');
      return;
    }

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      showNotification('Only PDF, DOC, and DOCX formats allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const resumeData = event.target?.result;
      
      // Store as blob URL or base64
      const url = URL.createObjectURL(file);
      storageUtils.setResumeUrl(url);
      setResumeUrl_(url);
      
      setResumeMetadata({
        name: file.name,
        uploadDate: getFormattedDate(),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
      
      showNotification('Resume uploaded and replaced successfully');
    };
    reader.readAsArrayBuffer(file);
  };

  // Delete resume
  const deleteResume = () => {
    storageUtils.setResumeUrl(resumeUrl);
    setResumeUrl_(resumeUrl);
    setResumeMetadata({
      name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
      uploadDate: getFormattedDate(),
      fileSize: "2.4 MB"
    });
    showNotification('Resume deleted');
  };

  // Handle contact info update
  const handleUpdateContact = () => {
    storageUtils.setPersonalDetails(adminFormData);
    setDetails(adminFormData);
    showNotification('Contact information updated');
  };

  // Render profile image with settings
  const renderProfileImage = () => {
    const imageSource = profileImage || null;
    
    if (!imageSource) {
      return (
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-amber-400 flex items-center justify-center text-white text-4xl font-bold">
          NC
        </div>
      );
    }

    return (
      <div 
        className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-400 flex-shrink-0"
        style={{
          backgroundImage: `url(${imageSource})`,
          backgroundSize: `${profileSettings.zoom * 100}%`,
          backgroundPosition: `${50 + profileSettings.positionX * 10}% ${50 + profileSettings.positionY * 10}%`,
          backgroundRepeat: 'no-repeat'
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400">
            {details.name}
          </h1>
          <Button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="bg-slate-700 hover:bg-slate-600 text-amber-400"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin Settings
          </Button>
        </div>
      </nav>

      {/* Admin Settings Panel */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl bg-slate-800 border-slate-700 my-8">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400">Admin Settings</h2>
                <button onClick={() => setShowAdminPanel(false)} className="text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Admin Mode Toggle */}
              <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => {
                      setIsAdmin(e.target.checked);
                      storageUtils.setIsAdmin(e.target.checked);
                    }}
                    className="w-4 h-4 rounded"
                  />
                  <span className="ml-3 text-slate-200">Admin Mode: {isAdmin ? 'ON' : 'OFF'}</span>
                </label>
              </div>

              {/* Profile Image Management */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Profile Image Management</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer block">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-slate-300">Upload Image (JPG, PNG, WebP - max 5MB)</p>
                    </label>
                  </div>
                  
                  {profileImage && (
                    <>
                      <Button
                        onClick={() => setShowImageEditor(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        Adjust Image (Zoom, Position)
                      </Button>
                      <Button
                        onClick={deleteProfileImage}
                        variant="destructive"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Image
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Image Editor Modal */}
              {showImageEditor && tempImageData && (
                <div className="mb-6 p-4 bg-slate-700 rounded-lg">
                  <h4 className="font-bold text-amber-400 mb-4">Adjust Image</h4>
                  
                  <div className="mb-4 flex justify-center">
                    <div
                      className="w-40 h-40 rounded-full overflow-hidden border-4 border-amber-400"
                      style={{
                        backgroundImage: `url(${tempImageData})`,
                        backgroundSize: `${tempImageSettings.zoom * 100}%`,
                        backgroundPosition: `${50 + tempImageSettings.positionX * 10}% ${50 + tempImageSettings.positionY * 10}%`,
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm">Zoom: {(tempImageSettings.zoom * 100).toFixed(0)}%</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={tempImageSettings.zoom}
                        onChange={(e) => setTempImageSettings({...tempImageSettings, zoom: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm">Vertical Position</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={tempImageSettings.positionY}
                        onChange={(e) => setTempImageSettings({...tempImageSettings, positionY: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm">Horizontal Position</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={tempImageSettings.positionX}
                        onChange={(e) => setTempImageSettings({...tempImageSettings, positionX: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setTempImageSettings({zoom: 1, positionX: 0, positionY: 0})}
                        className="flex-1 bg-slate-600 hover:bg-slate-500 text-white"
                      >
                        Reset
                      </Button>
                      <Button
                        onClick={saveImageWithSettings}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information Management */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={adminFormData.name}
                    onChange={(e) => setAdminFormData({...adminFormData, name: e.target.value})}
                    placeholder="Name"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="email"
                    value={adminFormData.email}
                    onChange={(e) => setAdminFormData({...adminFormData, email: e.target.value})}
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="tel"
                    value={adminFormData.phone}
                    onChange={(e) => setAdminFormData({...adminFormData, phone: e.target.value})}
                    placeholder="Phone"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="url"
                    value={adminFormData.linkedin}
                    onChange={(e) => setAdminFormData({...adminFormData, linkedin: e.target.value})}
                    placeholder="LinkedIn URL"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="url"
                    value={adminFormData.github}
                    onChange={(e) => setAdminFormData({...adminFormData, github: e.target.value})}
                    placeholder="GitHub URL"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <Button
                    onClick={handleUpdateContact}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Contact Information
                  </Button>
                </div>
              </div>

              {/* Resume Management */}
              {isAdmin && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-amber-400 mb-4">Resume Management</h3>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resumeUpload"
                      />
                      <label htmlFor="resumeUpload" className="cursor-pointer block">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <p className="text-slate-300">Upload Resume (PDF, DOC, DOCX - max 10MB)</p>
                      </label>
                    </div>
                    
                    <div className="p-3 bg-slate-700 rounded text-sm">
                      <p><strong>File:</strong> {resumeMetadata.name}</p>
                      <p><strong>Uploaded:</strong> {resumeMetadata.uploadDate}</p>
                      <p><strong>Size:</strong> {resumeMetadata.fileSize}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => window.open(resumeUrl_, '_blank')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Resume
                      </Button>
                      <Button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = resumeUrl_;
                          link.download = resumeMetadata.name;
                          link.click();
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    {resumeUrl_ !== resumeUrl && (
                      <Button
                        onClick={deleteResume}
                        variant="destructive"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Custom Resume
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setShowAdminPanel(false)}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white"
              >
                Close Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {renderProfileImage()}
            </div>

            {/* Hero Content */}
            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-4 text-white">
                {details.name}
              </h2>
              <p className="text-2xl font-semibold mb-2 text-amber-400">
                {details.headline}
              </p>
              <p className="text-lg mb-6 text-slate-300">
                {details.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
                <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section className="py-20 bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'SAP MM', items: ['SAP MM', 'Procurement', 'Purchase Orders', 'Inventory', 'Goods Receipt', 'Goods Issue', 'Vendor Management'] },
              { title: 'SAP S/4HANA', items: ['SAP S4HANA', 'SAP Fiori', 'SAP ERP', 'Data Validation', 'Testing', 'Documentation', 'Analytics'] },
            ].map((category, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-amber-400">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <Badge
                        key={i}
                        className="block text-center bg-slate-700 text-amber-300 hover:bg-slate-600"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Experience Section */}
      <section className="py-20 bg-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Project Experience
          </h2>
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400">
                      Cohance Migration Support SAP MM S4HANA
                    </h3>
                    <p className="font-semibold text-slate-300">
                      SAP MM Trainee Consultant
                    </p>
                    <p className="text-sm text-slate-400">
                      Proven Tech | Aug 2025 - Present
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-400 mr-2" />
                    <span>Migration Support & Data Validation</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-400 mr-2" />
                    <span>PR, PO, GR, GI Activities</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-400 mr-2" />
                    <span>Testing & Issue Resolution</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-400 mr-2" />
                    <span>Post Migration Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SAP Certifications Section */}
      <section className="py-20 bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            SAP Certifications & Learning
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Business Processes in SAP S/4HANA Sourcing and Procurement', source: 'SAP Learning', date: 'Completed May 2026' },
              { title: 'Exploring SAP Cloud ERP', source: 'SAP Learning', date: 'Completed May 2026' },
              { title: 'SAP Ariba Sourcing Overview', source: 'SAP Learning', date: 'Completed May 2026' },
              { title: 'Introduction to AI Core', source: 'SAP Learning', date: 'Completed May 2026' },
            ].map((cert, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700 hover:border-amber-400 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/10">
                      <Check className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white">
                        {cert.title}
                      </h3>
                      <p className="text-sm mt-2 text-slate-400">
                        {cert.source}
                      </p>
                      <p className="text-xs mt-1 text-slate-500">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-slate-700 border-slate-600 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">Email</h3>
                <p className="text-slate-300 text-sm break-all">{details.email}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700 border-slate-600 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">Phone</h3>
                <p className="text-slate-300 text-sm">{details.phone}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-700 border-slate-600 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Linkedin className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">LinkedIn</h3>
                <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  Visit Profile
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-700 border-slate-600 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Github className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">GitHub</h3>
                <a href={details.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                  Visit Profile
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400">
          <p>© 2026 {details.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

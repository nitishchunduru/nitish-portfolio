'use client'

import { useState, useEffect } from 'react'
import { Linkedin, Mail, Phone, Download, ChevronDown, ArrowRight, Github, FileText, Trash2, Eye, Settings, Moon, Sun, Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Configuration Objects (Frontend-managed)
const profileConfig = {
  enabled: true,
  imageUrl: "/profile.png"
};

const resumeConfig = {
  enabled: true,
  resumeUrl: "/resume/Nitish_Chunduru_SAP_MM_Resume.pdf",
};

const personalDetails = {
  name: "Nitish Chunduru",
  headline: "SAP MM Consultant",
  subtitle: "SAP S4HANA | SAP Fiori | Procurement | Inventory Management | P2P Cycle",
  email: "chundurunitish2001@gmail.com",
  phone: "+91 8074300526",
  linkedin: "https://www.linkedin.com/in/nitish-chunduru",
  github: "https://github.com/nitishchunduru",
};

// Format date consistently to avoid hydration mismatch
const getFormattedDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// LocalStorage utilities
const storageUtils = {
  getTheme: () => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'light';
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  },
  getProfileImage: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('profileImage');
  },
  setProfileImage: (imageData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileImage', imageData);
    }
  },
  deleteProfileImage: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('profileImage');
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
  getResumeConfig: () => {
    if (typeof window === 'undefined') return resumeConfig;
    const stored = localStorage.getItem('resumeConfig');
    return stored ? JSON.parse(stored) : resumeConfig;
  },
  setResumeConfig: (config) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeConfig', JSON.stringify(config));
    }
  }
};

export default function Portfolio() {
  // State management
  const [theme, setTheme] = useState('light');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [details, setDetails] = useState(personalDetails);
  const [resumeConfig_, setResumeConfig_] = useState(resumeConfig);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeMetadata, setResumeMetadata] = useState({
    name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
    uploadDate: getFormattedDate(),
    fileSize: "2.4 MB"
  });
  const [notification, setNotification] = useState(null);
  const [adminFormData, setAdminFormData] = useState(personalDetails);

  // Initialize theme and load data on mount
  useEffect(() => {
    const savedTheme = storageUtils.getTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const savedImage = storageUtils.getProfileImage();
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    const savedDetails = storageUtils.getPersonalDetails();
    setDetails(savedDetails);
    setAdminFormData(savedDetails);
    
    const savedResumeConfig = storageUtils.getResumeConfig();
    setResumeConfig_(savedResumeConfig);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storageUtils.setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    showNotification('Theme updated');
  };

  // Notification system
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Image must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        showNotification('Only JPG, PNG, and WebP are supported');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        storageUtils.setProfileImage(event.target.result);
        showNotification('Profile image updated');
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile image delete
  const handleDeleteProfileImage = () => {
    setProfileImage(null);
    storageUtils.deleteProfileImage();
    showNotification('Profile image deleted');
  };

  // Resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification('Resume must be less than 10MB');
        return;
      }
      setResumeFile(file);
      setResumeMetadata({
        name: file.name,
        uploadDate: getFormattedDate(),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB"
      });
      showNotification('Resume uploaded');
    }
  };

  // Resume download
  const handleResumeDownload = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeMetadata.name;
      link.click();
      URL.revokeObjectURL(url);
    } else if (resumeConfig_.enabled) {
      const link = document.createElement('a');
      link.href = resumeConfig_.resumeUrl;
      link.download = resumeMetadata.name;
      link.click();
    }
  };

  // Resume delete
  const handleDeleteResume = () => {
    setResumeFile(null);
    setResumeMetadata({
      name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
      uploadDate: getFormattedDate(),
      fileSize: "2.4 MB"
    });
    showNotification('Resume deleted');
  };

  // Resume view
  const handleViewResume = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } else if (resumeConfig_.enabled) {
      window.open(resumeConfig_.resumeUrl, '_blank');
    }
  };

  // Update personal details
  const handleUpdateDetails = () => {
    setDetails(adminFormData);
    storageUtils.setPersonalDetails(adminFormData);
    showNotification('Contact information updated');
  };

  // Toggle resume section
  const handleToggleResumeSection = () => {
    const newConfig = { ...resumeConfig_, enabled: !resumeConfig_.enabled };
    setResumeConfig_(newConfig);
    storageUtils.setResumeConfig(newConfig);
    showNotification(`Resume section ${newConfig.enabled ? 'enabled' : 'disabled'}`);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900'}`}>
      {/* Admin Settings Button */}
      <button
        onClick={() => setShowAdminPanel(!showAdminPanel)}
        className={`fixed bottom-8 right-8 z-40 p-3 rounded-full shadow-lg transition-all hover:scale-110 ${isDark ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
        title="Admin Settings"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Admin Settings Panel */}
      {showAdminPanel && (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-black/50' : 'bg-black/30'}`}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className={`w-full max-w-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold">Admin Settings</h2>
                  <button onClick={() => setShowAdminPanel(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Theme Toggle */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Theme</h3>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Current: {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-lg transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
                      >
                        {isDark ? <Sun className="h-6 w-6 text-amber-400" /> : <Moon className="h-6 w-6 text-slate-600" />}
                      </button>
                    </div>
                  </div>

                  {/* Profile Image Management */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <h3 className="text-lg font-bold mb-4">Profile Image</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Upload New Image
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${isDark ? 'border-slate-700 hover:border-amber-500 hover:bg-slate-800' : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                            id="profile-upload"
                          />
                          <label htmlFor="profile-upload" className="cursor-pointer block">
                            <Upload className={`h-6 w-6 mx-auto mb-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                            <p className="text-sm font-medium">Click to upload (Max 5MB)</p>
                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>JPG, PNG, WebP</p>
                          </label>
                        </div>
                      </div>
                      {profileImage && (
                        <button
                          onClick={handleDeleteProfileImage}
                          className="w-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Current Image
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                        <input
                          type="text"
                          value={adminFormData.name}
                          onChange={(e) => setAdminFormData({...adminFormData, name: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Headline</label>
                        <input
                          type="text"
                          value={adminFormData.headline}
                          onChange={(e) => setAdminFormData({...adminFormData, headline: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                        <input
                          type="email"
                          value={adminFormData.email}
                          onChange={(e) => setAdminFormData({...adminFormData, email: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Phone</label>
                        <input
                          type="tel"
                          value={adminFormData.phone}
                          onChange={(e) => setAdminFormData({...adminFormData, phone: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>LinkedIn URL</label>
                        <input
                          type="url"
                          value={adminFormData.linkedin}
                          onChange={(e) => setAdminFormData({...adminFormData, linkedin: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>GitHub URL</label>
                        <input
                          type="url"
                          value={adminFormData.github}
                          onChange={(e) => setAdminFormData({...adminFormData, github: e.target.value})}
                          className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                        />
                      </div>
                      <button
                        onClick={handleUpdateDetails}
                        className={`w-full font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                      >
                        <Check className="h-4 w-4" />
                        Save Contact Information
                      </button>
                    </div>
                  </div>

                  {/* Resume Management */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <h3 className="text-lg font-bold mb-4">Resume Management</h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Upload Resume
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${isDark ? 'border-slate-700 hover:border-amber-500 hover:bg-slate-800' : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="hidden"
                            id="admin-resume-upload"
                          />
                          <label htmlFor="admin-resume-upload" className="cursor-pointer block">
                            <Upload className={`h-6 w-6 mx-auto mb-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                            <p className="text-sm font-medium">Click to upload (Max 10MB)</p>
                            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>PDF, DOC, DOCX</p>
                          </label>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Current Resume: {resumeMetadata.name}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Uploaded: {resumeMetadata.uploadDate}</p>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={handleResumeDownload}
                          className={`w-full font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-blue-900 hover:bg-blue-800 text-blue-300' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
                        >
                          <Download className="h-4 w-4" />
                          Download Resume
                        </button>
                        {resumeFile && (
                          <button
                            onClick={handleDeleteResume}
                            className={`w-full font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-red-900 hover:bg-red-800 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-700'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Uploaded Resume
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resume Section Toggle */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2">Resume Section</h3>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Status: {resumeConfig_.enabled ? 'Visible' : 'Hidden'}</p>
                      </div>
                      <button
                        onClick={handleToggleResumeSection}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${resumeConfig_.enabled ? (isDark ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200') : (isDark ? 'bg-red-900 text-red-300 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200')}`}
                      >
                        {resumeConfig_.enabled ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAdminPanel(false)}
                  className={`w-full mt-8 font-semibold py-2 px-4 rounded-lg transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}`}
                >
                  Close Admin Panel
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-40 px-6 py-3 rounded-lg font-semibold transition-all ${isDark ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'} shadow-lg`}>
          {notification}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-40 shadow-sm transition-colors duration-300 ${isDark ? 'bg-slate-900/80 border-b border-slate-800' : 'bg-white/80 border-b border-slate-200'} backdrop-blur-lg`}>
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Nitish<span className={isDark ? 'text-amber-500' : 'text-emerald-600'}>.</span>Chunduru
          </h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className={`transition-colors font-medium text-sm ${isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-emerald-600'}`}>About</a>
            <a href="#experience" className={`transition-colors font-medium text-sm ${isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-emerald-600'}`}>Experience</a>
            <a href="#skills" className={`transition-colors font-medium text-sm ${isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-emerald-600'}`}>Skills</a>
            {resumeConfig_.enabled && (
              <a href="#resume" className={`transition-colors font-medium text-sm ${isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-emerald-600'}`}>Resume</a>
            )}
            <a href="#contact" className={`transition-colors font-medium text-sm ${isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-emerald-600'}`}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge className={`inline-block font-semibold px-3 py-1 rounded-full text-xs ${isDark ? 'bg-amber-900 text-amber-200' : 'bg-emerald-100 text-emerald-700'}`}>
                  SAP MM Consultant
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  {details.name}
                </h1>
                <h2 className={`text-2xl md:text-3xl font-semibold ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>
                  {details.headline}
                </h2>
                <p className={`text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {details.subtitle}
                </p>
                <p className={`text-base leading-relaxed max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                  Enterprise resource planning specialist with 1+ years of hands-on experience in SAP MM migration, procurement processes, and inventory management. Proven expertise in P2P cycle, materials master data, and production support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => window.location.href = `mailto:${details.email}`}
                  className={`font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group ${isDark ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                >
                  <Mail className="h-5 w-5" />
                  Contact Me
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  asChild 
                  className={`font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 ${isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  <a href={details.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button 
                  asChild 
                  className={`font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 ${isDark ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                >
                  <a href={details.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                {resumeConfig_.enabled && (
                  <Button 
                    onClick={handleResumeDownload}
                    className={`font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group ${isDark ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}
                  >
                    <Download className="h-5 w-5" />
                    Resume
                  </Button>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className={`absolute -inset-3 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-amber-200 to-slate-600' : 'bg-gradient-to-br from-emerald-200 to-slate-200'}`}></div>
              <div className={`relative overflow-hidden rounded-2xl border-4 shadow-xl bg-white ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200'}`}>
                <img
                  alt={details.name}
                  className="w-full aspect-square object-cover"
                  src={profileImage || '/profile.png'}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420'%3E%3Crect fill='%23e2e8f0' width='420' height='420'/%3E%3Ccircle cx='210' cy='140' r='60' fill='%23cbd5e1'/%3E%3Cellipse cx='210' cy='280' rx='80' ry='100' fill='%23cbd5e1'/%3E%3C/svg%3E"
                  }}
                  width={420}
                  height={420}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce ${isDark ? 'text-amber-500' : 'text-emerald-600'}`}>
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 md:py-32 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-y border-slate-800' : 'bg-white border-y border-slate-200'}`}>
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Professional Experience</h2>
              <div className={`w-24 h-1 bg-gradient-to-r ${isDark ? 'from-amber-500 to-amber-400' : 'from-emerald-600 to-emerald-400'}`}></div>
            </div>

            <Card className={`transition-all shadow-sm hover:shadow-md ${isDark ? 'border-slate-700 bg-slate-800 hover:border-amber-600' : 'border-slate-200 bg-white hover:border-emerald-200'}`}>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SAP MM Intern Trainee Consultant</h3>
                    <p className={`text-lg font-semibold mt-2 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>Proven Tech</p>
                  </div>
                  <Badge className={`${isDark ? 'bg-amber-900 text-amber-200' : 'bg-emerald-100 text-emerald-700'} font-semibold text-sm`}>Aug 2025 - Present</Badge>
                </div>
                <p className={`font-semibold mb-6 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>1 Year of Hands-on Experience in S4HANA Migration</p>
                
                <div className={`border-t pt-6 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                  <h4 className={`font-bold mb-4 text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Key Responsibilities & Achievements</h4>
                  <ul className={`space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <li className="flex gap-3">
                      <span className={`font-bold flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>▸</span>
                      <span>Supported SAP S4HANA migration and MM support in production environments</span>
                    </li>
                    <li className="flex gap-3">
                      <span className={`font-bold flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>▸</span>
                      <span>Managed PR, PO, GR, GI, and inventory processes with full lifecycle understanding</span>
                    </li>
                    <li className="flex gap-3">
                      <span className={`font-bold flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>▸</span>
                      <span>Executed MM master data validation and issue resolution during migration</span>
                    </li>
                    <li className="flex gap-3">
                      <span className={`font-bold flex-shrink-0 ${isDark ? 'text-amber-400' : 'text-emerald-600'}`}>▸</span>
                      <span>Ensured smooth post-migration support and system stability</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 md:py-32 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Core Competencies</h2>
              <div className={`w-24 h-1 bg-gradient-to-r ${isDark ? 'from-amber-500 to-amber-400' : 'from-emerald-600 to-emerald-400'}`}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "SAP Systems", skills: ["SAP MM", "SAP S4HANA", "SAP Fiori", "SAP ERP"] },
                { title: "Materials Management", skills: ["Procurement", "P2P Cycle", "Purchase Orders", "Goods Receipt"] },
                { title: "Process Expertise", skills: ["Inventory Management", "Material Master", "Goods Issue", "Vendor Management"] },
                { title: "System Integration", skills: ["SAP SD Integration", "SAP FI Integration"] },
                { title: "Implementation", skills: ["S4HANA Migration", "Testing", "Data Validation"] },
                { title: "Business Skills", skills: ["Problem Solving", "Process Optimization", "Documentation", "Team Collaboration"] },
              ].map((category, idx) => (
                <Card 
                  key={idx}
                  className={`transition-all bg-white group cursor-pointer hover:shadow-md ${isDark ? 'border-slate-700 bg-slate-800 hover:border-amber-600' : 'border-slate-200 hover:border-emerald-200'}`}
                >
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-lg mb-4 transition-colors group-hover:text-amber-500 ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, sidx) => (
                        <div key={sidx} className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Management Section */}
      {resumeConfig_.enabled && (
        <section id="resume" className={`py-20 md:py-32 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-y border-slate-800' : 'bg-white border-y border-slate-200'}`}>
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Resume Management</h2>
                <div className={`w-24 h-1 bg-gradient-to-r ${isDark ? 'from-amber-500 to-amber-400' : 'from-emerald-600 to-emerald-400'}`}></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <Card className={`shadow-sm ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200'}`}>
                  <CardContent className="p-8">
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Upload Resume</h3>
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDark ? 'border-slate-600 hover:border-amber-500 hover:bg-slate-700' : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <FileText className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Click to upload your resume</p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>PDF, DOC, or DOCX</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Preview & Actions */}
                <Card className={`shadow-sm ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200'}`}>
                  <CardContent className="p-8">
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Current Resume</h3>
                    <div className="space-y-4">
                      <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                        <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>File Name</p>
                        <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{resumeMetadata.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                          <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Upload Date</p>
                          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{resumeMetadata.uploadDate}</p>
                        </div>
                        <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                          <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>File Size</p>
                          <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{resumeMetadata.fileSize}</p>
                        </div>
                      </div>
                      <div className={`border-t pt-4 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                        <p className={`text-sm mb-3 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Resume Actions</p>
                        <div className="space-y-2">
                          <Button
                            onClick={handleViewResume}
                            className={`w-full font-semibold flex items-center justify-center gap-2 ${isDark ? 'bg-amber-900 hover:bg-amber-800 text-amber-200' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'}`}
                          >
                            <Eye className="h-4 w-4" />
                            View Resume
                          </Button>
                          <Button
                            onClick={handleResumeDownload}
                            className={`w-full font-semibold flex items-center justify-center gap-2 ${isDark ? 'bg-blue-900 hover:bg-blue-800 text-blue-200' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
                          >
                            <Download className="h-4 w-4" />
                            Download Resume
                          </Button>
                          <Button
                            onClick={handleDeleteResume}
                            className={`w-full font-semibold flex items-center justify-center gap-2 ${isDark ? 'bg-red-900 hover:bg-red-800 text-red-200' : 'bg-red-100 hover:bg-red-200 text-red-700'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Resume
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className={`py-20 md:py-32 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Get In Touch</h2>
            <div className={`w-24 h-1 bg-gradient-to-r mx-auto ${isDark ? 'from-amber-500 to-amber-400' : 'from-emerald-600 to-emerald-400'}`}></div>
            <p className={`text-lg mt-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Let&apos;s connect and discuss your SAP consulting needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: Mail, title: "Email", value: details.email, link: `mailto:${details.email}` },
              { icon: Phone, title: "Phone", value: details.phone, link: `tel:${details.phone.replace(/\s/g, '')}` },
              { icon: Linkedin, title: "LinkedIn", value: "Connect with me", link: details.linkedin }
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <a 
                  key={idx}
                  href={contact.link}
                  target={contact.title === "LinkedIn" ? "_blank" : undefined}
                  rel={contact.title === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <Card className={`transition-all bg-white h-full hover:shadow-md ${isDark ? 'border-slate-700 bg-slate-800 hover:border-amber-600' : 'border-slate-200 hover:border-emerald-200'}`}>
                    <CardContent className="p-6 text-center">
                      <Icon className={`h-10 w-10 mx-auto mb-3 transition-colors group-hover:text-amber-500 ${isDark ? 'text-amber-400' : 'text-emerald-600 group-hover:text-emerald-700'}`} />
                      <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{contact.title}</h3>
                      <p className={`break-all text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{contact.value}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => window.location.href = `mailto:${details.email}`}
              className={`font-semibold py-3 px-8 rounded-lg transition-all inline-flex items-center gap-2 group ${isDark ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
            >
              Start A Conversation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t transition-colors duration-300 ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-900 border-slate-800 text-white'}`}>
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
            <div>
              <h4 className="text-xl font-bold mb-2">Nitish Chunduru</h4>
              <p className="text-slate-400">SAP MM Consultant & Enterprise Specialist</p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-3">Quick Links</h5>
              <div className="space-y-2 text-slate-400 text-sm">
                <a href="#experience" className={`hover:transition block ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>Experience</a>
                <a href="#skills" className={`hover:transition block ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>Skills</a>
                {resumeConfig_.enabled && (
                  <a href="#resume" className={`hover:transition block ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>Resume</a>
                )}
                <a href="#contact" className={`hover:transition block ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>Contact</a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-3">Follow</h5>
              <div className="space-y-2">
                <a href={details.linkedin} target="_blank" rel="noopener noreferrer" className={`text-slate-400 transition block text-sm ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>
                  LinkedIn
                </a>
                <a href={details.github} target="_blank" rel="noopener noreferrer" className={`text-slate-400 transition block text-sm ${isDark ? 'hover:text-amber-400' : 'hover:text-emerald-400'}`}>
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2026 {details.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

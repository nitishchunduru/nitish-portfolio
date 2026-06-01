'use client'

import { useState, useEffect, useRef } from 'react'
import { Linkedin, Mail, Phone, Download, ChevronDown, ArrowRight, Github, FileText, Trash2, Eye, Settings, Moon, Sun, Upload, X, Check, ZoomIn, ZoomOut, Move } from "lucide-react"
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
  getResumeConfig: () => {
    if (typeof window === 'undefined') return resumeConfig;
    const stored = localStorage.getItem('resumeConfig');
    return stored ? JSON.parse(stored) : resumeConfig;
  },
  setResumeConfig: (config) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeConfig', JSON.stringify(config));
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
  // State management
  const [theme, setTheme] = useState('light');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileSettings, setProfileSettings] = useState({ zoom: 1, positionX: 0, positionY: 0 });
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [tempImageData, setTempImageData] = useState(null);
  const [tempImageSettings, setTempImageSettings] = useState({ zoom: 1, positionX: 0, positionY: 0 });
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
  const imageCanvasRef = useRef(null);

  // Initialize theme and load data on mount
  useEffect(() => {
    const savedTheme = storageUtils.getTheme();
    setTheme(savedTheme);
    const savedImage = storageUtils.getProfileImage();
    setProfileImage(savedImage);
    const savedSettings = storageUtils.getProfileSettings();
    setProfileSettings(savedSettings);
    const savedDetails = storageUtils.getPersonalDetails();
    setDetails(savedDetails);
    const savedResumeConfig = storageUtils.getResumeConfig();
    setResumeConfig_(savedResumeConfig);
    const savedIsAdmin = storageUtils.getIsAdmin();
    setIsAdmin(savedIsAdmin);
    setAdminFormData(savedDetails);
  }, []);

  // Update document theme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      storageUtils.setTheme(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Enhanced Profile Image Upload with Editor
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
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
        setTempImageData(event.target.result);
        setTempImageSettings({ zoom: 1, positionX: 0, positionY: 0 });
        setShowImageEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileImage = () => {
    if (tempImageData) {
      storageUtils.setProfileImage(tempImageData);
      storageUtils.setProfileSettings(tempImageSettings);
      setProfileImage(tempImageData);
      setProfileSettings(tempImageSettings);
      setShowImageEditor(false);
      setTempImageData(null);
      showNotification('Profile image updated successfully');
    }
  };

  const resetImagePosition = () => {
    setTempImageSettings({ zoom: 1, positionX: 0, positionY: 0 });
  };

  const deleteProfileImage = () => {
    if (confirm('Are you sure you want to delete your profile image?')) {
      storageUtils.deleteProfileImage();
      setProfileImage(null);
      setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 });
      showNotification('Profile image deleted');
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotification('Resume must be less than 10MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        showNotification('Only PDF, DOC, and DOCX formats allowed');
        return;
      }
      setResumeFile(file);
      setResumeMetadata({
        name: file.name,
        uploadDate: getFormattedDate(),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB"
      });
      showNotification('Resume uploaded successfully');
    }
  };

  const downloadResume = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = resumeFile.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const deleteResume = () => {
    if (confirm('Are you sure you want to delete the resume?')) {
      setResumeFile(null);
      setResumeMetadata({
        name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
        uploadDate: getFormattedDate(),
        fileSize: "2.4 MB"
      });
      showNotification('Resume deleted');
    }
  };

  const updatePersonalDetails = (e) => {
    e.preventDefault();
    storageUtils.setPersonalDetails(adminFormData);
    setDetails(adminFormData);
    showNotification('Contact information updated');
  };

  const toggleAdminMode = () => {
    const newAdminState = !isAdmin;
    storageUtils.setIsAdmin(newAdminState);
    setIsAdmin(newAdminState);
    showNotification(newAdminState ? 'Admin mode enabled' : 'Admin mode disabled');
  };

  // Core Competencies with Icons
  const competencies = [
    { category: "SAP Modules", skills: ["SAP MM", "SAP S4HANA", "SAP Fiori", "SAP ERP"] },
    { category: "P2P Process", skills: ["Procure to Pay", "Purchase Requisition", "Purchase Order", "Goods Receipt", "Goods Issue"] },
    { category: "Inventory", skills: ["Inventory Management", "Stock Transfers", "Data Validation"] },
    { category: "Testing & Support", skills: ["User Acceptance Testing", "Functional Testing", "End User Support", "Troubleshooting"] },
    { category: "Integration", skills: ["SAP FI Integration", "SAP SD Integration", "SAP PP Integration"] },
    { category: "Database", skills: ["Oracle SQL", "PLSQL", "Data Reconciliation"] },
    { category: "Documentation", skills: ["Business Documentation", "Reporting", "Analytics"] }
  ];

  const projects = [
    {
      name: "Cohance Migration Support SAP MM S4HANA",
      role: "SAP MM Trainee Consultant",
      company: "Proven Tech",
      period: "Aug 2025 - Present",
      achievements: [
        "Migration Support for SAP MM module",
        "PR, PO, GR, GI Activities",
        "Data Validation and Reconciliation",
        "Testing and Issue Resolution",
        "Post Migration Support"
      ]
    }
  ];

  // Default Avatar SVG
  const DefaultAvatar = () => (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
      <svg className="w-20 h-20 text-slate-500 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          {notification}
        </div>
      )}

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
            {details.name}
          </h1>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdminPanel(true)}
              className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 dark:border-amber-400 shadow-2xl">
              {profileImage ? (
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${profileImage})`,
                    backgroundPosition: `${50 + profileSettings.positionX}% ${50 + profileSettings.positionY}%`,
                    backgroundSize: `${profileSettings.zoom * 100}%`
                  }}
                />
              ) : (
                <DefaultAvatar />
              )}
            </div>
          </div>

          {/* Hero Content */}
          <div>
            <h2 className={`text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {details.name}
            </h2>
            <p className={`text-2xl font-semibold mb-2 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
              {details.headline}
            </p>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {details.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => window.location.href = `mailto:${details.email}`}
                className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(details.linkedin, '_blank')}
                className={theme === 'dark' ? 'border-amber-400 text-amber-400' : 'border-blue-600 text-blue-600'}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(details.github, '_blank')}
                className={theme === 'dark' ? 'border-amber-400 text-amber-400' : 'border-blue-600 text-blue-600'}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              {resumeConfig_.enabled && (
                <Button
                  variant="outline"
                  onClick={() => downloadResume()}
                  className={theme === 'dark' ? 'border-amber-400 text-amber-400' : 'border-blue-600 text-blue-600'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Core Competencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {competencies.map((comp, idx) => (
              <Card key={idx} className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'}>
                <CardContent className="p-6">
                  <h3 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                    {comp.category}
                  </h3>
                  <div className="space-y-2">
                    {comp.skills.map((skill, sidx) => (
                      <Badge
                        key={sidx}
                        className={`block text-center ${theme === 'dark' ? 'bg-slate-700 text-amber-300' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Experience */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Project Experience
          </h2>
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <Card key={idx} className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                        {project.name}
                      </h3>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {project.role}
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {project.company} | {project.period}
                      </p>
                    </div>
                  </div>
                  <div className={`space-y-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.achievements.map((achievement, aidx) => (
                      <div key={aidx} className="flex items-start gap-2">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      {resumeConfig_.enabled && (
        <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Resume
            </h2>
            <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'}>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Resume Metadata */}
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                      {resumeMetadata.name}
                    </h3>
                    <div className={`text-sm space-y-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      <p>Upload Date: {resumeMetadata.uploadDate}</p>
                      <p>File Size: {resumeMetadata.fileSize}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() => downloadResume()}
                      className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    {isAdmin && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('resumeUpload')?.click()}
                          className={theme === 'dark' ? 'border-amber-400 text-amber-400' : 'border-blue-600 text-blue-600'}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Replace Resume
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => deleteResume()}
                          className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Resume
                        </Button>
                      </>
                    )}
                  </div>
                  <input
                    id="resumeUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* SAP Certifications & Learning Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            SAP Certifications & Learning
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Certification 1 */}
            <Card className={`transition-all duration-300 hover:shadow-lg cursor-default ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-amber-400' : 'bg-white hover:border-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Business Processes in SAP S/4HANA Sourcing and Procurement
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      SAP Learning
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      Completed May 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certification 2 */}
            <Card className={`transition-all duration-300 hover:shadow-lg cursor-default ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-amber-400' : 'bg-white hover:border-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Exploring SAP Cloud ERP
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      SAP Learning
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      Completed May 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certification 3 */}
            <Card className={`transition-all duration-300 hover:shadow-lg cursor-default ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-amber-400' : 'bg-white hover:border-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      SAP Ariba Sourcing Overview
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      SAP Learning
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      Completed May 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certification 4 */}
            <Card className={`transition-all duration-300 hover:shadow-lg cursor-default ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-amber-400' : 'bg-white hover:border-blue-500'}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                    <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Introduction to AI Core
                    </h3>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      SAP Learning
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                      Completed May 2026
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Email</p>
                    <a href={`mailto:${details.email}`} className={`font-semibold ${theme === 'dark' ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-blue-600'}`}>
                      {details.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50'}>
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <Phone className={`w-6 h-6 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Phone</p>
                    <a href={`tel:${details.phone}`} className={`font-semibold ${theme === 'dark' ? 'text-white hover:text-amber-400' : 'text-slate-900 hover:text-blue-600'}`}>
                      {details.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-white'} border-t transition-colors duration-300 py-8`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2026 {details.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                  Admin Settings
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdminPanel(false)}
                  className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Admin Mode Toggle */}
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <Button
                  onClick={toggleAdminMode}
                  className={isAdmin ? (theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700') : 'bg-gray-400'}
                >
                  {isAdmin ? 'Admin Mode: ON' : 'Admin Mode: OFF'}
                </Button>
              </div>

              {/* Profile Image Management */}
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <h4 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                  Profile Image Management
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => document.getElementById('profileImageUpload')?.click()}
                    className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  {profileImage && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteProfileImage()}
                      className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Image
                    </Button>
                  )}
                </div>
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>

              {/* Image Editor Modal */}
              {showImageEditor && tempImageData && (
                <div className={`p-4 rounded-lg mb-6 border-2 ${theme === 'dark' ? 'border-amber-400 bg-slate-700' : 'border-blue-600 bg-slate-100'}`}>
                  <h5 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                    Position Your Image
                  </h5>

                  {/* Preview */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-blue-500 dark:border-amber-400">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${tempImageData})`,
                        backgroundPosition: `${50 + tempImageSettings.positionX}% ${50 + tempImageSettings.positionY}%`,
                        backgroundSize: `${tempImageSettings.zoom * 100}%`
                      }}
                    />
                  </div>

                  {/* Zoom Control */}
                  <div className="space-y-2 mb-4">
                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Zoom: {(tempImageSettings.zoom * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={tempImageSettings.zoom}
                      onChange={(e) => setTempImageSettings({ ...tempImageSettings, zoom: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  {/* Vertical Position */}
                  <div className="space-y-2 mb-4">
                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Vertical: {tempImageSettings.positionY}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="5"
                      value={tempImageSettings.positionY}
                      onChange={(e) => setTempImageSettings({ ...tempImageSettings, positionY: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  {/* Horizontal Position */}
                  <div className="space-y-2 mb-4">
                    <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Horizontal: {tempImageSettings.positionX}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="5"
                      value={tempImageSettings.positionX}
                      onChange={(e) => setTempImageSettings({ ...tempImageSettings, positionX: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetImagePosition}
                      className={theme === 'dark' ? 'border-slate-600' : ''}
                    >
                      Reset Position
                    </Button>
                    <Button
                      size="sm"
                      onClick={saveProfileImage}
                      className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                    >
                      Save Image
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowImageEditor(false);
                        setTempImageData(null);
                      }}
                      className={theme === 'dark' ? 'border-slate-600' : ''}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <h4 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                  Contact Information
                </h4>
                <form onSubmit={updatePersonalDetails} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={adminFormData.name}
                      onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={adminFormData.email}
                      onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={adminFormData.phone}
                      onChange={(e) => setAdminFormData({ ...adminFormData, phone: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={adminFormData.linkedin}
                      onChange={(e) => setAdminFormData({ ...adminFormData, linkedin: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={adminFormData.github}
                      onChange={(e) => setAdminFormData({ ...adminFormData, github: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-600 border-slate-500 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 w-full' : 'bg-blue-600 hover:bg-blue-700 text-white w-full'}
                  >
                    Save Contact Information
                  </Button>
                </form>
              </div>

              {/* Resume Management (Admin Only) */}
              {isAdmin && resumeConfig_.enabled && (
                <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <h4 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                    Resume Management
                  </h4>
                  <Button
                    size="sm"
                    onClick={() => document.getElementById('resumeUploadAdmin')?.click()}
                    className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Resume
                  </Button>
                  <input
                    id="resumeUploadAdmin"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Theme Settings */}
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <h4 className={`font-bold mb-4 ${theme === 'dark' ? 'text-amber-400' : 'text-blue-600'}`}>
                  Theme
                </h4>
                <Button
                  onClick={toggleTheme}
                  className={theme === 'dark' ? 'bg-amber-500 hover:bg-amber-600 text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </Button>
              </div>

              {/* Close Button */}
              <Button
                variant="outline"
                onClick={() => setShowAdminPanel(false)}
                className={`w-full ${theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}`}
              >
                Close Admin Panel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

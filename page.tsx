'use client'

import { useState, useEffect, useRef } from 'react'
import { Linkedin, Mail, Phone, Download, ArrowRight, Github, FileText, Trash2, Eye, Settings, Upload, X, Check, Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight as ChevronArrow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Central Resume URL Variable
const resumeUrl = "/Nitish_Chunduru_SAP_MM_Resume.pdf"

const personalDetails = {
  name: "Nitish Chunduru",
  headline: "SAP MM Consultant",
  subtitle: "SAP S4HANA | SAP MM | SAP Fiori | Procurement | Inventory Management | P2P Cycle",
  email: "chundurunitish2001@gmail.com",
  phone: "+91 8074300526",
  linkedin: "https://www.linkedin.com/in/nitish-chunduru",
  github: "https://github.com/nitishchunduru",
}

// Format date consistently
const getFormattedDate = () => {
  const date = new Date()
  return date.toISOString().split('T')[0]
}

// LocalStorage utilities
const storageUtils = {
  getProfileImage: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('profileImage')
  },
  setProfileImage: (imageData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileImage', imageData)
    }
  },
  getProfileSettings: () => {
    if (typeof window === 'undefined') return { zoom: 1, positionX: 0, positionY: 0 }
    const stored = localStorage.getItem('profileSettings')
    return stored ? JSON.parse(stored) : { zoom: 1, positionX: 0, positionY: 0 }
  },
  setProfileSettings: (settings) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('profileSettings', JSON.stringify(settings))
    }
  },
  deleteProfileImage: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('profileImage')
      localStorage.removeItem('profileSettings')
    }
  },
  getPersonalDetails: () => {
    if (typeof window === 'undefined') return personalDetails
    const stored = localStorage.getItem('personalDetails')
    return stored ? JSON.parse(stored) : personalDetails
  },
  setPersonalDetails: (details) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personalDetails', JSON.stringify(details))
    }
  },
  getResumeData: () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('resumeData')
  },
  setResumeData: (base64Data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeData', base64Data)
    }
  },
  deleteResumeData: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('resumeData')
      localStorage.removeItem('resumeMetadata')
    }
  },
  getResumeMetadata: () => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('resumeMetadata')
    return stored ? JSON.parse(stored) : null
  },
  setResumeMetadata: (metadata) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeMetadata', JSON.stringify(metadata))
    }
  },
  getIsAdmin: () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('isAdmin') === 'true'
  },
  setIsAdmin: (isAdmin) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
    }
  },
}

export default function Portfolio() {
  // State management
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileSettings, setProfileSettings] = useState({ zoom: 1, positionX: 0, positionY: 0 })

  const [details, setDetails] = useState(personalDetails)
  const [resumeData, setResumeData] = useState(null)
  const [resumeMetadata, setResumeMetadata] = useState({
    name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
    uploadDate: getFormattedDate(),
    fileSize: "2.4 MB",
    version: 1,
    exists: false,
  })
  const [notification, setNotification] = useState(null)
  const [adminFormData, setAdminFormData] = useState(personalDetails)
  const imageCanvasRef = useRef(null)

  // Initialize and load data on mount
  useEffect(() => {
    const savedImage = storageUtils.getProfileImage()
    setProfileImage(savedImage)

    const savedSettings = storageUtils.getProfileSettings()
    setProfileSettings(savedSettings)

    const savedDetails = storageUtils.getPersonalDetails()
    setDetails(savedDetails)
    setAdminFormData(savedDetails)

    // Load resume data
    const savedResumeData = storageUtils.getResumeData()
    const savedResumeMetadata = storageUtils.getResumeMetadata()

    if (savedResumeData && savedResumeMetadata) {
      setResumeData(savedResumeData)
      setResumeMetadata({
        ...savedResumeMetadata,
        exists: true,
      })
    }

    const isAdminMode = storageUtils.getIsAdmin()
    setIsAdmin(isAdminMode)
  }, [])

  // Show notification
  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image must be less than 5MB')
      return
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showNotification('Only JPG, PNG, and WebP formats allowed')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result
      // Upload image with default zoom/position settings
      storageUtils.setProfileImage(imageData)
      storageUtils.setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 })
      setProfileImage(imageData)
      setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 })
      showNotification('Image uploaded successfully')
    }
    reader.readAsDataURL(file)
  }

  // Save image with settings
  const saveImageWithSettings = () => {
    if (!profileImage) return

    storageUtils.setProfileImage(profileImage)
    storageUtils.setProfileSettings(profileSettings)

    showNotification('Image settings saved successfully')
  }

  // Delete profile image
  const deleteProfileImage = () => {
    storageUtils.deleteProfileImage()
    setProfileImage(null)
    setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 })
    showNotification('Profile image deleted')
  }

  // Handle resume upload
  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      showNotification('Resume must be less than 10MB')
      return
    }

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      showNotification('Only PDF, DOC, and DOCX formats allowed')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result

      // Store base64 data and metadata
      storageUtils.setResumeData(base64String)

      const newMetadata = {
        name: file.name,
        uploadDate: getFormattedDate(),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        version: (resumeMetadata.version || 0) + 1,
        exists: true,
      }

      storageUtils.setResumeMetadata(newMetadata)
      setResumeData(base64String)
      setResumeMetadata(newMetadata)

      showNotification('Resume uploaded and replaced successfully')
    }
    reader.readAsDataURL(file)
  }

  // Delete resume
  const deleteResume = () => {
    storageUtils.deleteResumeData()
    setResumeData(null)
    setResumeMetadata({
      name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
      uploadDate: getFormattedDate(),
      fileSize: "2.4 MB",
      version: 0,
      exists: false,
    })
    showNotification('Resume deleted')
  }

  // Handle contact info update
  const handleUpdateContact = () => {
    storageUtils.setPersonalDetails(adminFormData)
    setDetails(adminFormData)
    showNotification('Contact information updated')
  }

  // Render profile image with settings
  const renderProfileImage = () => {
    const imageSource = profileImage || null

    if (!imageSource) {
      return (
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-amber-400 flex items-center justify-center text-white text-4xl font-bold">
          NC
        </div>
      )
    }

    return (
      <div
        className="w-48 h-48 rounded-full overflow-hidden border-4 border-amber-400 flex-shrink-0"
        style={{
          backgroundImage: `url(${imageSource})`,
          backgroundSize: `${profileSettings.zoom * 100}%`,
          backgroundPosition: `${50 + profileSettings.positionX * 10}% ${50 + profileSettings.positionY * 10}%`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400">{details.name}</h1>
          <Button
            onClick={() => {
              setShowAdminPanel(true)
            }}
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
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="text-slate-400 hover:text-white"
                >
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
                      setIsAdmin(e.target.checked)
                      storageUtils.setIsAdmin(e.target.checked)
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
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer block">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-slate-300 font-medium">{profileImage ? 'Replace Image' : 'Upload Image'}</p>
                      <p className="text-slate-500 text-sm mt-1">JPG, PNG, WebP - max 5MB</p>
                    </label>
                  </div>

                  {/* Current Image Preview & Controls */}
                  {profileImage && (
                    <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                      <h4 className="font-bold text-amber-400 mb-4">Current Image Preview</h4>
                      
                      {/* Image Preview */}
                      <div className="mb-4 flex justify-center">
                        <div
                          className="w-40 h-40 rounded-full overflow-hidden border-4 border-amber-400"
                          style={{
                            backgroundImage: `url(${profileImage})`,
                            backgroundSize: `${profileSettings.zoom * 100}%`,
                            backgroundPosition: `${50 + profileSettings.positionX * 10}% ${50 + profileSettings.positionY * 10}%`,
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      </div>

                      {/* Zoom Controls */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-slate-300 text-sm font-medium">Zoom</label>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    zoom: Math.max(0.5, profileSettings.zoom - 0.1),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-slate-300 w-12 text-center text-sm">
                                {(profileSettings.zoom * 100).toFixed(0)}%
                              </span>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    zoom: Math.min(2, profileSettings.zoom + 0.1),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={profileSettings.zoom}
                            onChange={(e) =>
                              setProfileSettings({
                                ...profileSettings,
                                zoom: parseFloat(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                        </div>

                        {/* Vertical Position Controls */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-slate-300 text-sm font-medium">Vertical Position (Up/Down)</label>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    positionY: Math.max(-5, profileSettings.positionY - 0.5),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    positionY: Math.min(5, profileSettings.positionY + 0.5),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={profileSettings.positionY}
                            onChange={(e) =>
                              setProfileSettings({
                                ...profileSettings,
                                positionY: parseFloat(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                        </div>

                        {/* Horizontal Position Controls */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-slate-300 text-sm font-medium">Horizontal Position (Left/Right)</label>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    positionX: Math.max(-5, profileSettings.positionX - 0.5),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() =>
                                  setProfileSettings({
                                    ...profileSettings,
                                    positionX: Math.min(5, profileSettings.positionX + 0.5),
                                  })
                                }
                                className="bg-slate-600 hover:bg-slate-500"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={profileSettings.positionX}
                            onChange={(e) =>
                              setProfileSettings({
                                ...profileSettings,
                                positionX: parseFloat(e.target.value),
                              })
                            }
                            className="w-full"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button
                            onClick={() => setProfileSettings({ zoom: 1, positionX: 0, positionY: 0 })}
                            className="bg-slate-600 hover:bg-slate-500 text-white"
                          >
                            Reset Position
                          </Button>
                          <Button
                            onClick={saveImageWithSettings}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Delete Button */}
                  {profileImage && (
                    <Button onClick={deleteProfileImage} variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Image
                    </Button>
                  )}
                </div>
              </div>

              {/* Contact Information Management */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={adminFormData.name}
                    onChange={(e) => setAdminFormData({ ...adminFormData, name: e.target.value })}
                    placeholder="Name"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="email"
                    value={adminFormData.email}
                    onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="tel"
                    value={adminFormData.phone}
                    onChange={(e) => setAdminFormData({ ...adminFormData, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="url"
                    value={adminFormData.linkedin}
                    onChange={(e) => setAdminFormData({ ...adminFormData, linkedin: e.target.value })}
                    placeholder="LinkedIn URL"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  />
                  <input
                    type="url"
                    value={adminFormData.github}
                    onChange={(e) => setAdminFormData({ ...adminFormData, github: e.target.value })}
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
                    {/* Current Resume Status */}
                    <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                      <h4 className="font-bold text-amber-400 mb-3">Current Resume</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">File Name</p>
                          <p className="text-white font-medium">{resumeMetadata.name}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Upload Date</p>
                          <p className="text-white font-medium">{resumeMetadata.uploadDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">File Size</p>
                          <p className="text-white font-medium">{resumeMetadata.fileSize}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Version</p>
                          <p className="text-white font-medium">v{resumeMetadata.version}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-slate-400">Status</p>
                          <p className={`font-medium ${resumeMetadata.exists ? 'text-green-400' : 'text-slate-400'}`}>
                            {resumeMetadata.exists ? '✓ Active (Custom)' : '○ Default'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Upload/Replace Section */}
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resumeUpload"
                      />
                      <label htmlFor="resumeUpload" className="cursor-pointer block">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <p className="text-slate-300 font-medium">{resumeMetadata.exists ? 'Replace Resume' : 'Upload Resume'}</p>
                        <p className="text-slate-500 text-sm mt-1">PDF, DOC, DOCX - max 10MB</p>
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      {resumeMetadata.exists && resumeData && (
                        <>
                          <Button
                            onClick={() => window.open(resumeData, '_blank')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Resume
                          </Button>
                          <Button
                            onClick={() => {
                              const link = document.createElement('a')
                              link.href = resumeData
                              link.download = resumeMetadata.name
                              link.click()
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Delete Button */}
                    {resumeMetadata.exists && (
                      <Button
                        onClick={deleteResume}
                        variant="destructive"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Custom Resume
                      </Button>
                    )}

                    {/* Info Text */}
                    <p className="text-xs text-slate-500 mt-4">
                      💡 Tip: Uploading a new resume automatically replaces the current one. All changes are saved to your browser's storage.
                    </p>
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
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">{renderProfileImage()}</div>

            {/* Hero Content */}
            <div className="flex-1">
              <h2 className="text-5xl font-bold mb-4 text-white">{details.name}</h2>
              <p className="text-2xl font-semibold mb-2 text-amber-400">{details.headline}</p>
              <p className="text-lg mb-6 text-slate-300">{details.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${details.email}`}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </Button>
                </a>
                <a href={details.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href={details.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href={resumeData || resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10">
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Professional Experience</h2>
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-400">SAP MM Trainee Consultant</h3>
                    <p className="font-semibold text-slate-300">ProvenTech Consulting Private Limited</p>
                    <p className="text-sm text-slate-400">Aug 2025 – Present</p>
                  </div>
                </div>
                <div className="space-y-2 text-slate-300">
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Supported SAP S4HANA migration activities</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Worked on Purchase Requisition (PR) and Purchase Orders (PO)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Supported Goods Receipt (GR) and Goods Issue (GI) activities</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Performed data validation and reconciliation</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Assisted testing and post migration support</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-amber-400 mr-3">•</span>
                    <span>Provided end user support</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Experience Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Project Experience</h2>
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Cohance Migration Support SAP MM S4HANA</h3>
                <p className="font-semibold text-slate-300 mb-4">SAP MM Trainee Consultant</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-amber-400 mb-3">Key Activities:</p>
                    <div className="space-y-2 text-slate-300">
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>Migration Support</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>Data Validation</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>PR Processing</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>PO Processing</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>GR Activities</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>GI Activities</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>Testing</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>Issue Resolution</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-amber-400 mr-2">▸</span>
                        <span>Post Migration Support</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-amber-400 mb-3">Technologies & Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {['SAP MM', 'SAP S4HANA', 'SAP Fiori', 'Data Validation', 'Testing', 'PR/PO', 'GR/GI'].map(
                        (skill, i) => (
                          <Badge key={i} className="bg-slate-600 text-amber-300 hover:bg-slate-500">
                            {skill}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Skills & Competencies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-amber-400">SAP MM Modules</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'SAP MM',
                    'SAP S4HANA',
                    'SAP Fiori',
                    'SAP ERP',
                    'Procure to Pay (P2P)',
                    'Purchase Requisition',
                    'Purchase Order',
                    'Goods Receipt',
                    'Goods Issue',
                    'Inventory Management',
                    'Stock Transfers',
                    'Vendor Management',
                    'Material Master',
                  ].map((skill, i) => (
                    <Badge key={i} className="bg-slate-700 text-amber-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-amber-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Data Validation',
                    'Data Reconciliation',
                    'User Acceptance Testing',
                    'Functional Testing',
                    'End User Support',
                    'Troubleshooting',
                    'SAP FI Integration',
                    'SAP SD Integration',
                    'SAP PP Integration',
                    'Oracle SQL',
                    'PL/SQL',
                    'Documentation',
                    'Reporting',
                  ].map((skill, i) => (
                    <Badge key={i} className="bg-slate-700 text-amber-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 text-amber-400">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Problem Solving',
                    'Analytical Skills',
                    'Requirements Gathering',
                    'Business Process Understanding',
                    'ERP Exposure',
                    'UAT Support',
                    'Communication',
                    'Team Collaboration',
                    'Time Management',
                    'Attention to Detail',
                  ].map((skill, i) => (
                    <Badge key={i} className="bg-slate-700 text-amber-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Certifications & Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Business Processes in SAP S/4HANA Sourcing and Procurement',
                source: 'SAP Learning',
                date: 'Completed May 2026',
              },
              { title: 'Exploring SAP Cloud ERP', source: 'SAP Learning', date: 'Completed May 2026' },
              {
                title: 'SAP Ariba Sourcing Overview',
                source: 'SAP Learning',
                date: 'Completed May 2026',
              },
              { title: 'Introduction to AI Core', source: 'SAP Learning', date: 'Completed May 2026' },
              {
                title: 'Python Full Stack Developer',
                source: 'Professional Certification',
                date: 'Completed Jan 2025',
              },
              {
                title: 'TCS iON Career Edge Young Professional',
                source: 'TCS iON',
                date: 'Completed Dec 2024',
              },
            ].map((cert, idx) => (
              <Card key={idx} className="bg-slate-700 border-slate-600 hover:border-amber-400 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/10">
                      <Check className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white">{cert.title}</h3>
                      <p className="text-sm mt-2 text-slate-400">{cert.source}</p>
                      <p className="text-xs mt-1 text-slate-500">{cert.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Get In Touch</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-slate-800 border-slate-700 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">Email</h3>
                <a href={`mailto:${details.email}`} className="text-slate-300 hover:text-amber-400 text-sm break-all">
                  {details.email}
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">Phone</h3>
                <a href={`tel:${details.phone}`} className="text-slate-300 hover:text-amber-400 text-sm">
                  {details.phone}
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Linkedin className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">LinkedIn</h3>
                <a
                  href={details.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Visit Profile
                </a>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 hover:border-amber-400 transition-colors">
              <CardContent className="p-6 text-center">
                <Github className="w-8 h-8 mx-auto mb-4 text-amber-400" />
                <h3 className="font-bold mb-2 text-white">GitHub</h3>
                <a
                  href={details.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
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
  )
}

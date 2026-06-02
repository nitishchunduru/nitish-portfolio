# Resume Management Guide

## Overview

The enhanced Resume Management system in the Admin Settings panel provides a professional interface for managing your resume. All resume data is stored securely in your browser's localStorage and persists across page refreshes.

## Admin Panel Access

1. Click the **Admin Settings** button in the top-right corner
2. Toggle **Admin Mode: ON** to access resume management
3. Scroll to the **Resume Management** section

## Resume Information Display

The Admin Panel displays the current resume status in a clearly organized format:

### Current Resume Section

This section shows all relevant information about your resume:

- **File Name**: The name of the currently active resume file
- **Upload Date**: The date the resume was last uploaded (YYYY-MM-DD format)
- **File Size**: The size of the resume file in MB
- **Version**: Automatically incrementing version number (v1, v2, v3, etc.)
- **Status**: Shows whether the current resume is "Active (Custom)" or "Default"

Example Display:
```
Current Resume
File Name: Nitish_Chunduru_SAP_MM_Resume.pdf
Upload Date: 2026-05-29
File Size: 2.4 MB
Version: v1
Status: ✓ Active (Custom)
```

## Resume Management Actions

### 1. Upload Resume

**When to use**: First time uploading a resume or uploading a new version

**Steps**:
1. Click the **Upload Resume** area (or "Replace Resume" if already uploaded)
2. Select a PDF, DOC, or DOCX file (maximum 10MB)
3. File automatically saves and displays in the Current Resume section
4. Version number automatically increments

**Supported Formats**:
- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Maximum file size: 10MB

### 2. Replace Resume

**When to use**: When you want to update your resume with a new version

**Steps**:
1. Click the **Replace Resume** button (appears after first upload)
2. Select a new resume file
3. Previous version is automatically replaced
4. Version number increments automatically
5. All metadata updates instantly

**Note**: Uploading a new file automatically replaces the current one. The old file is completely removed.

### 3. Delete Resume

**When to use**: To remove a custom resume and return to the default

**Steps**:
1. Click the **Delete Custom Resume** button (red button)
2. Confirm the action
3. Custom resume is removed from storage
4. Status returns to "Default"
5. Version number resets

**Note**: This action cannot be undone. However, you can upload the resume again if needed.

### 4. View Resume

**When to use**: To preview your resume in a new browser tab

**Steps**:
1. Click the **View Resume** button (blue button, appears when custom resume exists)
2. Resume opens in a new browser tab
3. You can read, print, or save the preview

**Features**:
- Opens in a new tab
- Preserves original formatting
- Can be printed from the preview
- Can be saved from the preview using browser save function

### 5. Download Resume

**When to use**: To save a copy of your resume to your computer

**Steps**:
1. Click the **Download** button (blue button, appears when custom resume exists)
2. Browser automatically downloads the file
3. File is saved with the original filename
4. Default location: Your Downloads folder

**Note**: This is useful for sharing the resume with recruiters or keeping backups.

### 6. Preview Resume

**When to use**: To review your resume before sharing with recruiters

**Method**:
1. Click the **View Resume** button
2. Preview opens in new tab
3. Review content, formatting, and layout
4. Verify all information is correct
5. Close tab when done

## Data Persistence

All resume information is automatically saved to your browser's localStorage:

- **Resume Content**: Stored as base64 encoded data
- **Metadata**: File name, upload date, size, version, and status
- **Automatic Persistence**: Changes save instantly
- **Cross-Device**: Data stored locally on each device
- **Browser Storage**: Stored in browser storage (not in cloud)

## Metadata Information

### File Name
- Original filename of the uploaded resume
- Example: `Nitish_Chunduru_SAP_MM_Resume.pdf`
- Preserved when downloading

### Upload Date
- Date file was uploaded (YYYY-MM-DD format)
- Example: `2026-05-29`
- Updates when new file is uploaded

### File Size
- Size of the resume file in MB
- Example: `2.4 MB`
- Updates when file is replaced

### Resume Version
- Automatically incremented counter
- Example: `v1`, `v2`, `v3`
- Starts at 1 when first file uploaded
- Increments by 1 with each replacement
- Resets to 0 if custom resume is deleted

### Resume Status
- **Active (Custom)**: Currently has a custom resume uploaded
- **Default**: Using the default resume specified in the configuration
- Shows with visual indicator (✓ for active, ○ for default)

## Configuration

### Central Resume URL Variable

The default resume is configured with a central variable in the code:

```javascript
const resumeUrl = "/Nitish_Chunduru_SAP_MM_Resume.pdf"
```

- This is the default resume file path
- Falls back to this if no custom resume is uploaded
- No need to change code to update resume - use Admin Panel instead

## Best Practices

1. **Keep Updates Organized**: Upload new versions after significant updates
2. **Use Clear Naming**: Keep filename clear and professional
3. **Regular Backups**: Download copies periodically
4. **Version Control**: Let the system auto-track versions
5. **Fresh Downloads**: Always use the latest uploaded version
6. **Check Before Upload**: Verify file before uploading
7. **Browser Consistency**: Use same browser for consistency (each browser has separate storage)

## Troubleshooting

### Resume Not Showing After Refresh

**Solution**: 
- Check if admin mode is ON
- Clear browser cache and reload
- Verify localStorage is enabled in browser

### File Not Uploading

**Possible Causes**:
- File exceeds 10MB limit - compress or split into smaller file
- Wrong file format - ensure using PDF, DOC, or DOCX
- Browser localStorage full - delete some data or use different browser
- File corrupted - try uploading different file

### Version Not Incrementing

**Solution**:
- Refresh page to see updated version
- Check that admin mode is ON
- Verify notification appears after upload

### Cannot Delete Resume

**Solution**:
- Ensure admin mode is ON
- Delete button only appears when custom resume exists
- Try refreshing page first

### Changes Not Persisting

**Solutions**:
- Verify admin mode is ON during changes
- Check that browser allows localStorage
- Clear browser cache
- Try different browser
- Check browser storage quota

## Browser Compatibility

Resume Management works on all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Chrome
- Mobile Safari
- Mobile Firefox

## Storage Capacity

- Browser localStorage limit: 5-10MB per domain
- Typical resume size: 0.5-5MB
- Stored locally on your computer
- Not shared across devices
- Not backed up to cloud

## Privacy & Security

- All data stored locally in browser
- No data sent to external servers
- No cloud storage or backups
- Resume only accessible from this browser/device
- Data can be cleared by clearing browser data

## Tips for Success

1. Upload PDF format for best compatibility
2. Keep resume under 3MB for optimal performance
3. Use descriptive filename
4. Download backup copies regularly
5. Update version when making significant changes
6. Check preview before sending to recruiters
7. Use View Resume for final verification

---

**Last Updated**: May 29, 2026

For questions or issues, please refer to FINAL_DEPLOYMENT_GUIDE.md

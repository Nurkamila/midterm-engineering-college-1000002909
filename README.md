# Engineering College Website

A responsive, accessible, and modern brochure-style website for Engineering College built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

## 🎯 Project Overview

This project creates a comprehensive digital presence for Engineering College with six main pages:
- **Home** - Hero section with call-to-action and key features
- **Programs** - Overview of engineering programs with card layout
- **Admissions** - Application process and tuition information
- **Student Life** - Campus news, clubs, and events
- **Contact** - Contact information and basic contact form
- **Registration** - Advanced student registration form

## ✨ Features Implemented

### Core Requirements
- ✅ 6 distinct HTML pages with consistent navigation
- ✅ Fully responsive design (mobile-first)
- ✅ Fixed top navigation bar with active states
- ✅ Semantic HTML5 structure
- ✅ Bootstrap 5 components and utilities
- ✅ WCAG 2.1 accessibility compliance

### Forms
- **Registration Form (Advanced)**
    - Full client-side validation with inline feedback
    - Password strength validation and confirmation
    - Progress indicator
    - Terms agreement with modal details
    - Success state with confirmation message

- **Contact Form (Basic)**
    - Required field validation
    - Anti-spam measures (honeypot + timestamp)
    - Success/error messaging

### JavaScript Interactivity
1. **News Filter System** - Filter campus news by category
2. **Club Information Modals** - Detailed club information in modal windows
3. **Form Progress Indicator** - Visual progress tracking for registration
4. **Real-time Form Validation** - Immediate field validation feedback

### Accessibility Features
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast support
- Screen reader compatible

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **Bootstrap 5** - Responsive framework
- **Vanilla JavaScript (ES6+)** - Client-side functionality
- **GitHub Pages** - Deployment platform

## 🚀 Live Deployment

**Live URL:** [https://yourusername.github.io/engineering-college](https://yourusername.github.io/engineering-college)

### How to Navigate the Site
1. Start at the Home page for an overview
2. Explore Programs to see available engineering degrees
3. Check Admissions for application process and costs
4. Visit Student Life for campus activities
5. Use Contact for inquiries
6. Complete Registration to apply

## 📁 Project Structure
engineering-college/
├── index.html
├── about.html
├── admissions.html
├── student-life.html
├── contact.html
├── registration.html
├── css/
│ └── style.css
├── js/
│ └── script.js
├── assets/
│ └── images/
└── README.md

## 🎨 Design System

- **Colors**: Professional blue theme with accessible contrast
- **Typography**: Clear hierarchy with responsive scaling
- **Spacing**: Consistent 8px baseline grid
- **Components**: Reusable card and section patterns

## 🔧 Known Limitations

1. **Static Content** - All content is hardcoded (as required)
2. **No Backend** - Forms simulate submission (no actual data storage
# About Page Data Configuration

This directory contains the centralized data configuration system for the about page.

## Overview

The data configuration system provides a structured, maintainable, and extensible way to manage all content for the about page. It includes data validation, utility functions, and a centralized data manager.

## Files Structure

```
src/data/
├── about-data.js          # Main data configuration file
├── README.md              # This documentation file

src/lib/
├── about-data-manager.js  # Centralized data access interface
├── data-validation.js     # Data validation utilities
├── data-utils.js          # Data transformation utilities
└── test-data-config.js    # Testing utilities
```

## Data Structure

### Personal Information
```javascript
{
  name: "IMWIND",
  title: "全栈开发工程师 | 技术博主",
  bio: {
    primary: "Primary bio text",
    secondary: "Secondary bio text"
  },
  avatar: {
    src: "/iwb.png",
    alt: "Profile Avatar",
    fallbackInitials: "IW"
  },
  location: "中国",
  timezone: "Asia/Shanghai"
}
```

### Skills
```javascript
{
  id: "frontend",
  title: "前端开发",
  skills: [
    {
      name: "React",
      level: 90,
      color: "from-blue-400 to-blue-600",
      category: "framework"
    }
  ]
}
```

### Experience
```javascript
{
  id: "unique-id",
  company: "Company Name",
  position: "Position Title",
  duration: "2022年3月 - 至今",
  startDate: "2022-03",
  endDate: null, // null for current position
  description: "Job description",
  responsibilities: ["Responsibility 1", "Responsibility 2"],
  technologies: ["React", "Node.js"],
  type: "full-time",
  location: "Remote"
}
```

### Projects
```javascript
{
  id: "project-id",
  title: "Project Title",
  description: "Project description",
  technologies: ["React", "Next.js"],
  links: {
    github: "https://github.com/...",
    demo: "https://demo.com"
  },
  image: "/projects/preview.svg",
  featured: true,
  status: "active", // active, completed, in-progress
  category: "web-development",
  startDate: "2023-01",
  endDate: null
}
```

### Contacts
```javascript
{
  id: "email",
  type: "email",
  label: "邮箱",
  value: "contact@example.com",
  url: "mailto:contact@example.com",
  icon: Mail, // Lucide React icon
  color: "from-red-500 to-pink-500",
  hoverColor: "hover:from-red-600 hover:to-pink-600",
  primary: true,
  public: true
}
```

## Usage

### Basic Usage

```javascript
import aboutDataManager from '../lib/about-data-manager.js';

// Get personal information
const personalInfo = aboutDataManager.getPersonalInfo();

// Get skills data
const skillsData = aboutDataManager.getSkillsData();

// Get experience data
const experienceData = aboutDataManager.getExperienceData();

// Get projects data
const projectsData = aboutDataManager.getProjectsData();

// Get contact data
const contactData = aboutDataManager.getContactData();
```

### Advanced Usage

```javascript
// Get filtered projects
const featuredProjects = aboutDataManager.getFeaturedProjects();
const activeProjects = aboutDataManager.getActiveProjects();

// Search functionality
const reactProjects = aboutDataManager.searchProjects('React');
const frontendSkills = aboutDataManager.searchSkills('frontend');

// Get statistics
const stats = aboutDataManager.getStatistics();

// Get page metadata for SEO
const metadata = aboutDataManager.getPageMetadata();
```

### Component Integration

```javascript
// In a React component
import aboutDataManager from '../lib/about-data-manager.js';

export default function HeroSection() {
  const { personalInfo } = aboutDataManager.getHeroData();
  
  return (
    <div>
      <h1>{personalInfo.name}</h1>
      <p>{personalInfo.title}</p>
      <p>{personalInfo.bio.primary}</p>
    </div>
  );
}
```

## Data Validation

The system includes comprehensive data validation:

```javascript
import aboutDataManager from '../lib/about-data-manager.js';

// Validate all data
const validation = aboutDataManager.validate();
console.log(validation.isValid); // true/false
console.log(validation.errors); // Array of validation errors

// Check if data is valid
const isValid = aboutDataManager.isValid();
```

## Customization

### Adding New Skills

```javascript
// In about-data.js, add to skillCategories
{
  id: "new-category",
  title: "New Category",
  skills: [
    {
      name: "New Skill",
      level: 85,
      color: "from-purple-400 to-purple-600",
      category: "new-type"
    }
  ]
}
```

### Adding New Projects

```javascript
// In about-data.js, add to projects array
{
  id: "new-project",
  title: "New Project",
  description: "Project description",
  technologies: ["Technology1", "Technology2"],
  links: {
    github: "https://github.com/...",
    demo: "https://demo.com"
  },
  image: "/projects/new-project.svg",
  featured: false,
  status: "completed",
  category: "web-development",
  startDate: "2024-01",
  endDate: "2024-06"
}
```

### Adding New Experience

```javascript
// In about-data.js, add to experiences array
{
  id: "new-experience",
  company: "New Company",
  position: "New Position",
  duration: "2024年1月 - 2024年6月",
  startDate: "2024-01",
  endDate: "2024-06",
  description: "Job description",
  responsibilities: ["Task 1", "Task 2"],
  technologies: ["Tech1", "Tech2"],
  type: "full-time",
  location: "Location"
}
```

## Best Practices

1. **Data Consistency**: Always use the same format for dates (YYYY-MM)
2. **Validation**: Run validation after making changes to ensure data integrity
3. **IDs**: Use unique, descriptive IDs for all items
4. **Images**: Store project images in `/public/projects/` directory
5. **Technologies**: Use consistent naming for technologies across all sections
6. **Colors**: Use Tailwind CSS gradient classes for consistent styling

## Troubleshooting

### Common Issues

1. **Build Errors**: Check data validation for syntax errors
2. **Missing Images**: Ensure all image paths exist in the public directory
3. **Invalid URLs**: Validate all external links
4. **Date Formats**: Use YYYY-MM format for all dates

### Debugging

```javascript
// Get debug information
const debugInfo = aboutDataManager.debugInfo();
console.log(debugInfo);
```

## Future Enhancements

- Add support for multiple languages
- Implement data caching for better performance
- Add support for dynamic data loading from CMS
- Implement data versioning and migration system
- Add support for rich text content in descriptions
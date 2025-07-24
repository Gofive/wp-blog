/**
 * Data Utility Functions
 * Provides helper functions for filtering, sorting, and transforming about page data
 */

// Date utilities
export function parseDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString + '-01'); // Add day for YYYY-MM format
}

export function formatDuration(startDate, endDate = null) {
  const start = parseDate(startDate);
  const end = endDate ? parseDate(endDate) : new Date();

  if (!start) return '';

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}个月`;
  } else if (remainingMonths === 0) {
    return `${years}年`;
  } else {
    return `${years}年${remainingMonths}个月`;
  }
}

export function isCurrentPosition(experience) {
  return experience.endDate === null;
}

// Experience utilities
export function sortExperiencesByDate(experiences) {
  return [...experiences].sort((a, b) => {
    const aDate = parseDate(a.startDate);
    const bDate = parseDate(b.startDate);
    return bDate - aDate; // Most recent first
  });
}

export function getCurrentExperience(experiences) {
  return experiences.find(exp => isCurrentPosition(exp));
}

export function getPastExperiences(experiences) {
  return experiences.filter(exp => !isCurrentPosition(exp));
}

export function getExperiencesByType(experiences, type) {
  return experiences.filter(exp => exp.type === type);
}

export function getTotalExperienceYears(experiences) {
  let totalMonths = 0;

  experiences.forEach(exp => {
    const start = parseDate(exp.startDate);
    const end = exp.endDate ? parseDate(exp.endDate) : new Date();

    if (start && end) {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += months;
    }
  });

  return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
}

// Project utilities
export function sortProjectsByDate(projects) {
  return [...projects].sort((a, b) => {
    const aDate = parseDate(a.startDate);
    const bDate = parseDate(b.startDate);
    return bDate - aDate; // Most recent first
  });
}

export function getFeaturedProjects(projects) {
  return projects.filter(project => project.featured);
}

export function getProjectsByCategory(projects, category) {
  return projects.filter(project => project.category === category);
}

export function getProjectsByStatus(projects, status) {
  return projects.filter(project => project.status === status);
}

export function getActiveProjects(projects) {
  return getProjectsByStatus(projects, 'active');
}

export function getCompletedProjects(projects) {
  return getProjectsByStatus(projects, 'completed');
}

export function getProjectsByTechnology(projects, technology) {
  return projects.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

// Skill utilities
export function getSkillsByCategory(skillCategories, categoryId) {
  const category = skillCategories.find(cat => cat.id === categoryId);
  return category ? category.skills : [];
}

export function getAllSkills(skillCategories) {
  return skillCategories.flatMap(category => category.skills);
}

export function getSkillsByLevel(skillCategories, minLevel = 0, maxLevel = 100) {
  return getAllSkills(skillCategories).filter(skill =>
    skill.level >= minLevel && skill.level <= maxLevel
  );
}

export function getTopSkills(skillCategories, count = 5) {
  return getAllSkills(skillCategories)
    .sort((a, b) => b.level - a.level)
    .slice(0, count);
}

export function getSkillsByType(skillCategories, type) {
  return getAllSkills(skillCategories).filter(skill => skill.category === type);
}

export function getAverageSkillLevel(skillCategories) {
  const allSkills = getAllSkills(skillCategories);
  if (allSkills.length === 0) return 0;

  const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(totalLevel / allSkills.length);
}

// Contact utilities
export function getPrimaryContacts(contacts) {
  return contacts.filter(contact => contact.primary);
}

export function getPublicContacts(contacts) {
  return contacts.filter(contact => contact.public);
}

export function getContactByType(contacts, type) {
  return contacts.find(contact => contact.type === type);
}

export function getSocialContacts(contacts) {
  const socialTypes = ['github', 'linkedin', 'twitter', 'website'];
  return contacts.filter(contact => socialTypes.includes(contact.type));
}

// Search and filter utilities
export function searchProjects(projects, query) {
  const lowercaseQuery = query.toLowerCase();

  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery)) ||
    project.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function searchSkills(skillCategories, query) {
  const lowercaseQuery = query.toLowerCase();

  return getAllSkills(skillCategories).filter(skill =>
    skill.name.toLowerCase().includes(lowercaseQuery) ||
    skill.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function searchExperiences(experiences, query) {
  const lowercaseQuery = query.toLowerCase();

  return experiences.filter(exp =>
    exp.company.toLowerCase().includes(lowercaseQuery) ||
    exp.position.toLowerCase().includes(lowercaseQuery) ||
    exp.description.toLowerCase().includes(lowercaseQuery) ||
    exp.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
}

// Statistics utilities
export function getDataStatistics(data) {
  const totalExperienceYears = getTotalExperienceYears(data.experiences);
  const totalProjects = data.projects.length;
  const featuredProjects = getFeaturedProjects(data.projects).length;
  const activeProjects = getActiveProjects(data.projects).length;
  const totalSkills = getAllSkills(data.skillCategories).length;
  const averageSkillLevel = getAverageSkillLevel(data.skillCategories);
  const topSkills = getTopSkills(data.skillCategories, 3);

  return {
    experience: {
      totalYears: totalExperienceYears,
      currentPosition: getCurrentExperience(data.experiences)?.position || 'N/A',
      totalPositions: data.experiences.length
    },
    projects: {
      total: totalProjects,
      featured: featuredProjects,
      active: activeProjects,
      completed: getCompletedProjects(data.projects).length
    },
    skills: {
      total: totalSkills,
      averageLevel: averageSkillLevel,
      categories: data.skillCategories.length,
      topSkills: topSkills.map(skill => ({ name: skill.name, level: skill.level }))
    },
    contacts: {
      total: data.contacts.length,
      primary: getPrimaryContacts(data.contacts).length,
      social: getSocialContacts(data.contacts).length
    }
  };
}

// Data transformation utilities
export function transformProjectsForDisplay(projects, options = {}) {
  let result = [...projects];

  // Apply filters
  if (options.featured !== undefined) {
    result = result.filter(project => project.featured === options.featured);
  }

  if (options.status) {
    result = getProjectsByStatus(result, options.status);
  }

  if (options.category) {
    result = getProjectsByCategory(result, options.category);
  }

  if (options.technology) {
    result = getProjectsByTechnology(result, options.technology);
  }

  // Apply sorting
  if (options.sortBy === 'date') {
    result = sortProjectsByDate(result);
  } else if (options.sortBy === 'title') {
    result = result.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Apply limit
  if (options.limit && options.limit > 0) {
    result = result.slice(0, options.limit);
  }

  return result;
}

export function transformSkillsForDisplay(skillCategories, options = {}) {
  let result = [...skillCategories];

  // Apply filters to skills within categories
  if (options.minLevel !== undefined) {
    result = result.map(category => ({
      ...category,
      skills: category.skills.filter(skill => skill.level >= options.minLevel)
    })).filter(category => category.skills.length > 0);
  }

  if (options.skillType) {
    result = result.map(category => ({
      ...category,
      skills: category.skills.filter(skill => skill.category === options.skillType)
    })).filter(category => category.skills.length > 0);
  }

  // Sort skills within categories
  if (options.sortSkillsBy === 'level') {
    result = result.map(category => ({
      ...category,
      skills: [...category.skills].sort((a, b) => b.level - a.level)
    }));
  } else if (options.sortSkillsBy === 'name') {
    result = result.map(category => ({
      ...category,
      skills: [...category.skills].sort((a, b) => a.name.localeCompare(b.name))
    }));
  }

  return result;
}

// Export all utilities
export default {
  // Date utilities
  parseDate,
  formatDuration,
  isCurrentPosition,

  // Experience utilities
  sortExperiencesByDate,
  getCurrentExperience,
  getPastExperiences,
  getExperiencesByType,
  getTotalExperienceYears,

  // Project utilities
  sortProjectsByDate,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectsByStatus,
  getActiveProjects,
  getCompletedProjects,
  getProjectsByTechnology,

  // Skill utilities
  getSkillsByCategory,
  getAllSkills,
  getSkillsByLevel,
  getTopSkills,
  getSkillsByType,
  getAverageSkillLevel,

  // Contact utilities
  getPrimaryContacts,
  getPublicContacts,
  getContactByType,
  getSocialContacts,

  // Search utilities
  searchProjects,
  searchSkills,
  searchExperiences,

  // Statistics utilities
  getDataStatistics,

  // Transformation utilities
  transformProjectsForDisplay,
  transformSkillsForDisplay
};
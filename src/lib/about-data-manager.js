/**
 * About Data Manager
 * Centralized interface for accessing and managing about page data
 */

import aboutData from '../data/about-data.js';
import { validateAboutData, getValidationSummary } from './data-validation.js';
import dataUtils from './data-utils.js';

class AboutDataManager {
  constructor(data = aboutData) {
    this.data = data;
    this.validationCache = null;
    this.lastValidationTime = null;
  }

  // Data validation methods
  validate() {
    const now = Date.now();

    // Cache validation results for 5 minutes
    if (this.validationCache && this.lastValidationTime && (now - this.lastValidationTime) < 300000) {
      return this.validationCache;
    }

    this.validationCache = getValidationSummary(this.data);
    this.lastValidationTime = now;

    return this.validationCache;
  }

  isValid() {
    return this.validate().isValid;
  }

  getValidationErrors() {
    return this.validate().errors;
  }

  // Personal information methods
  getPersonalInfo() {
    return this.data.personalInfo;
  }

  getName() {
    return this.data.personalInfo.name;
  }

  getTitle() {
    return this.data.personalInfo.title;
  }

  getBio() {
    return this.data.personalInfo.bio;
  }

  getAvatar() {
    return this.data.personalInfo.avatar;
  }

  // Skills methods
  getSkillCategories() {
    return this.data.skillCategories;
  }

  getSkillsByCategory(categoryId) {
    return dataUtils.getSkillsByCategory(this.data.skillCategories, categoryId);
  }

  getAllSkills() {
    return dataUtils.getAllSkills(this.data.skillCategories);
  }

  getTopSkills(count = 5) {
    return dataUtils.getTopSkills(this.data.skillCategories, count);
  }

  getSkillsByLevel(minLevel = 0, maxLevel = 100) {
    return dataUtils.getSkillsByLevel(this.data.skillCategories, minLevel, maxLevel);
  }

  getAverageSkillLevel() {
    return dataUtils.getAverageSkillLevel(this.data.skillCategories);
  }

  searchSkills(query) {
    return dataUtils.searchSkills(this.data.skillCategories, query);
  }

  // Experience methods
  getExperiences() {
    return dataUtils.sortExperiencesByDate(this.data.experiences);
  }

  getCurrentExperience() {
    return dataUtils.getCurrentExperience(this.data.experiences);
  }

  getPastExperiences() {
    return dataUtils.getPastExperiences(this.data.experiences);
  }

  getExperiencesByType(type) {
    return dataUtils.getExperiencesByType(this.data.experiences, type);
  }

  getTotalExperienceYears() {
    return dataUtils.getTotalExperienceYears(this.data.experiences);
  }

  searchExperiences(query) {
    return dataUtils.searchExperiences(this.data.experiences, query);
  }

  // Project methods
  getProjects(options = {}) {
    return dataUtils.transformProjectsForDisplay(this.data.projects, options);
  }

  getAllProjects() {
    return dataUtils.sortProjectsByDate(this.data.projects);
  }

  getFeaturedProjects() {
    return dataUtils.getFeaturedProjects(this.data.projects);
  }

  getProjectsByCategory(category) {
    return dataUtils.getProjectsByCategory(this.data.projects, category);
  }

  getProjectsByStatus(status) {
    return dataUtils.getProjectsByStatus(this.data.projects, status);
  }

  getActiveProjects() {
    return dataUtils.getActiveProjects(this.data.projects);
  }

  getCompletedProjects() {
    return dataUtils.getCompletedProjects(this.data.projects);
  }

  getProjectsByTechnology(technology) {
    return dataUtils.getProjectsByTechnology(this.data.projects, technology);
  }

  searchProjects(query) {
    return dataUtils.searchProjects(this.data.projects, query);
  }

  // Contact methods
  getContacts() {
    return this.data.contacts;
  }

  getPrimaryContacts() {
    return dataUtils.getPrimaryContacts(this.data.contacts);
  }

  getPublicContacts() {
    return dataUtils.getPublicContacts(this.data.contacts);
  }

  getSocialContacts() {
    return dataUtils.getSocialContacts(this.data.contacts);
  }

  getContactByType(type) {
    return dataUtils.getContactByType(this.data.contacts, type);
  }

  // Site configuration methods
  getSiteConfig() {
    return this.data.siteConfig;
  }

  getSiteName() {
    return this.data.siteConfig.name;
  }

  getSiteTitle() {
    return this.data.siteConfig.title;
  }

  getSiteDescription() {
    return this.data.siteConfig.description;
  }

  getSiteUrl() {
    return this.data.siteConfig.url;
  }

  // Statistics methods
  getStatistics() {
    return dataUtils.getDataStatistics(this.data);
  }

  // Utility methods for components
  getHeroData() {
    return {
      personalInfo: this.getPersonalInfo(),
      siteConfig: this.getSiteConfig()
    };
  }

  getSkillsData(options = {}) {
    return {
      categories: dataUtils.transformSkillsForDisplay(this.data.skillCategories, options),
      statistics: {
        total: this.getAllSkills().length,
        average: this.getAverageSkillLevel(),
        top: this.getTopSkills(3)
      }
    };
  }

  getExperienceData() {
    return {
      experiences: this.getExperiences(),
      current: this.getCurrentExperience(),
      totalYears: this.getTotalExperienceYears(),
      statistics: {
        total: this.data.experiences.length,
        current: this.getCurrentExperience() ? 1 : 0,
        past: this.getPastExperiences().length
      }
    };
  }

  getProjectsData(options = {}) {
    const allProjects = this.getAllProjects();
    const featured = this.getFeaturedProjects();
    const filtered = this.getProjects(options);

    return {
      all: allProjects,
      featured: featured,
      filtered: filtered,
      statistics: {
        total: allProjects.length,
        featured: featured.length,
        active: this.getActiveProjects().length,
        completed: this.getCompletedProjects().length
      }
    };
  }

  getContactData() {
    return {
      all: this.getContacts(),
      primary: this.getPrimaryContacts(),
      public: this.getPublicContacts(),
      social: this.getSocialContacts()
    };
  }

  // SEO and metadata methods
  getPageMetadata() {
    const personalInfo = this.getPersonalInfo();
    const siteConfig = this.getSiteConfig();

    return {
      title: `About - ${siteConfig.name}`,
      description: personalInfo.bio.primary,
      openGraph: {
        title: `About ${personalInfo.name}`,
        description: personalInfo.bio.primary,
        url: `${siteConfig.url}/about`,
        type: 'profile',
        profile: {
          firstName: personalInfo.name.split(' ')[0] || personalInfo.name,
          lastName: personalInfo.name.split(' ').slice(1).join(' ') || '',
          username: siteConfig.author.name
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: `About ${personalInfo.name}`,
        description: personalInfo.bio.primary,
        creator: siteConfig.social.twitter ? siteConfig.social.twitter.replace('https://twitter.com/', '@') : undefined
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        description: personalInfo.bio.primary,
        url: siteConfig.url,
        sameAs: this.getSocialContacts().map(contact => contact.url).filter(url => url !== '#'),
        knowsAbout: this.getTopSkills(10).map(skill => skill.name),
        worksFor: this.getCurrentExperience()?.company || undefined
      }
    };
  }

  // Debug and development methods
  debugInfo() {
    const validation = this.validate();
    const stats = this.getStatistics();

    return {
      validation,
      statistics: stats,
      dataStructure: {
        personalInfo: !!this.data.personalInfo,
        skillCategories: this.data.skillCategories?.length || 0,
        experiences: this.data.experiences?.length || 0,
        projects: this.data.projects?.length || 0,
        contacts: this.data.contacts?.length || 0,
        siteConfig: !!this.data.siteConfig
      },
      lastValidation: this.lastValidationTime ? new Date(this.lastValidationTime).toISOString() : null
    };
  }

  // Data update methods (for future extensibility)
  updatePersonalInfo(newInfo) {
    this.data.personalInfo = { ...this.data.personalInfo, ...newInfo };
    this.clearValidationCache();
  }

  addSkill(categoryId, skill) {
    const category = this.data.skillCategories.find(cat => cat.id === categoryId);
    if (category) {
      category.skills.push(skill);
      this.clearValidationCache();
    }
  }

  addExperience(experience) {
    this.data.experiences.push(experience);
    this.clearValidationCache();
  }

  addProject(project) {
    this.data.projects.push(project);
    this.clearValidationCache();
  }

  addContact(contact) {
    this.data.contacts.push(contact);
    this.clearValidationCache();
  }

  clearValidationCache() {
    this.validationCache = null;
    this.lastValidationTime = null;
  }
}

// Create and export singleton instance
const aboutDataManager = new AboutDataManager();

export default aboutDataManager;
export { AboutDataManager };
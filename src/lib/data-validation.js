/**
 * Data Validation Utilities
 * Provides validation functions for about page data structures
 */

// Validation error class
export class ValidationError extends Error {
  constructor(message, field, value) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

// Helper validation functions
const isString = (value) => typeof value === 'string' && value.trim().length > 0;
const isNumber = (value) => typeof value === 'number' && !isNaN(value);
const isArray = (value) => Array.isArray(value);
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isDateString = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

// Personal Information Validation
export function validatePersonalInfo(data) {
  const errors = [];

  if (!isString(data?.name)) {
    errors.push(new ValidationError('Name must be a non-empty string', 'name', data?.name));
  }

  if (!isString(data?.title)) {
    errors.push(new ValidationError('Title must be a non-empty string', 'title', data?.title));
  }

  if (!isObject(data?.bio)) {
    errors.push(new ValidationError('Bio must be an object', 'bio', data?.bio));
  } else {
    if (!isString(data.bio.primary)) {
      errors.push(new ValidationError('Bio primary must be a non-empty string', 'bio.primary', data.bio.primary));
    }
    if (!isString(data.bio.secondary)) {
      errors.push(new ValidationError('Bio secondary must be a non-empty string', 'bio.secondary', data.bio.secondary));
    }
  }

  if (!isObject(data?.avatar)) {
    errors.push(new ValidationError('Avatar must be an object', 'avatar', data?.avatar));
  } else {
    if (!isString(data.avatar.src)) {
      errors.push(new ValidationError('Avatar src must be a non-empty string', 'avatar.src', data.avatar.src));
    }
    if (!isString(data.avatar.alt)) {
      errors.push(new ValidationError('Avatar alt must be a non-empty string', 'avatar.alt', data.avatar.alt));
    }
    if (!isString(data.avatar.fallbackInitials)) {
      errors.push(new ValidationError('Avatar fallbackInitials must be a non-empty string', 'avatar.fallbackInitials', data.avatar.fallbackInitials));
    }
  }

  return errors;
}

// Skill Validation
export function validateSkill(skill, index = 0) {
  const errors = [];
  const prefix = `skill[${index}]`;

  if (!isString(skill?.name)) {
    errors.push(new ValidationError('Skill name must be a non-empty string', `${prefix}.name`, skill?.name));
  }

  if (!isNumber(skill?.level) || skill.level < 0 || skill.level > 100) {
    errors.push(new ValidationError('Skill level must be a number between 0 and 100', `${prefix}.level`, skill?.level));
  }

  if (!isString(skill?.color)) {
    errors.push(new ValidationError('Skill color must be a non-empty string', `${prefix}.color`, skill?.color));
  }

  if (!isString(skill?.category)) {
    errors.push(new ValidationError('Skill category must be a non-empty string', `${prefix}.category`, skill?.category));
  }

  return errors;
}

// Skill Category Validation
export function validateSkillCategory(category, index = 0) {
  const errors = [];
  const prefix = `skillCategory[${index}]`;

  if (!isString(category?.id)) {
    errors.push(new ValidationError('Skill category id must be a non-empty string', `${prefix}.id`, category?.id));
  }

  if (!isString(category?.title)) {
    errors.push(new ValidationError('Skill category title must be a non-empty string', `${prefix}.title`, category?.title));
  }

  if (!isArray(category?.skills)) {
    errors.push(new ValidationError('Skill category skills must be an array', `${prefix}.skills`, category?.skills));
  } else {
    category.skills.forEach((skill, skillIndex) => {
      const skillErrors = validateSkill(skill, skillIndex);
      errors.push(...skillErrors.map(error => ({
        ...error,
        field: `${prefix}.skills.${error.field}`
      })));
    });
  }

  return errors;
}

// Experience Validation
export function validateExperience(experience, index = 0) {
  const errors = [];
  const prefix = `experience[${index}]`;

  if (!isString(experience?.id)) {
    errors.push(new ValidationError('Experience id must be a non-empty string', `${prefix}.id`, experience?.id));
  }

  if (!isString(experience?.company)) {
    errors.push(new ValidationError('Experience company must be a non-empty string', `${prefix}.company`, experience?.company));
  }

  if (!isString(experience?.position)) {
    errors.push(new ValidationError('Experience position must be a non-empty string', `${prefix}.position`, experience?.position));
  }

  if (!isString(experience?.duration)) {
    errors.push(new ValidationError('Experience duration must be a non-empty string', `${prefix}.duration`, experience?.duration));
  }

  if (!isString(experience?.startDate)) {
    errors.push(new ValidationError('Experience startDate must be a non-empty string', `${prefix}.startDate`, experience?.startDate));
  }

  if (experience?.endDate !== null && !isString(experience?.endDate)) {
    errors.push(new ValidationError('Experience endDate must be a string or null', `${prefix}.endDate`, experience?.endDate));
  }

  if (!isString(experience?.description)) {
    errors.push(new ValidationError('Experience description must be a non-empty string', `${prefix}.description`, experience?.description));
  }

  if (!isArray(experience?.responsibilities)) {
    errors.push(new ValidationError('Experience responsibilities must be an array', `${prefix}.responsibilities`, experience?.responsibilities));
  } else {
    experience.responsibilities.forEach((responsibility, respIndex) => {
      if (!isString(responsibility)) {
        errors.push(new ValidationError(`Experience responsibility[${respIndex}] must be a non-empty string`, `${prefix}.responsibilities[${respIndex}]`, responsibility));
      }
    });
  }

  if (!isArray(experience?.technologies)) {
    errors.push(new ValidationError('Experience technologies must be an array', `${prefix}.technologies`, experience?.technologies));
  } else {
    experience.technologies.forEach((tech, techIndex) => {
      if (!isString(tech)) {
        errors.push(new ValidationError(`Experience technology[${techIndex}] must be a non-empty string`, `${prefix}.technologies[${techIndex}]`, tech));
      }
    });
  }

  if (!isString(experience?.type)) {
    errors.push(new ValidationError('Experience type must be a non-empty string', `${prefix}.type`, experience?.type));
  }

  return errors;
}

// Project Validation
export function validateProject(project, index = 0) {
  const errors = [];
  const prefix = `project[${index}]`;

  if (!isString(project?.id)) {
    errors.push(new ValidationError('Project id must be a non-empty string', `${prefix}.id`, project?.id));
  }

  if (!isString(project?.title)) {
    errors.push(new ValidationError('Project title must be a non-empty string', `${prefix}.title`, project?.title));
  }

  if (!isString(project?.description)) {
    errors.push(new ValidationError('Project description must be a non-empty string', `${prefix}.description`, project?.description));
  }

  if (!isArray(project?.technologies)) {
    errors.push(new ValidationError('Project technologies must be an array', `${prefix}.technologies`, project?.technologies));
  } else {
    project.technologies.forEach((tech, techIndex) => {
      if (!isString(tech)) {
        errors.push(new ValidationError(`Project technology[${techIndex}] must be a non-empty string`, `${prefix}.technologies[${techIndex}]`, tech));
      }
    });
  }

  if (!isObject(project?.links)) {
    errors.push(new ValidationError('Project links must be an object', `${prefix}.links`, project?.links));
  } else {
    Object.entries(project.links).forEach(([key, url]) => {
      if (url && !isUrl(url)) {
        errors.push(new ValidationError(`Project link ${key} must be a valid URL`, `${prefix}.links.${key}`, url));
      }
    });
  }

  if (typeof project?.featured !== 'boolean') {
    errors.push(new ValidationError('Project featured must be a boolean', `${prefix}.featured`, project?.featured));
  }

  if (!isString(project?.status)) {
    errors.push(new ValidationError('Project status must be a non-empty string', `${prefix}.status`, project?.status));
  }

  if (!isString(project?.category)) {
    errors.push(new ValidationError('Project category must be a non-empty string', `${prefix}.category`, project?.category));
  }

  return errors;
}

// Contact Validation
export function validateContact(contact, index = 0) {
  const errors = [];
  const prefix = `contact[${index}]`;

  if (!isString(contact?.id)) {
    errors.push(new ValidationError('Contact id must be a non-empty string', `${prefix}.id`, contact?.id));
  }

  if (!isString(contact?.type)) {
    errors.push(new ValidationError('Contact type must be a non-empty string', `${prefix}.type`, contact?.type));
  }

  if (!isString(contact?.label)) {
    errors.push(new ValidationError('Contact label must be a non-empty string', `${prefix}.label`, contact?.label));
  }

  if (!isString(contact?.value)) {
    errors.push(new ValidationError('Contact value must be a non-empty string', `${prefix}.value`, contact?.value));
  }

  if (!isString(contact?.url)) {
    errors.push(new ValidationError('Contact url must be a non-empty string', `${prefix}.url`, contact?.url));
  }

  // Validate email format for email contacts
  if (contact?.type === 'email' && !isEmail(contact.value)) {
    errors.push(new ValidationError('Email contact must have valid email format', `${prefix}.value`, contact?.value));
  }

  // Validate URL format for non-email, non-wechat contacts
  if (contact?.type !== 'email' && contact?.type !== 'wechat' && contact?.url !== '#' && !isUrl(contact.url)) {
    errors.push(new ValidationError('Contact url must be a valid URL', `${prefix}.url`, contact?.url));
  }

  if (typeof contact?.primary !== 'boolean') {
    errors.push(new ValidationError('Contact primary must be a boolean', `${prefix}.primary`, contact?.primary));
  }

  if (typeof contact?.public !== 'boolean') {
    errors.push(new ValidationError('Contact public must be a boolean', `${prefix}.public`, contact?.public));
  }

  return errors;
}

// Main validation function for all about data
export function validateAboutData(data) {
  const errors = [];

  // Validate personal info
  if (data.personalInfo) {
    errors.push(...validatePersonalInfo(data.personalInfo));
  } else {
    errors.push(new ValidationError('Personal info is required', 'personalInfo', data.personalInfo));
  }

  // Validate skill categories
  if (isArray(data.skillCategories)) {
    data.skillCategories.forEach((category, index) => {
      errors.push(...validateSkillCategory(category, index));
    });
  } else {
    errors.push(new ValidationError('Skill categories must be an array', 'skillCategories', data.skillCategories));
  }

  // Validate experiences
  if (isArray(data.experiences)) {
    data.experiences.forEach((experience, index) => {
      errors.push(...validateExperience(experience, index));
    });
  } else {
    errors.push(new ValidationError('Experiences must be an array', 'experiences', data.experiences));
  }

  // Validate projects
  if (isArray(data.projects)) {
    data.projects.forEach((project, index) => {
      errors.push(...validateProject(project, index));
    });
  } else {
    errors.push(new ValidationError('Projects must be an array', 'projects', data.projects));
  }

  // Validate contacts
  if (isArray(data.contacts)) {
    data.contacts.forEach((contact, index) => {
      errors.push(...validateContact(contact, index));
    });
  } else {
    errors.push(new ValidationError('Contacts must be an array', 'contacts', data.contacts));
  }

  return errors;
}

// Utility function to check if data is valid
export function isValidAboutData(data) {
  const errors = validateAboutData(data);
  return errors.length === 0;
}

// Utility function to get validation summary
export function getValidationSummary(data) {
  const errors = validateAboutData(data);

  return {
    isValid: errors.length === 0,
    errorCount: errors.length,
    errors: errors.map(error => ({
      field: error.field,
      message: error.message,
      value: error.value
    })),
    summary: errors.length === 0
      ? 'All data is valid'
      : `Found ${errors.length} validation error${errors.length === 1 ? '' : 's'}`
  };
}

export default {
  validateAboutData,
  validatePersonalInfo,
  validateSkillCategory,
  validateExperience,
  validateProject,
  validateContact,
  isValidAboutData,
  getValidationSummary,
  ValidationError
};
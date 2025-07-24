#!/usr/bin/env node

/**
 * Simple data validation script
 */

import aboutDataManager from './src/lib/about-data-manager.js';

console.log('🧪 Validating About Page Data Configuration...\n');

try {
  // Test data validation
  const validation = aboutDataManager.validate();
  console.log('📋 Data Validation:');
  console.log(`✅ Valid: ${validation.isValid}`);
  console.log(`📊 Error Count: ${validation.errorCount}`);

  if (!validation.isValid) {
    console.log('❌ Validation Errors:');
    validation.errors.slice(0, 5).forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.field}: ${error.message}`);
    });
    if (validation.errors.length > 5) {
      console.log(`  ... and ${validation.errors.length - 5} more errors`);
    }
  }
  console.log('');

  // Test basic data access
  console.log('👤 Personal Information:');
  const personalInfo = aboutDataManager.getPersonalInfo();
  console.log(`Name: ${personalInfo.name}`);
  console.log(`Title: ${personalInfo.title}`);
  console.log('');

  // Test skills
  console.log('🛠️ Skills Summary:');
  const skillsData = aboutDataManager.getSkillsData();
  console.log(`Total Skills: ${skillsData.statistics.total}`);
  console.log(`Categories: ${skillsData.categories.length}`);
  console.log('');

  // Test experience
  console.log('💼 Experience Summary:');
  const experienceData = aboutDataManager.getExperienceData();
  console.log(`Total Experience: ${experienceData.totalYears} years`);
  console.log(`Total Positions: ${experienceData.statistics.total}`);
  console.log('');

  // Test projects
  console.log('🚀 Projects Summary:');
  const projectsData = aboutDataManager.getProjectsData();
  console.log(`Total Projects: ${projectsData.statistics.total}`);
  console.log(`Featured Projects: ${projectsData.statistics.featured}`);
  console.log('');

  // Test contacts
  console.log('📞 Contact Summary:');
  const contactData = aboutDataManager.getContactData();
  console.log(`Total Contacts: ${contactData.all.length}`);
  console.log(`Primary Contacts: ${contactData.primary.length}`);
  console.log('');

  console.log('✅ Data configuration validation completed!');
  console.log(`Overall Status: ${validation.isValid ? 'PASSED' : 'FAILED'}`);

  process.exit(validation.isValid ? 0 : 1);

} catch (error) {
  console.error('❌ Validation failed with error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
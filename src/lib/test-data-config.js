/**
 * Test Data Configuration
 * Simple test script to validate the about page data configuration
 */

import aboutDataManager from './about-data-manager.js';

// Test function to validate and display data information
export function testDataConfiguration() {
  console.log('🧪 Testing About Page Data Configuration...\n');

  // Test data validation
  console.log('📋 Data Validation:');
  const validation = aboutDataManager.validate();
  console.log(`✅ Valid: ${validation.isValid}`);
  console.log(`📊 Error Count: ${validation.errorCount}`);

  if (!validation.isValid) {
    console.log('❌ Validation Errors:');
    validation.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.field}: ${error.message}`);
    });
  }
  console.log('');

  // Test personal information
  console.log('👤 Personal Information:');
  const personalInfo = aboutDataManager.getPersonalInfo();
  console.log(`Name: ${personalInfo.name}`);
  console.log(`Title: ${personalInfo.title}`);
  console.log(`Bio: ${personalInfo.bio.primary.substring(0, 50)}...`);
  console.log('');

  // Test skills
  console.log('🛠️ Skills Summary:');
  const skillsData = aboutDataManager.getSkillsData();
  console.log(`Total Skills: ${skillsData.statistics.total}`);
  console.log(`Average Level: ${skillsData.statistics.average}%`);
  console.log(`Categories: ${skillsData.categories.length}`);
  console.log('Top Skills:');
  skillsData.statistics.top.forEach((skill, index) => {
    console.log(`  ${index + 1}. ${skill.name} (${skill.level}%)`);
  });
  console.log('');

  // Test experience
  console.log('💼 Experience Summary:');
  const experienceData = aboutDataManager.getExperienceData();
  console.log(`Total Experience: ${experienceData.totalYears} years`);
  console.log(`Total Positions: ${experienceData.statistics.total}`);
  console.log(`Current Position: ${experienceData.current?.position || 'None'}`);
  console.log('');

  // Test projects
  console.log('🚀 Projects Summary:');
  const projectsData = aboutDataManager.getProjectsData();
  console.log(`Total Projects: ${projectsData.statistics.total}`);
  console.log(`Featured Projects: ${projectsData.statistics.featured}`);
  console.log(`Active Projects: ${projectsData.statistics.active}`);
  console.log(`Completed Projects: ${projectsData.statistics.completed}`);
  console.log('');

  // Test contacts
  console.log('📞 Contact Summary:');
  const contactData = aboutDataManager.getContactData();
  console.log(`Total Contacts: ${contactData.all.length}`);
  console.log(`Primary Contacts: ${contactData.primary.length}`);
  console.log(`Social Contacts: ${contactData.social.length}`);
  console.log('');

  // Test statistics
  console.log('📈 Overall Statistics:');
  const stats = aboutDataManager.getStatistics();
  console.log('Experience:', stats.experience);
  console.log('Projects:', stats.projects);
  console.log('Skills:', stats.skills);
  console.log('Contacts:', stats.contacts);
  console.log('');

  // Test search functionality
  console.log('🔍 Search Tests:');
  const reactProjects = aboutDataManager.searchProjects('React');
  console.log(`Projects with "React": ${reactProjects.length}`);

  const frontendSkills = aboutDataManager.searchSkills('React');
  console.log(`Skills with "React": ${frontendSkills.length}`);
  console.log('');

  // Test metadata generation
  console.log('🏷️ Page Metadata:');
  const metadata = aboutDataManager.getPageMetadata();
  console.log(`Title: ${metadata.title}`);
  console.log(`Description: ${metadata.description.substring(0, 50)}...`);
  console.log(`OpenGraph Title: ${metadata.openGraph.title}`);
  console.log('');

  // Test debug information
  console.log('🐛 Debug Information:');
  const debugInfo = aboutDataManager.debugInfo();
  console.log('Data Structure:', debugInfo.dataStructure);
  console.log(`Last Validation: ${debugInfo.lastValidation || 'Never'}`);
  console.log('');

  console.log('✅ Data configuration test completed!');

  return {
    isValid: validation.isValid,
    summary: {
      validation,
      personalInfo,
      skills: skillsData.statistics,
      experience: experienceData.statistics,
      projects: projectsData.statistics,
      contacts: contactData.all.length,
      metadata
    }
  };
}

// Test specific data queries
export function testDataQueries() {
  console.log('🔎 Testing Data Queries...\n');

  // Test skill filtering
  console.log('Skills with level > 85:');
  const highLevelSkills = aboutDataManager.getSkillsByLevel(85, 100);
  highLevelSkills.forEach(skill => {
    console.log(`  ${skill.name}: ${skill.level}%`);
  });
  console.log('');

  // Test project filtering
  console.log('Featured Projects:');
  const featuredProjects = aboutDataManager.getFeaturedProjects();
  featuredProjects.forEach(project => {
    console.log(`  ${project.title} (${project.status})`);
  });
  console.log('');

  // Test active projects
  console.log('Active Projects:');
  const activeProjects = aboutDataManager.getActiveProjects();
  activeProjects.forEach(project => {
    console.log(`  ${project.title} - ${project.technologies.join(', ')}`);
  });
  console.log('');

  // Test contact filtering
  console.log('Primary Contacts:');
  const primaryContacts = aboutDataManager.getPrimaryContacts();
  primaryContacts.forEach(contact => {
    console.log(`  ${contact.label}: ${contact.value}`);
  });
  console.log('');

  console.log('✅ Data queries test completed!');
}

// Export test functions for use in development
export default {
  testDataConfiguration,
  testDataQueries
};

// Auto-run tests if this file is executed directly
if (typeof window === 'undefined' && import.meta.url === `file://${process.argv[1]}`) {
  testDataConfiguration();
  testDataQueries();
}
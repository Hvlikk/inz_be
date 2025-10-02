module.exports = {
  types: [
    { value: 'feat', name: 'feat:         A new feature' },
    { value: 'fix', name: 'fix:          A bug fix' },
    { value: 'improvement', name: 'improvement:  An improvement to existing functionality' },
    { value: 'docs', name: 'docs:         Documentation changes' },
    { value: 'style', name: 'style:        Code style changes (formatting, etc)' },
    { value: 'refactor', name: 'refactor:     Code refactoring without adding a feature or fixing a bug' },
    { value: 'perf', name: 'perf:         Performance improvements' },
    { value: 'test', name: 'test:         Adding or updating tests' },
    { value: 'build', name: 'build:        Changes to build system or dependencies' },
    { value: 'ci', name: 'ci:           Changes to CI configuration files or scripts' },
    { value: 'chore', name: 'chore:        Other changes that do not modify src or test files' },
    { value: 'revert', name: 'revert:       Revert a previous commit' }
  ],

  // pojedynczy scope
  scopes: ['global', 'misc', 'database', 'backend', 'api', 'tests', 'ci'],

  allowCustomScopes: true,

  messages: {
    type: "Select the type of change that you're committing:",
    scope: "Select the scope of this change:",
    customScope: "Enter custom scope (optional):",
    subject: "Write a short description of the change:\n",
    body: "Provide a longer description of the change (optional):\n",
    breaking: "Are there any breaking changes?\n",
    footer: "List any related issues (e.g., JIRA ticket):\n",
    confirmCommit: "Do you want to proceed with the commit?"
  }
};
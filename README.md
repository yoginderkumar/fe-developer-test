# Mable Frontend Developer - Technical Challenge

This repository contains a technical challenge for Frontend Developer candidates at Mable, working with the Hound Component Library.

## Challenge Overview

In this challenge, you'll be working with a snapshot of Mable's design system, Hound. The tasks involve refactoring existing components, ensuring code quality, and demonstrating your ability to integrate components into a larger application context.

## Prerequisites

- Node.js and npm/yarn/pnpm installed on your machine
- Git for version control
- Basic understanding of TypeScript, React, and design systems
- Familiarity with Storybook

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Mable-AI/fe-developer-test
   cd fe-developer-test
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a new branch with the following naming convention:
   ```bash
   git checkout -b feat-fe-developer-submission-<your_name>-<date_of_submission>
   ```

4. Start Storybook to view and test components:
   ```bash
   npm run storybook
   # or
   yarn storybook
   # or
   pnpm run storybook
   ```

## Tasks

### 1. Refactor the Input Component

- Improve the Input component, focusing on:
  - Code quality and organization
  - Readability
  - Thorough logic handling (no breaking edge cases)
  - Consistent visual behavior

- Update the `Input.stories.tsx` file to cover all possible edge cases and scenarios

### 2. Identify and Refactor Additional Components

- Review all components in the repository
- Select **2 components** that need refactoring
- Apply the same quality principles as in Task 1:
  - Code quality
  - Readability
  - Logic handling
  - Visual consistency

### 3. Choose ONE of the Following Tasks

#### Option A: Build a Floating Chatbot Widget
- Create a toggleable chatbot UI
- Integrate it fully into the design system
- Provide stories and documentation

#### Option B: Build a Remix Application
- Create a basic Remix application
- Implement Zustand for state management
- Integrate at least one component from the design system
- Demonstrate end-to-end data loading flow and state lifecycle
  (You may use dummy API data, local data, etc.)

### 4. [OPTIONAL] Improve the Build System

- Analyze the current component bundling mechanism
- Answer the following questions:
  - Is there a better way to bundle components?
  - What alternative bundlers could be used?
  - Why would you choose one approach over another?
- Refactor the export mechanism using your proposed strategy

## Submission Guidelines

1. Complete the tasks in your feature branch
2. Push your branch to the repository
3. Create a Pull Request to the `main` branch
4. Ensure your PR includes:
   - Well-commented code
   - Documentation for any new components or significant changes
   - Any notes about your approach or assumptions made

## Evaluation Criteria

Your submission will be evaluated based on:
- Quality of code
- Clarity of communication and documentation
- Simplicity of thought
- Creativity of solutions

## Important Notes

- **Deadline**: EOD (6:00 p.m IST) on April 7th, 2025 (Monday)
- Any changes made to the PR after the submission deadline will lead to disqualification
- For questions or clarifications, please contact Gaurav Rajeev (gauravrajeev@mable.ai)

---

# About The Hound Component Library

The Hound Component Library provides a collection of reusable UI components for your projects.

## 📦 Installation

To install the Hound component library in your own projects, follow these steps:

1. Create a `.npmrc` file in your project root with the following content:

   ```txt
   /npm.pkg.github.com/:_authToken=<auth-toke>
   @Mable-AI:registry=https://npm.pkg.github.com
   ```

   Replace `<auth-token>` with your [Github Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

2. Install the package using:

   ```bash
   pnpm i @Mable-AI/hound
   ```

## 🎨 CSS Usage

The Hound Component Library uses Tailwind CSS. To ensure proper styling, you need to configure your tailwind.config.js file. Here's how:

1. Import the Hound preset in your tailwind.config.js:

```js
/** @type {import('tailwindcss').Config} */
import houndPreset from '@Mable-AI/hound/lib/tailwind.config.js';

export default {
  presets: [houndPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './node_modules/@Mable-AI/hound/**/*.{js,jsx,ts,tsx}',
  ],
  // ... other configurations
}
```

This configuration does two important things:

- It imports and uses the Hound preset, which includes all the necessary Tailwind configurations for the library components.
- It includes the Hound library files in the content array, ensuring that Tailwind processes the styles used in the library components.

## 🏷️ Package Versions

### We publish three different categories of packages:

- **Testing Candidate (TC) 🧪** - Represents the develop environment
  > Example: @mable-ai/hound@0.1.3-tc.1721648918
- **Release Candidate (RC) 🚀** - Represents the integration environment
  > Example: @mable-ai/hound@0.1.3-rc.1721648918
- **Production Release ✨** - Represents the stable production version
  > Example: @mable-ai/hound@0.1.3

## 🤝 Contributing

### Here's how you can get started:

1. Clone the repository
2. Install packages
3. Run Storybook
   ```bash
   pnpm run storybook
   ```

### 🧱 Add New Components

1. Navigate to `src/component`
2. Add your component in the appropriate folder:
   - Atom
   - Molecules
   - Loaders
   - Or create a new folder if needed

If you've created a new folder, update the `./generate-index.sh` file:

Add the following line:

```bash
process_directory "<Folder-Name>"
```

Push your changes to GitHub

### Use in Development

1. Edit the path of the Mable Dashboard local repository in restart_dev_server.sh
2. In the Mable Dashboard repository, add the Hound repository path as the version for the @Mable-AI/hound dependency
   - e.g - '@Mable-AI/hound' : 'file:{INSERT_FILE_PATH_TO_HOUND_DIR}' 
3. Use the following command in the hound directory to start the dev server 
   - reflex -r '\.tsx$' -R '^components/index\.tsx$' -s sh restart_dev_server.sh -v

## 🔄 Seamless Releases

#### Our CI/CD pipeline automatically:

- Generates an updated index file for new components
- Triggers a new release when PRs are merged to develop, int, or master
- Publishes a fresh package version

Good luck with the challenge!
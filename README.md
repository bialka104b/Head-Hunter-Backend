<div align="center" id="top">
  <img src="./.github/app.gif" alt="Head Hunter Backend" />

  &#xa0;

  <!-- <a href="https://headhunterbackend.netlify.app">Demo</a> -->
</div>

<h1 align="center">Head Hunter Backend</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/bialka104b/head-hunter-backend?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/bialka104b/head-hunter-backend?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/bialka104b/head-hunter-backend?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/bialka104b/head-hunter-backend?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/bialka104b/head-hunter-backend?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/bialka104b/head-hunter-backend?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/bialka104b/head-hunter-backend?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center">
	🚧  Head Hunter Backend 🚀 Under construction...  🚧
</h4>

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0;
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/bialka104b" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

This is a group project at the end of MegaK course. This backend allows to searching and hire students who ended a course. Project was made for 100% by students of MegaK.

## :sparkles: Features ##

:heavy_check_mark: Feature 1;\
:heavy_check_mark: Feature 2;\
:heavy_check_mark: Feature 3;

## :rocket: Technologies ##

The following tools were used in this project:

- [Expo](https://expo.io/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PassportJS](https://www.passportjs.org/)
- [Papaparse](https://www.papaparse.com/)
- [Nodemailer](https://nodemailer.com/about/)
- multer
- mysql2

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

Complete file config/config.ts

```bash
# Clone this project
$ git clone https://github.com/bialka104b/head-hunter-backend

# Access
$ cd head-hunter-backend

# Install dependencies
$ npm install

# Create database with random data
$ npm db:build

# Run the project
$ npm start:dev

# The server will initialize in the <http://localhost:3001>
```

## Structure of Database

![tekst alternatywny](images/db/tabele.PNG)
![tekst alternatywny](images/db/hr_profile.PNG)
![tekst alternatywny](images/db/interviews.PNG)
![tekst alternatywny](images/db/trainee_profiles.PNG)
![tekst alternatywny](images/db/trainee_score.PNG)
![tekst alternatywny](images/db/users.PNG)

## API Request
 - Login by admin
   ![tekst alternatywny](images/loginAdmin.PNG)
 - Login by Hr
   ![tekst alternatywny](images/loginHR.PNG)
 - Login by student
   ![tekst alternatywny](images/loginTrainee.PNG)
 - List of students
   ![tekst alternatywny](images/traineeList.PNG)
 - List of Hr
   ![tekst alternatywny](images/hrList.PNG)
 - Import trainee from CSV file
   ![tekst alternatywny](images/importTraineeFromCsvFile.PNG)
 - Add Hr
   ![tekst alternatywny](images/addHR.PNG)
 - bad CSV file
   ![tekst alternatywny](images/badCsvFile.PNG)
 - Add interview
   ![tekst alternatywny](images/addInterview.PNG)
 - Delete Interview
   ![tekst alternatywny](images/deleteInterview.PNG)
 - Change password
   ![tekst alternatywny](images/changePassword.PNG)
 - Student profile
   ![tekst alternatywny](images/traineeProfile.PNG)
 - Update student profile
   ![tekst alternatywny](images/updateTraineeProfile.PNG)

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/bialka104b" target="_blank">bialka104b</a>

&#xa0;

<a href="#top">Back to top</a>

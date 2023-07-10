<p align="center">
<img  width="550px"src="https://kiranbansode-votesub--testing-g9jafog5.web.app/assets/logo.votesub.darker.1ea0de26.svg" alt="VoteSub Logo">
</p>

<p align="center">
<img width="275px" src="https://kiranbansode-votesub--testing-g9jafog5.web.app/assets/caption.votesub.cbb508d7.svg" alt="VoteSub Logo">
</p>

# Hi... Welcome to VoteSub's GitHub Repository

## So, What is VoteSub?

VoteSub is a webapp(SPA) where users can create new subjects and add respective candidates or/and vote to their favorite candidates of particular subject, all in realtime.

## Yes! the project is LIVE 🔴

### `Preview Channel` (Testing Ver.)

Click on the following link to visit Preview Channel(Testing Ver.) of VoteSub project <br/>

https://kiranbansode-votesub--testing-g9jafog5.web.app/

> Disclaimer: The `Preview Channel` contain some code or functionality which you will might or might not find on GitHub's `testing` branch. Once underlying code reach it's maturity level, I will slowly `push` it to `testing` branch.

### `Live Channel` (Production Ver.)

Soon you will have access to Live Channel(Production Ver.) of VoteSub project since project is near completion.

## Want to test it locally ?

Just follow the below instructions step by step to test VoteSub locally.

### Clone the project to your local machine

1. Open any terminal to your desired location.
2. Type `git clone https://github.com/kiranbansode/votesub.git` in your terminal. Make sure you already installed `git` on your machine.
3. You can also use `GitHub CLI`. To use it, make sure you first install it and give necessary permissions. Then type `gh repo clone kiranbansode/votesub`

### Installing necessary dependencies

To install project related dependencies you first need to understand it's folder structure. This project can be divided into 2 parts. Frontend and the Backend or more specifically Firebase's Cloud Functions.

When you open to project's folder by default you will be in the Frontend section. Just open terminal in project's root directory
and follow the below instructions.

1. Use `yarn` or `yarn install` or `npm install` to install all required dependencies.
2. Once all dependencies are installed, type `yarn dev` or `npm run dev` command to start development server. You can also use `--host` flag like `yarn dev --host` or `npn run dev --host` to run project on locally connected devices on your network like mobile phones.
3. Once you start the development server you can view VoteSub webapp at `localhost:3000`.

Now you need to install dependencies for Backend or Firebase's Cloud Functions. To install required dependencies you first need to go to `functions` folder. So follow to below instructions.

1. Open terminal in project's root directory.
2. Type `cd functions`, to go to functions folder.
3. Use `npm install` to install necessary dependencies. `🛑 DON'T use yarn 🛑` here.
4. To run backend related code, first you need to compile them. REMEMBER! that project is built using `TypeScript`.
5. To compile to code you need to use `npm run build`. After it successfully compiles you will find related code in `lib` folder.
6. You can also `npm run build:watch` command to compile the code as you make any changes to codebase.

Once all required dependencies are installed and Cloud Functions code is compiled you need to setup Firebase Emulators to use Authentication, Cloud Functions, Firestore Database and many more. To start the Firebase Emulators follow the below instructions.

1. Open terminal inside project's root repository.
2. To run Firebase Emulators, we need to install `firebase-tools` package. To install it use `npm i firebase-tools`. Optionally you can also install `firebase-tools` globally. To install it globally use `npm install -g firebase-tools` command.
3. To run Firebase Emulators, use `firebase emulators:start --export-on-exit=./emulators_data/ --import=./emulators_data` command. Lets understand what this command exactly do.

    1. `emulators:start` - It will start Firebase Emulators on `http://127.0.0.1:4000/`
    2. `--export-on-exist=./emulators_data/` - When you exist the Firebase Emulators, it will save all stored data at `./emulators_data` folder.
    3. `--import=./emulators_data` - When you start the Firebase Emulators in future, it will import all previously saved data from `./emulators_data`.

If you get the error like ` Directory "/home/kiranbansode/votesub/emulators_data" does not exist.` Don't worry! Just create a folder name `emulators_data` inside project's root directory

Now the project is ready to use.

## How to use the VoteSub ?

## VoteSub project's resources

Click on the following links to visit respective resources of VoteSub like Web Designs, wireframes, Trello and many more

1. Wireframes - Draw.io (Download and Import to Diagrams.net)
2. Web Designs - [Figma](https://www.figma.com/file/ibh6SGKzcY9jgaTqusZy7b/VoteSub?node-id=0%3A1&t=ORjBKFnRpITWmJ6e-1)
3. Software Development Lifecycle(SDLC) Progress - [Trello](https://trello.com/b/dPmDCweY)

## Goals behind building VoteSub project

1. to show my students the power of Computer technologies(yes, I was a Teacher)
2. create a webapp where my students can vote their favorite teacher or school subject(original idea for VoteSub) depending on weekly performance or teaching styles of teachers
3. want to impress my future employers or HR by showing my development skills

## Feature of VoteSub

1. give votes to favorite candidates of particular subject from vote bank
2. register according user type. (different user will have a slightly different registration form )
3. create new subjects and candidates for other users to vote
4. view realtime votes
5. view voting history on daily basis separated by each subject and number of total votes given to a particular candidate
6. view information using Profile page
7. remaining votes counter(realtime)

## Future of VoteSub

1. Admin Panel where subject owner can do CRUD operations
2. Settings Page where users can change appearance of VoteSub
3. Entire backend will be re-written using Node.js, Express, MongoDB or PostgreSQL and will be hosted on Bare metal servers

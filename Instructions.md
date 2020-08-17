# GETTING STARTED

- **DO NOT PERMANENTLY DELETE THE PREINSTALL LINE IN PACKAGE.JSON**
- Anytime you need to run a yarn operation like `install` or `add`, **TEMPORARILY** delete the preinstall line, add anything you need from yarn, then **paste the preinstall line back exactly how it was**. We need this line for production purposes.
- Run `yarn install`
- Get **sheets_key.json** and **.env** from the Discord or inside the Drive **(HYO/Engineering/Tachyon/Creds and env)** and copy them into the root folder
- **Make sure the .env has the DOT at the beginning, sometimes downloading it from Drive messes with the filename**
- Run `nodemon app.js` to start the frontend server

**Make sure the server is running on port 8080 by querying it and getting back 'hello world'**

- Don't worry about restarting the server everytime you make a change, when you save your changes, **nodemon** takes care of this for you!

- To get eslint linting on your files, you must open the project through VSCode

# Structure

- `app.js` has the actual server and endpoints
- The `models` folder contains the models, for now we just have one called `student.js` which is the model for **any user**

# Contribution Guide

1. Fork this repo!
2. Make changes locally, but make sure you're staying **updated with the master** (see https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork if you're not sure how)
    - Sync before you start working! If you forget, make sure to `git stash`, follow the above steps, then `git stash apply`. This may cause merge conflicts you'll have to fix before pushing!
3. Make a PR and assign someone to review
4. Get your code approved and merged!
5. If your code needs some patching up, fix the issue and update the PR
6. If you have questions, suggestions, or want to discuss something, **create an issue**

```
+---api
|   .dockerignore
|   .gitignore
|   Dockerfile
|   index.js
|   package-lock.json
|   package.json
|   README.md
|   
├───controllers
│   │   auth.controller.js
│   │   problem.controller.js
│   │   user.controller.js
│   │
│   ├───Compiler
│   │       compiler.controller.js
│   │       executeCpp.js
│   │       executeJava.js
│   │       executePython.js
│   │       generateFile.js
│
├───DB
│   │   db.js
│
├───models
│   │   ProblemPage.model.js
│   │   user.model.js
│
├───routes
│   │   auth.route.js
│   │   compiler.route.js
│   │   problem.route.js
│   │   user.route.js
│
├───utils
│   │   error.js
│   │   verifyUser.js
│
└───client
    │   .dockerignore
    │   .eslintrc.cjs
    │   .gitignore
    │   index.html
    │   package-lock.json
    │   package.json
    │   postcss.config.js
    │   README.md
    │   tailwind.config.js
    │   vite.config.js
    │
    ├───src
    │   │   App.jsx
    │   │   firebase.js
    │   │   index.css
    │   │   main.jsx
    │
    ├───components
    │   │   AdminRoute.jsx
    │   │   OAuth.jsx
    │   │   PrivateRoute.jsx
    │
    ├───Header
    │   │   Header.jsx
    │
    ├───Logout
    │   │   Logout.jsx
    │
    ├───ProblemsTable
    │   │   ProblemsTable.jsx
    │
    ├───Timer
    │   │   timer.jsx
    │
    ├───pages
    │   │   About.jsx
    │   │   Home.jsx
    │   │   Profile.jsx
    │   │   SignIn.jsx
    │   │   SignUp.jsx
    │
    ├───Admin
    │   │   AdminPage.jsx
    │   │   CreateProblem.jsx
    │   │   SideNav.jsx
    │   │   UpdateProblem.jsx
    │
    ├───ProblemPage
    │   │   ProblemDescription.jsx
    │   │   WorkSpace.jsx
    │
    └───PlayGround
        │   FooterValidator.jsx
        │   PlayGround.jsx
        │   PrefNav.jsx
        │
    └───redux
        │   store.js
        │
        └───user
            │   userSlice.js
```

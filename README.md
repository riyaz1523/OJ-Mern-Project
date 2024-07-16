```
+---api
ª   ª   .dockerignore
ª   ª   .gitignore
ª   ª   Dockerfile
ª   ª   index.js
ª   ª   package-lock.json
ª   ª   package.json
ª   ª   README.md
ª   ª   
ª   +---controllers
ª   ª   ª   auth.controller.js
ª   ª   ª   problem.controller.js
ª   ª   ª   user.controller.js
ª   ª   ª   
ª   ª   +---Compiler
ª   ª           compiler.controller.js
ª   ª           executeCpp.js
ª   ª           executeJava.js
ª   ª           executePython.js
ª   ª           generateFile.js
ª   ª           
ª   +---DB
ª   ª       db.js
ª   ª       
ª   +---models
ª   ª       ProblemPage.model.js
ª   ª       user.model.js
ª   ª       
ª   +---routes
ª   ª       auth.route.js
ª   ª       compiler.route.js
ª   ª       problem.route.js
ª   ª       user.route.js
ª   ª       
ª   +---utils
ª           error.js
ª           verifyUser.js
ª           
+---client
    ª   .dockerignore
    ª   .eslintrc.cjs
    ª   .gitignore
    ª   index.html
    ª   package-lock.json
    ª   package.json
    ª   postcss.config.js
    ª   README.md
    ª   tailwind.config.js
    ª   vite.config.js
    ª   
    +---src
        ª   App.jsx
        ª   firebase.js
        ª   index.css
        ª   main.jsx
        ª   
        +---components
        ª   ª   AdminRoute.jsx
        ª   ª   OAuth.jsx
        ª   ª   PrivateRoute.jsx
        ª   ª   
        ª   +---Header
        ª   ª       Header.jsx
        ª   ª       
        ª   +---Logout
        ª   ª       Logout.jsx
        ª   ª       
        ª   +---ProblemsTable
        ª   ª       ProblemsTable.jsx
        ª   ª       
        ª   +---Timer
        ª           timer.jsx
        ª           
        +---pages
        ª   ª   About.jsx
        ª   ª   Home.jsx
        ª   ª   Profile.jsx
        ª   ª   SignIn.jsx
        ª   ª   SignUp.jsx
        ª   ª   
        ª   +---Admin
        ª   ª       AdminPage.jsx
        ª   ª       CreateProblem.jsx
        ª   ª       SideNav.jsx
        ª   ª       UpdateProblem.jsx
        ª   ª       
        ª   +---ProblemPage
        ª       ª   ProblemDescription.jsx
        ª       ª   WorkSpace.jsx
        ª       ª   
        ª       +---PlayGround
        ª               FooterValidator.jsx
        ª               PlayGround.jsx
        ª               PrefNav.jsx
        ª               
        +---redux
            ª   store.js
            ª   
            +---user
                    userSlice.js
                    
```

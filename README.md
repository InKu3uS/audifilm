# Angular Audifilm Test

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## 🎯 Objective

Build a frontend app that can:
- List recipes.
- See the detail of the recipe.
- Create, update and delete recipes.
- Search and filter (among all recipes) recipes by name, category or difficulty.

## Delivery

- You can use whichever provider to share the project (Github, Gitlab or Bitbucket).
- The project must be public.
- Use standard gitflow rules with conventional commits.
- Provide the necesary and clear instructions to build and execute the app.
- Please, use English while typing code.

## Company requirements (70% of the score):

- They want your ability of the creativity to make the new app design, so feel free to use whatever design for the app.
- They lack on UI & UX experience, so apply whatever you need to make the app as responsive as possible. Also try to make the app as intuitive as possible.
- Use an external library of components.
- Use whatever you need to change representation of the duration (We want to use hours and minutes) when we visualize the data (Only when whe retrieve the data and present it to the user).
- If possible, reuse your own components and structure your code as clean and tidy as you can.

## Extra points (30% of the score):

- Implement i18n for EN, ES, and DE (Only interface) with a component to switch between them.
  - Also, if the browser is in German I want the page to load in German (apply this to ES as well).
  - If my browser language is not one of them (or EN), fallback to EN.
  - Thie behavior will continue until I choose a different language, from that moment the page will load with my selected language.
- Manage the app state with some state management library.
- Do not make any CSS by hand, instead use an external CSS library. 

## 🗃 Dataset

Follow this structure in order to deal with the recipes:

```ts
interface Recipe {
  id: number;
  name: string;
  category: string; // (Or union type, that's up to you)
  ingredients: string[];
  steps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in minutes
}
```



## 🌐 Json-server
A backend server with a database was simulated using json-server.

To run json-server, navigate to the prueba-audifilm directory and execute the command
```bash
npm run server
```

## 👨‍💻 Angular
To start a local development server, go to prueba-audifilm directory and run:

```bash
npm start
```



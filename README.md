# Take Home for Charles Nguyen for Spindle

I have set up a mock server to simulate a proper front end fetching the data.

```
json-server --watch data.json --port 3030
```
To run the front-end simply run this command.
```
yarn dev
```

## Loom link

Here is a link to the loom video explaining how to set it up and how the application works.

https://www.loom.com/share/d9757c896af84440a4abb8087ad4b439?sid=ecdcbf8a-5b24-4654-9f23-9dfe1fab8df1

## Notable Features

I have tried to make the drag and drop features to be as seamless as possible. I wasn't sure if the output data should also be drag and drop, and opted to make them checkboxes as that makes more sense to me.

The table seems to morph well and doesn't seem to be too depenedent on the order of actions.

## Next Steps

I think in the interests of time I have a number of things I'd like to add to this application.

1) I would have liked to have included row level totals for each row category.

2) With the totals would have been a color coded comparison between numbers and how much of the totals they represent.

3) There are a few edge case bugs that I haven't figured out in rerendering the table. I think some of the data gets jumbled up when adding more than 2 column elements. Further research would have to be made on why and how that happens.

4) There are some real performance issues which would show up quickly if we were to scale up to a larger dataset.

5) Obviously, unit tests, and more consistancy in labeling types through the app would be necessary in the real world, but I have tried to include as much as I could to show a good understanding of typed languages.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

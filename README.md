## Synopsis

What is this? This is an example project using ReactJS and Redux to create an Instagram-like application. Users can login using this credentials for a demo:

`Username: test`
`Password: test` 

This project does not require you to install third-party API, such as REST API, to get it working. Instead, it uses <a href="https://github.com/jvilk/BrowserFS">BrowserFS</a> to store the data from local JSON file.
All the changes, such as creating comments, adding likes, etc., have been made in the application will be kept only in <b>local environment</b> (What do you expect from BrowserFS :D)

Make sure to install packages in NPM using `npm install` and directly point your browser to `http://localhost:8080`


## API Reference

<ul>
    <li>
        BrowserFS - for implementing NodeJS file system in ReactJS environment: https://github.com/jvilk/BrowserFS
    </li>
    <li>
        React-Router - for declarative routing: https://github.com/ReactTraining/react-router
    </li>
    <li>
        React-Router-Redux - for declarative routing with Redux store: https://github.com/reactjs/react-router-redux
    </li>
    <li>
        Superagent - for accessing API without any CORS problem: https://visionmedia.github.io/superagent/
    </li>
    <li>
        Superagent Auth Bearer - for embedding bearer authentication to Superagent: https://www.npmjs.com/package/superagent-auth-bearer
    </li>
    <li>
        React-Cookie - for saving users credentials using browsers' cookies: https://github.com/thereactivestack/react-cookie
    </li>
      <li>
        ESLint and ESLint-React - JS linting for React: http://eslint.org/ and https://www.npmjs.com/package/eslint-plugin-react
    </li>
</ul>

## Contributors

Please let me know by email or Lync if there is any issue to this example codes. Have fun exploring React and Redux! :)


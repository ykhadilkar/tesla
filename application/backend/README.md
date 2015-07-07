#Tesla Backend

Backend part is built using https://github.com/hapijs/hapi and uses https://github.com/hapijs/lab for running tests.

## Installation
- Run `npm install`
- Setup elasticsearch database using steps listed at [/infrastructure/textdb/README.md](/infrastructure/textdb/README.md)

## Build & development

- Run `npm start` or `node server.js` to start backend server
- Open [http://localhost:3000/](http://localhost:3000/) in your browser

## Testing

 `npm test` will run the unit tests with hapijs/lab.

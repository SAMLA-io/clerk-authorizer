# Clerk API Gateway Lambda Authorizer

This is a simple node.js function that authorizes JWT Tokens.  API Gateway requests using a Clerk session token. It is intendeded to be run in AWS Lambda, and you can test it locally using the `test.js` file.

## Usage

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file and set the `CLERK_SECRET_KEY` and `CLERK_TEST_TOKEN` environment variables:

```bash
CLERK_SECRET_KEY=your_secret_key
CLERK_TEST_TOKEN=your_test_token
```

3. Test the function locally:

```bash
npm test
```

4. And upload it to AWS Lambda by zipping up the `index.js`, `package.json` and the `node_modules` folder and uploading it to AWS Lambda.

```bash
zip -r function.zip . -x .gitignore .env test.js
```

5. Create a new Lambda function in AWS Lambda and upload the zip file.

6. Create a new API Gateway and add a new authorizer method, select the Lambda function you just created.

7. Add the Authorizer Source to your API Gateway method.

## Contributors

- [@jpgtzg](https://github.com/jpgtzg)

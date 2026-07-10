A script that fetches and decodes email addresses of all the current Members of European Parliament (MEPs).

Pre-requisites:

You need [Node.js](https://nodejs.org/en/download) installed.

Usage:
```
npx tsx main.ts
```

It will fetch & decode 1 email per second (due to rate limiting) and places the output to a file called `output.csv`.

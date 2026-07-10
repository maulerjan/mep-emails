### What
A script that fetches and decodes email addresses of all the current Members of European Parliament (MEPs).

### Why
European Parliament sometimes votes about important stuff. Contact all of them if you wish to change their mind. This script gives you all their email addresses at once. **Please don't share the resulting list publicly, we don't want to flood our MEPs with spam.**

### Pre-requisites

You need [Node.js](https://nodejs.org/en/download) installed.

### Usage
```
npx tsx main.ts
```

It will fetch & decode 1 email per second (due to rate limiting) and places the output to a file called `output.csv`.

### Current status

As of 2026, this script still works.

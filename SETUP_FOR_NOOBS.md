# Atlas-Of-Thrones: Setup for Noobs

#### Note for contributors
This help file uses the "Markdown" syntax: a simplified and reduced markup language (hence the 'Markdown' neologism): It's both easier to learn and less verbous than HTML while providing the minimum set of features for documnting a project.
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

A new version of interactive "Game of Thrones" map powered by Leaflet, PostGIS, and Redis. Please notice that original author is Patrick Triest (https://github.com/triesta/Atlas-Of-Thrones)

## Prerequisites

Here are the prerequisite tools and howtos which must be installed before proceeding with the Setup.

1. How to open a command line interpreter
- Locate the 'Windows search input field' (it should be on left bottom, just beside the 'Start' button)
- Type 'cmd' then hit ![Return Key](https://raw.githubusercontent.com/Echopraxium/Atlas-Of-Thrones/backend-starter/assets/icons/ReturnKey.png "Return Key")
Refs:  https://www.pcmag.com/how-to/how-to-search-in-windows-10

2. Git 
Download and install the Git installer (https://git-scm.com/download/win)

## Setup (Windows 10)

To setup the project, simply download or clone the project to your local machine and `npm install`.
1. git clone -b backend-starter https://github.com/Echopraxium/Atlas-Of-Thrones
2. `npm install`
3. `npm audit fix`

The only extra step is adding a `.env` file in order to properly initialize the required environment variables.

Here's an example `.env` file with sensible defaults for local development -
```
PORT=5000
DATABASE_URL=postgres://patrick@localhost:5432/atlas_of_thrones?ssl=false
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:8080
```

You'll need to change the username in the DATABASE_URL entry to match your Postgres user credentials. Unless your name is "Patrick", that is, in which case it might already be fine.


Run `npm run local` to start the API server on `localhost:5000`, and to build/watch/serve the frontend code from `localhost:8080`.
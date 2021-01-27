## Atlas Of Thrones - A Setup guide for Noobs

### Introduction

A new version of *Game of Thrones* interactive map. It's powered by *NodeJS*, *Leaflet*, *PostgresQL* + *PostGIS* and *Redis*. 

- Notice that original author is *Patrick Triest* (https://github.com/triesta/Atlas-Of-Thrones)

- ##### Note for contributors

  This help file uses the *Markdown* syntax: a simplified and reduced *markup* language (hence the 'Markdown' neologism): It's both *easier to learn* and *less verbous* than *HTML* while providing the minimum set of features for documenting a project.
  https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

  - You can use **Typora** to edit / view markdown (`.md` ) files (https://typora.io/)

### 1. Prerequisites

Here are the prerequisite **tools** and **howtos** which must be explained before proceeding with the **Setup** (next chapter).

1. How to ... **open a command prompt**
   - Locate the *Windows search* input field (it should be on *left bottom corner* of the screen, just beside the **Start** button)
   - Type '**cmd**' then hit [Return] key ![Return Key](https://raw.githubusercontent.com/Echopraxium/Atlas-Of-Thrones/backend-starter/assets/icons/ReturnKey.png "Return Key")
     Refs:  https://www.pcmag.com/how-to/how-to-search-in-windows-10
   - A panel should be displayed (above input field) to launch the command prompt
     - It's advised to open the command line interpreter as Administrator: right click on 'Command prompt' in panel then select *Run as Administrator*
2. **Git**: the most popular versioning tool (*esp.* for *Open Source* projects)

   - Download and install the *Git* installer: https://git-scm.com/download/win

3. **NodeJS**: a *Javascript* runtime environment which allow to run *Javascript* apps outside of a *Web Browser* (e.g. on a *Web server*)

   - Download and install the NodeJS installer: https://nodejs.org/en/download/

     Note: its advised to select 'LTS' which is the stable version (*Long Term Support*)

4. **PostgresQL**: a popular *RDBMS* (Relational Database Management System)

   - Download and install the *PostgresQL* installer (https://www.postgresql.org/)

   - Install *PostGIS* extension (GIS: *Geographic Information System*)

     - http://download.osgeo.org/postgis/windows/pg13/ then select:

       postgis-bundle-pg13x64-setup-3.1.0-1.exe

### 2. Setup (Windows 10)

1. *Backend* (Server side) installation

   - `git clone -b backend-starter https://github.com/Echopraxium/Atlas-Of-Thrones`
   - `npm install`
   - `npm audit fix`

2. Create and Fill GIS database

3. Add a `.env` configuration file

   `.env` file is meant to properly initialize the required environment variables.

   Here's an example `.env` file with sensible defaults for local development

   ```
   PORT=5000
   DATABASE_URL=postgres://patrick@localhost:5432/atlas_of_thrones?ssl=false
   REDIS_HOST=localhost
   REDIS_PORT=6379
   CORS_ORIGIN=http://localhost:8080 
   ```

   You'll need to change the username in the **DATABASE_URL** entry to match your *PostgresQL* user credentials. Unless your name is "patrick", that is, in which case it might already be fine.

4. Start the *API Server*

   - `npm run dev`
   - This will start the *API server* on `localhost:5000`

5. Access the '*Atlas of Thrones*' interactive map

   -  Start the client (frontend)
     - Open a Web Browser and type `localhost:8080` in the URL input field.
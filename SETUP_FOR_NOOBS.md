## Atlas Of Thrones - A Setup tutorial for Noobs

### Introduction

A new version of *Game of Thrones* interactive map. It's powered by *NodeJS*, *Leaflet*, *PostgresQL* + *PostGIS* and *Redis*. 

- Notice that original author is *Patrick Triest* (https://github.com/triesta/Atlas-Of-Thrones)

- ##### Note for contributors

  > This help file uses the *Markdown* syntax: a simplified and reduced *markup* language (hence the 'Markdown' neologism): It's both *easier to learn* and *less verbous* than *HTML* while providing the minimum set of features for documenting a project.
  > https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
  >
  > NB: You can use **Typora** to edit / view markdown (`.md` ) files (https://typora.io/)

### 1. Prerequisites

Here are the prerequisite **tools** and **howtos** which must be explained before proceeding with the **Backend setup** (next chapter).

- 1.1. How to ... **Open a command prompt**

   - Locate the *Windows search* input field (it should be on *left bottom corner* of the screen, just beside the **Start** button)
   - Type `cmd` then hit [Return] key ![Return Key](https://raw.githubusercontent.com/Echopraxium/Atlas-Of-Thrones/backend-starter/assets/icons/ReturnKey.png "Return Key")
     (see also  https://www.pcmag.com/how-to/how-to-search-in-windows-10)
   - A panel should be displayed (above input field) to launch the command prompt
     
     > It's advised to open the command line interpreter as Administrator: right click on 'Command prompt' in panel then select *Run as Administrator*

- 1.2. Create a *Temporary Folder* for *Step 1.5.8*, I suggest that you create a folder named '**AOT**' on **Disc C** by means of the *File Explorer*

   - Open a command prompt
     - Select Disc C: type `C:` then hit [Return] key
     - Change current directory to `C:\AOT`  type `cd C:\AOT` then hit [Return] key
     - Keep the *Command prompt Window* opened for next steps

- 1.3. **Git**: the most popular versioning tool (*esp.* for *Open Source* projects)

   - Download and install the *Git* installer: https://git-scm.com/download/win

- 1.4. **NodeJS**: a runtime environment which allows to run *Javascript* apps (e.g. a *Web server*) outside of a *Web Browser*

   - Download and install the *NodeJS* installer: https://nodejs.org/en/download/

     > It's advised to select 'LTS' which is the stable version (*Long Term Support*)
     
   - Install **webpack-dev-server**

     - Open a command prompt
     - Select Disc C: type `C:` then hit [Return] key
     - Type `npm i -g webpack-dev-server` 
     - This will install `webpack-dev-server` globally 

     

- 1.5. **PostgresQL**: a popular *RDBMS* (Relational Database Management System)

   - 1.5.1. Download and install the *PostgresQL* installer (https://www.postgresql.org/)

     > You will be asked to provide a password for the predefined administrator (`postgres`) , I advise a very straightforward password at this stage (e.g. '*postgres*' or '*admin*'), just take care to either remember it easily or write it down for *Step 1.5.4*

   - 1.5.2. Install *PostGIS* extension (GIS: *Geographic Information System*)

     Open the following link:

     ```
     http://download.osgeo.org/postgis/windows/pg13
     ```

     Now select: `postgis-bundle-pg13x64-setup-3.1.0-1.exe`

   - 1.5.3. Open a *2nd Command prompt window* 

     > NB: To open a new Command prompt window, use Step 1.1

   - 1.5.4. Create the `gotfan` database user

     > The original user is `patrick`(first name of original project author) but in this tutorial it will be replaced by `gotfan`.

     - Open *PostgresQL prompt* and use the password that you choose for `postgres` user:

     ```
     psql -U postgres
     ```

     > NB: If you want to exit *PostgresQL prompt* just type `\q`

     - Now create user `gotfan`  (with a straightforward password like `gotfan`)
       Note: it's important to keep this username as it's also used in the *database dump*  (`atlas_of_thrones.sql`) which will be downloaded and imported in *Step 1.5.8.*

       ```
       CREATE USER gotfan WITH PASSWORD 'gotfan'
       ```

       NB: if for any reason you prefer another username, take it into account in the following steps and also you will have to edit `atlas_of_thrones.sql` at *Step 1.5.7* and change all occurences of `gotfan` by this alternate username

   - 1.5.5. Create the `atlas_of_thrones` database

     ```
     CREATE DATABASE atlas_of_thrones  
     ```

     > NB: If you need to recreate the database, use `DROP DATABASE atlas_of_thrones`
     >
     > then recreate it with `CREATE DATABASE atlas_of_thrones`

   - 1.5.6. Grant privileges (access rights) to user `gotfan`

     ```
     GRANT ALL PRIVILEGES ON DATABASE atlas_of_thrones to gotfan;
     GRANT SELECT ON ALL TABLES IN SCHEMA public TO gotfan;
     ```

   - 1.5.7. Connect to this new database and activate the *PostGIS* extension
   Open the *2nd Command prompt window* (or reopen with *Step 1.5.3* if it was closed)
     
     ```
     \c atlas_of_thrones
     CREATE EXTENSION postgis;
     ```
     
   - 1.5.8. Download *GIS data* for *Atlas Of Thrones* map

       - Open the following link in your *Web Browser*
       
         ```
         https://github.com/Echopraxium/Atlas-Of-Thrones/blob/backend-starter/data/gis/atlas_of_thrones.sql
         ```
       
     - Select `Raw` in the *File toolbar* ![File Toolbar](https://raw.githubusercontent.com/Echopraxium/Atlas-Of-Thrones/backend-starter/assets/icons/github_file_toolbar.png "File toolbar") which is above the file content (NB: it's a *database sql dump*)
     
     - Put the mouse cursor over the sql text, then right click and choose "**Save As...**", select  `C:\AOT` as the destination folder
     
     - Remove the  `.txt` extension in order to have just the following
     
     ```
        atlas_of_thrones.sql
     ```
     
   - 1.5.9. Import *GIS data* provided by `atlas_of_thrones.sql` (downloaded in previous step)
     In the *1st Command prompt window* previously opened (cf. *Step 1.2*), type the following:

     ```
     psql -d atlas_of_thrones < C:\AOT\atlas_of_thrones.sql 
     ```

   - 1.5.10. Check if import is successful

     - In *1st Command prompt window*, set `atlas_of_thrones` as current database (you will be asked to type the password for`gotfan` user which is `gotfan`)

       ```
       psql -d atlas_of_thrones -U gotfan
       ```

     - Get the list of available tables in `atlas_of_thrones` database

        In the 2nd Command prompt window (repeat *Step 1.1.1* if necessary)

        ```
        \dt
        ```

        > You should get:
        >
        > ```
        > List of relations
        > Schema |      Name       | Type  |  Owner  
        > -------+-----------------+-------+---------
        > public | kingdoms        | table | patrick
        > public | locations       | table | patrick
        > public | spatial_ref_sys | table | patrick
        > (3 rows)
        > ```
      - Now you can exit *PostgresQL prompt*

        ```
        \dt     
        ```


### 2. Backend setup (Windows 10 - 64 bits)

- 2.1. *Backend* (Server side) installation
  - Open a command prompt
  - git clone -b backend-starter https://github.com/Echopraxium/Atlas-Of-Thrones`
  - `npm install`
  - `npm audit fix`

- 2.2. Add a `.env` configuration file

  `.env` file is meant to properly initialize the required environment variables.

  Here's an example `.env` file with sensible defaults for local development

  ```
  PORT=5000
  DATABASE_URL=postgres://gotfan:gotfan@localhost:5432/atlas_of_thrones
  REDIS_HOST=localhost
  REDIS_PORT=6379
  CORS_ORIGIN=http://localhost:8080
  ```

  > Note: the username in the **DATABASE_URL** entry must match your *PostgresQL* user credentials, hence it is "**gotfan**" as explained in Chapter 1 paragraph 4  (installation of *PostgresQL*).

- 2.3. Start the *API Server*
  
- Open a command prompt
  
- `npm start`
  
  This will start the *API server* on `localhost:5000`, you should see:
  
    ```
    info: Server listening at port 5000
    info: Connected To atlas_of_thrones at localhost:5432
  ```
  
- 2.4. Test `hello` API endpoint

  Open a *Web Browser* and type `localhost:5000/hello` in the URL input field.

  > You should see a page with 'Hello World' in the *Web Browser*

- 2.5. Test `time` API endpoint

  Open a *Web Browser* and type `localhost:5000/time` in the URL input field.

  > You should see a page with a text like this `{"now": "2021-01-28T16:17:47.319Z"}`

- 2.6. Test of`GeoJSON` API endpoint: Show **Regions** then **Castles locations**

  - Open a *Web Browser* and type `http://localhost:5000/kingdoms`

  - Select All *GeoJSON* *data* (`CTRL A`) and copy in Clipboard (`CTRL C`)

  - Open in another tab of the *Web Browser* the *GeoJSON Preview page*

    ```
    https://cdn.patricktriest.com/atlas-of-thrones/geojsonpreview.html
    ```

  - Paste *GeoJSON* *data* (`CTRL V`) in the text box (where it's written '*Parse GeoJSON Here*' then push `Render`). 

    > You should see the **Regions** displayed on the Map.

  - Open a new tab of the *Web Browser* and type `http://localhost:5000/locations/castle`

  - Copy All *GeoJSON* *data* (`CTRL A`   `CTRL C`)
  
  - Select the tab with *GeoJSON Preview page* and Paste *GeoJSON* *data* (`CTRL V`) in the text box  then push `Render`). 
  
    > You should see the **Castle locations** displayed on the Map.


### 3. Frontend setup (Windows 10 - 64 bits)

- 3.1. Start the *API Server* (Web service on Port 5000)

  - Open a command prompt

  - `npm start`

    This will start the *API server* on `localhost:5000`, you should see:

    ```
    info: Server listening at port 5000
    info: Connected To atlas_of_thrones at localhost:5432
    ```

- 3.2. Start *Webpack* and the *Web Server*

  - Open a command prompt

  - `npm run serve`. You should see the following output in the *Command prompt window*:

    ```
    > atlas-of-thrones@0.8.0 serve D:\_Dev\_00_github\Echopraxium\Atlas-Of-Thrones
    > webpack serve --content-base ./public/
    
    i ｢wds｣: Project is running at http://localhost:8080/
    i ｢wds｣: webpack output is served from /
    i ｢wds｣: Content not from webpack is served from ./public/
    i ｢wdm｣: Hash: a63743028ac4240a7c89
    Version: webpack 4.46.0
    Time: 1831ms
    Built at: 2021-02-01 22:09:11
        Asset      Size  Chunks                    Chunk Names
    bundle.js  2.35 MiB       0  [emitted]  [big]  main
    Entrypoint main [big] = bundle.js
     [3] ./node_modules/leaflet/dist/leaflet-src.js 421 KiB {0} [built]
     ...
    61 hidden modules
    i ｢wdm｣: Compiled successfully.
    ```

    
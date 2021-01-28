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

- 1.2. Create a *Temporary Folder* for *Step 1.5.7.* I suggest that you create a folder named '**AOT**' on **Disc C** by means of the *File Explorer*

   - Open a command prompt
     - Select Disc C: type `C:` then hit [Return] key
     - Change current directory to `C:\AOP`  type `cd C:\AOP` then hit [Return] key
     - Keep the *Command prompt Window* opened for next steps

- 1.3. **Git**: the most popular versioning tool (*esp.* for *Open Source* projects)

   - Download and install the *Git* installer: https://git-scm.com/download/win

- 1.4. **NodeJS**: a runtime environment which allow to run *Javascript* apps (e.g. a *Web server*) outside of a *Web Browser*

   - Download and install the *NodeJS* installer: https://nodejs.org/en/download/

     > It's advised to select 'LTS' which is the stable version (*Long Term Support*)

- 1.5. **PostgresQL**: a popular *RDBMS* (Relational Database Management System)

   - 1.5.1. Download and install the *PostgresQL* installer (https://www.postgresql.org/)

     > You will be asked to provide a password for the predefined administrator (`postgres`) , I advise a very straightforward password at this stage (e.g. '*postgres*' or '*admin*'), just take care to either remember it easily or write it down for *Step 1.5.3.*

   - 1.5.2. Install *PostGIS* extension (GIS: *Geographic Information System*)

     Open the following link:

     ```
     http://download.osgeo.org/postgis/windows/pg13
     ```

     Now select: `postgis-bundle-pg13x64-setup-3.1.0-1.exe`

   - 1.5.3. Create the `gotfan` database user

     > The original user is `patrick`(first name of original project author) but in this tutorial it will be replaced by `gotfan`.

     - Open *PostgresQL prompt* and use the password that you choose for `postgres` user:

       ```
       psql -U postgres
       ```

     - Now create user '**gotfan**'  (with a straightforward password like '**gotfan**')
       Note: it's important to keep this username as it's also used in the *database dump*  (`atlas_of_thrones.sql`) which will be downloaded and imported in *Step 1.5.6.*

       ```
       CREATE USER gotfan WITH PASSWORD 'gotfan';
       ```

   - 1.5.4. Create the '**atlas_of_thrones**'  database

     ```
     CREATE DATABASE atlas_of_thrones;   
     ```

   - 1.5.5. Grant privileges (access rights) to user '**gotfan**'

     ```
     GRANT ALL PRIVILEGES ON DATABASE atlas_of_thrones to gotfan;
     GRANT SELECT ON ALL TABLES IN SCHEMA public TO gotfan;
     ```

   - 1.5.6. Download *GIS data* for '*Atlas Of Thrones*' map

     - Open the following link in your *Web Browser*

       ```
       https://github.com/Echopraxium/Atlas-Of-Thrones/blob/backend-starter/data/gis/atlas_of_thrones.sql
       ```

     - Select `Raw` in the *File toolbar* ![File Toolbar](https://raw.githubusercontent.com/Echopraxium/Atlas-Of-Thrones/backend-starter/assets/icons/github_file_toolbar.png "File toolbar") which is above the file content (NB: it's a *database sql dump*)

     - Put the mouse cursor over the sql text, then right click and choose "**Save As...**", select  `C:\AOP` as the destination folder

     - Remove the  `.txt` extension in order to have just the following

       ```
       atlas_of_thrones.sql
       ```

   - 1.5.7. Import GIS data provided by `atlas_of_thrones.sql`  
     In the Command prompt window previously opened (cf. *Step 1.2*), type the following:

     ```
     psql -d atlas_of_thrones < C:\AOP\atlas_of_thrones.sql 
     ```

   - 1.5.8. Check if import is successful

     - Set `atlas_of_thrones` as current database

       ```
       psql -d atlas_of_thrones -U gotfan
       ```

     - Get the list of available tables in `atlas_of_thrones` database

       ```
       \dt
       ```

       > You should get:
       >
       > ```
       > List of relations
       >  Schema |      Name       | Type  |  Owner  
       > --------+-----------------+-------+---------
       >  public | kingdoms        | table | patrick
       >  public | locations       | table | patrick
       >  public | spatial_ref_sys | table | patrick
       > (3 rows)
       > ```

     - Now you can exit *PostgresQL prompt*

       ```
       \dt     
       ```

### 2. Backend setup (Windows 10)

1. *Backend* (Server side) installation

   - Open a command prompt
   - git clone -b backend-starter https://github.com/Echopraxium/Atlas-Of-Thrones`
   - `npm install`
   - `npm audit fix`

3. Add a `.env` configuration file

   `.env` file is meant to properly initialize the required environment variables.

   Here's an example `.env` file with sensible defaults for local development

   ```
   PORT=5000
   DATABASE_URL=postgres://gotfan@localhost:5432/atlas_of_thrones?ssl=false
   REDIS_HOST=localhost
   REDIS_PORT=6379
   CORS_ORIGIN=http://localhost:8080 
   ```

   Note: the username in the **DATABASE_URL** entry to match your *PostgresQL* user credentials, hence it is "**gotfan**" as explained in Chapter 1 paragraph 4  (installation of *PostgresQL*).

3. Start the *API Server*

   - Open a command prompt

   -  `npm start`

     > This will start the *API server* on `localhost:5000`
     >
     > You should see:
     >
     > ```
     > info: Server listening at port 5000
     > ```

4. Check if the *API server* is ready and if it provides the 'hello' service

   - Open a Web Browser and type `localhost:5000/hello` in the URL input field.

     > You should see a page with 'Hello World' in the *Web Browser*
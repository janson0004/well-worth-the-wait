# Well Worth the Wait

## Run it locally

There are production/ development mode, which can be define within .env

```
git clone https://github.com/janson0004/well-worth-the-wait.git
```

### client

Navigate to client folder, install dependencies

```
cd client
npm install
```

#### Environment variable

Create a .env.local file under the client folder, and set the environment variable:

```
REACT_APP_MAP_API_KEY=your_google_api_key
```

Start the client side

```
npm start
```

### server

Navigate to client folder, install dependencies

```
cd server
npm install
```

#### Environment variable

Create a .env file under the server folder, and set the environment variable:

```
PORT=3001
MONGO_URL=your_own_mongodb_uri
NODE_ENV=development
JTW_TOKEN=your_token
API_KEY=your_google_api_key
```

#### Setup virtual environment for python

> mac

```
python3 -m venv env       # Create virtual environment
source env/bin/activate   # Get into virtual environment
```

```
deactivate                # Exit virtual environment
```

> windows

```
pip install virtualenv
virtualenv env
\env\Scripts\activate.bat
```

#### Install dependencies for python

```
pip3 install -r requirements.txt
```

```
cd populartimes
pip3 install .
```

Start the server side

```
npm start
```

### Install all packages and build (production mode)

On the root folder, run these command

```
npm run build
npm start
```

## Remarks

Server need to be run in python virtual environment for the env variables.

With NODE_ENV=development, client and server will run in different port (3000, 3001)

With NODE_ENV=production, server will serve the built-client with single port (2109)

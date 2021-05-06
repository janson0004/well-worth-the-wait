# Well Worth the Wait

## Run it locally (Not in VM)

### client

Navigate to client folder, install dependencies

```
cd client
npm install
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

Start the server side

```
npm start
```

#### Setup virtual environment for python

> mac

```
python3 -m venv env       # Create virtual environment
source env/bin/activate   # Get into virtual environment
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

#### Environment variable

Create a .env file under the server folder, and set the environment variable:

```
PORT=3001
MONGO_URL=your_own_mongodb_uri
NODE_ENV=development
JTW_TOKEN=your_token
API_KEY=your_google_api_key
```

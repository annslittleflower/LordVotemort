# LordVotemort
Simple voting app


### To start a server u need to do next things:
- `npm install`

- `create .env file, content can be taken from .env.example`

- `node app.js`


### Endpoints

- `POST /api/register` - requires username and password in body

- `POST /api/login` - requires username and password in body

- `POST /api/logout`

- `GET /api/candidates` - returns list of all candidates

- `GET /api/candidates/top?limit=n` - returns candidates, sorted by votes count, can be limited by passing limit param

- `GET /api/votes` - returns list of votes with populated user and candidate

- `POST /api/vote/:candidateId` - creates a vote for candidate, can accept comment in body

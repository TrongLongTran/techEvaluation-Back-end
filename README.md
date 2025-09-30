# techEvaluation-Back-end
Voting Dashboard Backend (Node.js + Express + MongoDB)

This backend powers the Voting Dashboard application. It provides RESTful API endpoints for submitting votes, fetching aggregated results, and visualizing data in the frontend React app.

### Routes
- `isealDTB` -> get all datas in the database
- `historiesVotes` -> get all datas in the database base on the date given
- ` allTimeLing` -> get all timeline on the database
- `resultCOuntry` -> a post handler

### Project's structure
- `middleware\` -> contain middleware for the post request
- `routes\` -> contain getTotalsFinals (for the bar chart) and getAllCandidatesInfo (get and post request)
- `schema\` -> candideal.js is the main schema for this project
- `index.js` -> entry point of backend server

### Setup instruction
1. Create a .env file and copy the .env.example data to .env
   Methods:
   1. Use: ```cp .env.example .env```
   2. Or: Copy and paste from .env.example
      - ```MONGODB_KEY=""```
2. Install dependencies
   npm install
3. Start development server
   ```npm run build```
4. Run the product
   ```npm run dev```

### API endpoints
## Candidates
- ```GET /getCandidates/isealDTB?page={page}&limit={limit}```
  -> Get all the candidates from the database after paginate through pages and limits
- ```GET /getCandidates/historiesVotes?page={page}&limit={limit}&days={days}```
  -> Get all candidates after paginate with string of days by the format of `yyyy-mm-dd` then cut further through page and limit
- ```GET /getCandidates/allTimeLine```
  -> Get first all the time line of votings
- ```POST /getCandidates/resultCountry```
  -> Post the voting candidates and results to the database
  - # Request body
   `{
     "id": "RES-2025-001",\n
     "Title": "Sustainable Energy Development",
     "Agenda": "Climate Change and Renewable Energy",
     "Resolution": "Resolution adopted on sustainable energy",
     "Meeting Record": "Meeting-45",
     "Draft resolution": "Draft-2025-001",
     "Note": "Presented by the Environment Committee",
     "Vote summary": "Adopted with majority",
     "Vote date": "2025-09-30",
     "Collections": "General Assembly Resolutions",
     "Committee report": "Committee on Climate Action Report 2025"
  }`
  - # Response (success)
    `{success: "added to database"}`
  - # Validation/Errors
    - `400`: Duplicate data, missing fields, not correct year format, exceed ID given number limit
    - `500`: backend error

## Gather information
- ```GET /getCandidates/testOne```
  -> Get all Yes, No, Abstain and no votes from the database with latest, earliest year and number of countries for analyzing purpose

## Middleware functionalities
- `verifyUsernameAndPass` -> check if id is more than 0 and less then 20 million or not
- `verifyFields` -> check if all fields are filled
- `checkYear` -> check post request's year if it is in the right format or not

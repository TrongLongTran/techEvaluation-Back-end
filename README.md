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

## Gather information
- ```GET /getCandidates/testOne```
  -> Get all Yes, No, Abstain and no votes from the database with latest, earliest year and number of countries for analyzing purpose



   

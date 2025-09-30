# techEvaluation-Back-end
Voting Dashboard Backend (Node.js + Express + MongoDB)

This backend powers the Voting Dashboard application. It provides RESTful API endpoints for submitting votes, fetching aggregated results, and visualizing data in the frontend React app.

### Routes
- `isealDTB` -> get all datas in the database
- `historiesVotes` -> get all datas in the database base on the date given
- ` allTimeLing` -> get all timeline on the database
- `resultCOuntry` -> a post handler

### Folders
- `middleware` -> contain middleware for the post request
- `routes` -> contain getTotalsFinals (for the bar chart) and getAllCandidatesInfo (get and post request)
- `schema` -> candideal.js is the main schema for this project

**chekc**

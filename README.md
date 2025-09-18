# AI Lead Scorer

AI Lead Scorer is a web application that helps businesses score sales leads using both **rule-based logic** and **AI predictions**. It predicts lead intent (High, Medium, Low) and provides reasoning for each lead, allowing sales and marketing teams to prioritize efficiently.

---



---

## API Routes

| Route                 | Method | Description                                        | Request Body / Params                                |
|-----------------------|--------|----------------------------------------------------|------------------------------------------------------|
| `/offer`              | POST   | Save product/offer details                        | `{ name: string, value_props: array, ideal_use_cases: array }` |
| `/leads/upload`       | POST   | Upload CSV of leads                                | `file` (CSV file)                                    |
| `/score`              | POST   | Run scoring logic (rules + AI)                    | None                                                 |
| `/score/results`      | GET    | Get all scored leads                               | None                                                 |

---

## Scoring Logic

- **Rules Layer (max 50 pts)**  
  - Role relevance  
  - Industry match  
  - Data completeness  

- **AI Layer (max 50 pts)**  
  - Gemini AI model predicts High / Medium / Low intent  
  - Mapped to points: High = 50, Medium = 30, Low = 10  

- **Final Score = Rules + AI points**

---

## Usage

1. **Setup Frontend and backend**  
```bash
cd backend
npm install
```
```bash
cd frontend
npm install
npm run dev (run both backend and frontend)
```

##Loom Video

https://www.loom.com/share/906144752212474f8eb2f6b68abd4aeb?sid=c41ae26c-fce4-4e70-81ab-7a42ed0d975c




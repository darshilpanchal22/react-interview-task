⚙️ Technical Implementation Details

1. Session Management Logic
   The application uses a "Heartbeat" mechanism within the AuthContext. A setInterval checks the session_expiry timestamp in localStorage every second. If Date.now() exceeds the limit, the logout() function is triggered globally.

2. Component Composition
   To maintain DRY (Don't Repeat Yourself) principles, a Layout.jsx component wraps all protected views. This ensures the Sidebar and Header are only rendered once, while the Outlet from react-router-dom handles dynamic page content.

3. State Management Strategy
   I chose the Context API over Redux Toolkit for this specific task to demonstrate proficiency with native React hooks (useContext, useEffect). This approach provides a lightweight yet powerful solution for managing shared state across the dashboard without external library bloat.

🛠️ How to Run
Clone the repository:

Install dependencies:

Start the development server:

🧼 Code Quality Guidelines
Reusable Components: UI elements are broken down into small, manageable pieces.

Separation of Concerns: Business logic (Context) is separated from UI (Components).

Responsive Design: Mobile-first approach using Tailwind's utility classes.

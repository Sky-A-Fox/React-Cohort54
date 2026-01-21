# link for the netify
https://budgetflow-nl.netlify.app/


# BudgetFlow - Technical Notes for Mentors Only
Readme file for the app within the app itself

## 🐛 Known Issues
- ESLint errors in Analytics.jsx (functions before useEffect)
- No tests - focus on MVP
- Context and provider in one file

## 🔧 What's Fixed
1. **Analytics** - showed Income instead of Budget
2. **PeriodSelector** - added scrolling for >12 months
3. **LoadMonthModal** - removed broken getSortedMonths import
4. **KPIGrid** - protection from undefined in .toFixed()

## 🏗️ Architecture
- Context API + localStorage
- Data: Calculator → Budget → Analytics
- Complex logic in Analytics.jsx (month aggregation)

## 💡 What to improve
1. Add tests (Jest + RTL)

## 🔧💡 What to add
1. Add the ability to delete months via the budget page
2. Add more quick options to the analytics page. For example, create favorite months, such as sick leave or vacation, as a separate category so you don't have to manually select months each time.
3. Possibly add more metrics (based on user requests) to the analytics page.
4. Improve the calculator to a fully functional version. (Questionable feasibility, no direct monetization, requires constant updating)
# Driver Behavior AI Coach - Project Instructions

## Project Overview

**Goal:** Help fleet drivers improve safety and fuel efficiency through personalized, data-driven coaching.

The system uses Geotab telematics data (speed, braking, idling, etc.) and a lightweight AI model to analyze driving patterns and suggest actionable improvements.

Think of it as a **"Fitbit for your driving habits"** — but built on Geotab data.

### How It Works (Concept Flow)

1. **Collect telematics data from Geotab API**
   → trip history, speed, acceleration, braking, idling time, fuel use

2. **Analyze driving patterns**
   → detect harsh events, inefficiencies, or unsafe behavior

3. **Score each driver**
   → e.g. "Safety Score: 82/100" and "Efficiency Score: 76/100"

4. **Generate personalized feedback**
   → "Reduce idling time to save ~5L of fuel per week."
   → "You brake harshly 20% more than fleet average."

5. **Show interactive dashboard (Zenith frontend)**
   → graphs, trendlines, and daily tips

6. **Optional: integrate a simple AI model** that predicts risk or improvement potential.

## Technical Requirements

### Technology Stack
- **Frontend**: React + **Zenith UI Library** (Geotab's React component library) + Recharts
- **Backend**: Node.js + Express
- **API Integration**: **Geotab SDK** + REST endpoints
- **Optional AI**: TensorFlow.js or OpenAI API for LLM feedback
- **Database**: Firebase/MongoDB for caching
- **Authentication**: MyGeotab login or OAuth
- **Cloud Platform**: Geotab Cloud + custom backend hosting

### Core Functionality
- **Real-time data collection**: Geotab API integration for telematics data
- **AI model specifications**: Lightweight models for risk prediction and personalized feedback
- **User interface requirements**: Zenith-based React dashboard with interactive charts
- **Data storage and processing**: Caching layer for Geotab data with trend analysis
- **Integration requirements**: MyGeotab SDK integration with REST API endpoints

## Project Structure

### Directory Organization
```
driver-behaviour-ai-coach/
├── README.md
├── PROJECT_INSTRUCTIONS.md
├── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── geotab/
│   │   └── app.js
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
├── docs/
└── config/
```

### File Naming Conventions
- [ ] Specify naming conventions for files and directories
- [ ] Code style requirements
- [ ] Documentation standards

## Features and Requirements

### Core Features

| Feature | Description |
|---------|-------------|
| **Driver Scorecard** | Composite "Safety" + "Efficiency" score computed from trip data |
| **AI Feedback Generator** | NLP or rule-based logic that creates friendly suggestions |
| **Trend Visualization** | Chart of safety/efficiency scores over time using Recharts |
| **Driver Comparison** | Compare a driver's behavior to fleet average |
| **Alerts & Insights** | Highlight recent risky trips ("3 harsh brakes this week") |
| **Gamification** | Leaderboard or badges ("Most Improved Driver") |

#### 1. **Driver Monitoring**
   - Real-time behavior tracking via Geotab API
   - Data collection from telematics devices
   - Integration with Geotab's StatusData and Trip APIs

#### 2. **AI Analysis**
   - Lightweight machine learning models (linear regression, random forest)
   - Training data from historical Geotab trip data
   - Performance metrics: safety scores, efficiency scores

#### 3. **Coaching System**
   - Personalized feedback generation using LLM (GPT-4-mini)
   - Rule-based recommendation engine
   - Progress tracking with trend analysis

#### 4. **User Interface (Zenith-based)**
   - Interactive dashboard built with Zenith React components
   - Web-based interface optimized for fleet managers
   - Real-time data visualization with charts and graphs

### Advanced Features
- **Gamification elements**: Driver leaderboards, achievement badges, improvement streaks
- **Social features**: Team comparisons, fleet-wide challenges
- **Reporting and analytics**: Detailed trip reports, fuel efficiency analysis, safety trend reports
- **Integration with external systems**: Geotab Marketplace integration, third-party fleet management tools

## Data Requirements

### Data Sources

**Primary Data Source: Geotab APIs**

| Data Type | API Object | Key Fields |
|-----------|------------|------------|
| Trips | Trip | distance, duration, start/stop times |
| Status Data | StatusData | speed, engine load, throttle, fuel level |
| Exceptions | ExceptionEvent | speeding, idling, seatbelt violations |
| Devices | Device | vehicle and driver mapping |
| Users | User | driver name and ID |
| Diagnostic | Diagnostic | engine data (RPM, temperature, etc.) |

**Calculated Metrics:**
- Average speed
- Harsh braking frequency
- % time idling
- Fuel consumption per trip
- Over-speed events per km

- **Data Format**: JSON via Geotab REST API
- **Processing**: Real-time data streaming with batch processing for historical analysis
- **Privacy**: Geotab's built-in data privacy and security compliance

### Data Models

**Driver Profile Structure:**
```javascript
{
  driverId: string,
  name: string,
  fleetId: string,
  safetyScore: number,
  efficiencyScore: number,
  totalTrips: number,
  lastUpdated: timestamp
}
```

**Behavior Data Schema:**
```javascript
{
  tripId: string,
  driverId: string,
  date: timestamp,
  distance: number,
  duration: number,
  harshBrakingEvents: number,
  overspeedEvents: number,
  idleTime: number,
  fuelConsumption: number
}
```

**Performance Metrics:**
- Safety Score (0-100)
- Efficiency Score (0-100)
- Harsh Events per Trip
- Idle Time Percentage
- Fuel Efficiency Rating

**Historical Data Storage:** Firebase/MongoDB for caching and trend analysis

## System Architecture

```
              ┌─────────────────────────┐
              │   Geotab Cloud / API     │
              │ (Trips, StatusData, etc.)│
              └──────────┬───────────────┘
                         │
                 REST / MyGeotab SDK
                         │
        ┌────────────────┴────────────────┐
        │         Backend (Node.js)        │
        │ - Fetch data from Geotab API     │
        │ - Compute scores and trends      │
        │ - Run ML model (e.g. scikit or TF.js)│
        │ - Expose /api/driver-insights    │
        └────────────────┬────────────────┘
                         │ JSON
                         ▼
        ┌─────────────────────────────────┐
        │   Frontend (React + Zenith)     │
        │ - Dashboard + charts            │
        │ - Driver profiles + feedback     │
        │ - "Daily Tip" component (AI)    │
        └─────────────────────────────────┘
```

## Scoring Logic & AI Layer

### Example Scoring Algorithm
```javascript
const computeDriverScore = (data) => {
  const { trips, harshEvents, idleTime, overspeedEvents } = data;

  let safetyScore = 100 - (harshEvents * 2 + overspeedEvents * 1.5);
  let efficiencyScore = 100 - (idleTime / trips.totalTime) * 100;

  safetyScore = Math.max(0, Math.min(100, safetyScore));
  efficiencyScore = Math.max(0, Math.min(100, efficiencyScore));

  return { safetyScore, efficiencyScore };
};
```

### Optional AI Layer
- **Natural Language Feedback**: LLM (GPT-4-mini API) for personalized coaching messages

**Example LLM Prompt:**
```
"Generate one friendly coaching message for a driver 
 who has high idle time but low harsh braking events."
```

## Zenith Frontend Components

| Component | Purpose |
|-----------|---------|
| `<DriverDashboard />` | Overview cards + KPI metrics |
| `<BehaviorTrends />` | Recharts/Plotly graphs of score history |
| `<FeedbackCard />` | Daily AI coaching message |
| `<Leaderboard />` | Rank drivers by score |
| `<TripInsights />` | Trip-by-trip breakdown table |

### UI Implementation
- Use **Zenith's Card, DataTable, Chart, Tabs, and Alert components**
- Each driver profile page = tabs for Overview, Trends, Trips, Feedback
- Responsive design optimized for fleet management dashboards

## Development Guidelines

### Code Standards
- **Frontend**: React with TypeScript, Zenith component library
- **Backend**: Node.js with Express, ES6+ JavaScript
- **API**: RESTful design following Geotab API patterns
- **Documentation**: JSDoc for functions, README for setup
- **Testing**: Jest for unit tests, React Testing Library for components
- **Version Control**: Git with conventional commit messages

### Performance Requirements
- **Response Time**: < 2 seconds for dashboard loading, < 500ms for API calls
- **Scalability**: Support 1000+ drivers per fleet with real-time updates
- **Resource Optimization**: Efficient Geotab API usage, data caching strategies
- **Error Handling**: Graceful degradation when Geotab API is unavailable, user-friendly error messages

## Deployment and Infrastructure

### Environment Setup
- [ ] Development environment requirements
- [ ] Production deployment specifications
- [ ] CI/CD pipeline requirements
- [ ] Monitoring and logging needs

### Security Considerations
- [ ] Authentication and authorization
- [ ] Data encryption requirements
- [ ] Privacy compliance (GDPR, etc.)
- [ ] Security testing requirements

## Timeline and Milestones

### Phase 1: Backend Foundation (Weeks 1-3)
- [ ] Set up Node.js backend with Express
- [ ] Integrate Geotab SDK and REST API
- [ ] Implement basic data fetching and caching
- [ ] Create driver scoring algorithm
- [ ] Target completion: Week 3

### Phase 2: Frontend Development (Weeks 4-6)
- [ ] Set up React frontend with Zenith UI library
- [ ] Build driver dashboard with basic components
- [ ] Implement data visualization with Recharts
- [ ] Create driver profile and comparison views
- [ ] Target completion: Week 6

### Phase 3: AI Features & Polish (Weeks 7-8)
- [ ] Integrate LLM for personalized feedback generation
- [ ] Add gamification features (leaderboards, badges)
- [ ] Implement real-time notifications and alerts
- [ ] Performance optimization and testing
- [ ] Target completion: Week 8

## Additional Notes

### Special Requirements
- **Geotab Integration**: Must use official MyGeotab SDK and REST API endpoints
- **Zenith UI Library**: Frontend must be built using Geotab's Zenith React component library
- **Fleet Data Compliance**: Follow Geotab's data privacy and security guidelines
- **Real-time Updates**: Support live data streaming from Geotab telematics devices
- **Mobile Responsive**: Dashboard must work on tablets and mobile devices for field managers

### Success Criteria
- **Performance Benchmarks**: Dashboard loads in < 2 seconds, API responses in < 500ms
- **User Acceptance**: Fleet managers can easily identify driver improvement opportunities
- **Quality Metrics**: 95%+ uptime, < 1% error rate in data processing
- **Testing Requirements**: 80%+ code coverage, integration tests with Geotab API

---

## Instructions for AI Assistant

Please use this document to:
1. Add detailed technical specifications
2. Define project scope and requirements
3. Specify implementation details
4. Set development milestones
5. Document any special considerations

The AI assistant will use this information to:
- Generate appropriate code structure
- Implement features according to specifications
- Follow established guidelines and standards
- Meet project requirements and deadlines

---

## Key Implementation Notes

- **Zenith UI Library**: This is Geotab's official React component library - ensure all frontend components use Zenith for consistency with Geotab's design system
- **Geotab API Integration**: Use MyGeotab SDK for authentication and REST endpoints for data fetching
- **Real-time Data**: Leverage Geotab's real-time data streaming capabilities for live dashboard updates
- **Fleet Management Focus**: Design specifically for fleet managers and drivers, not individual consumers

---

*Last Updated: [Current Date]*
*Version: 1.0*
*Project: Driver Behavior AI Coach*

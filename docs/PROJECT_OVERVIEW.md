# Project Overview

## What is SkillSwap?

SkillSwap is a peer-to-peer skill exchange platform that connects people who want to teach and learn from each other. Users can discover skills, match with potential partners, and exchange expertise in a structured, community-driven environment.

## Core Value Proposition

- **Learn New Skills**: Discover skills you want to master
- **Share Your Expertise**: Teach others what you know
- **Connect with Community**: Find like-minded skill enthusiasts
- **Flexible Learning**: Exchange skills on your own schedule

## Key User Flows

### 1. **Authentication Flow**

```
Landing Page → Sign Up / Login → Email/Google Auth → Dashboard
```

### 2. **Skill Setup Flow**

```
User Registration → Choose Skills to Teach → Choose Skills to Learn → Dashboard
```

### 3. **Skill Discovery Flow**

```
Dashboard → Explore Skills → Filter by Category → View Profiles → Connect
```

### 4. **Messaging & Scheduling**

```
Connect with User → Start Chat → Propose Schedule → Book Session
```

### 5. **Profile Management**

```
Dashboard → Profile → Edit Skills → Update Bio → Manage Preferences
```

## User Types

### 1. **New Users**

- Complete signup process
- Set up initial skill preferences
- View onboarding tutorial

### 2. **Active Learners**

- Browse and search skills
- Connect with teachers
- Schedule learning sessions

### 3. **Skill Sharers**

- Offer skills to the community
- Receive connection requests
- Manage their availability

## Business Model

- **Free Platform**: All core features are available to registered users
- **No Paywalls**: Skill exchange is completely free
- **Community-Driven**: Growth through word-of-mouth and user engagement

## Technical Architecture

The frontend communicates with a backend REST API to handle:

- User authentication and authorization
- Skill database management
- User profiles and connections
- Real-time messaging
- Schedule management
- Search and filtering

## Data Model Overview

### User

- Basic info (name, email, password)
- Profile (bio, avatar, location)
- Skills (teach/learn preferences)

### Skill

- Name, category, description
- Difficulty level
- Popularity metrics

### Connection

- Two users matched for skill exchange
- Start/end dates
- Feedback and ratings

### Message

- User-to-user conversations
- Timestamps
- Read status

### Schedule

- Learning session details
- Duration, location/medium
- Completion status

## Development Phases

### Phase 1: MVP (Current)

✅ User authentication
✅ Skill selection and management
✅ User profiles
✅ Basic search and discovery

### Phase 2: Messaging & Scheduling

⏳ Real-time chat
⏳ Session booking
⏳ Notifications

### Phase 3: Advanced Features

⏳ Skill matching algorithm
⏳ Ratings and reviews
⏳ Mobile app
⏳ Advanced search filters

---

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md)

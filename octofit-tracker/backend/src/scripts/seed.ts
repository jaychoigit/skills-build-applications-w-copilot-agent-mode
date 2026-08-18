import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    name: 'Mona Patel',
    email: 'mona.patel@example.com',
    role: 'athlete',
    fitnessGoal: 'Build endurance for a spring half marathon',
    age: 31,
  },
  {
    name: 'Diego Ramirez',
    email: 'diego.ramirez@example.com',
    role: 'athlete',
    fitnessGoal: 'Improve strength and mobility',
    age: 28,
  },
  {
    name: 'Avery Chen',
    email: 'avery.chen@example.com',
    role: 'coach',
    fitnessGoal: 'Coach balanced weekly training plans',
    age: 36,
  },
];

const teams = [
  {
    name: 'Trail Blazers',
    coach: 'Avery Chen',
    city: 'Seattle',
    members: ['Mona Patel', 'Diego Ramirez'],
    weeklyGoalMinutes: 420,
  },
  {
    name: 'Core Crushers',
    coach: 'Jordan Lee',
    city: 'Austin',
    members: ['Sam Rivera', 'Priya Shah'],
    weeklyGoalMinutes: 360,
  },
];

const activities = [
  {
    userEmail: 'mona.patel@example.com',
    type: 'Run',
    durationMinutes: 42,
    caloriesBurned: 410,
    completedAt: new Date('2026-08-16T13:30:00.000Z'),
  },
  {
    userEmail: 'diego.ramirez@example.com',
    type: 'Strength Training',
    durationMinutes: 55,
    caloriesBurned: 360,
    completedAt: new Date('2026-08-17T00:15:00.000Z'),
  },
  {
    userEmail: 'avery.chen@example.com',
    type: 'Yoga',
    durationMinutes: 35,
    caloriesBurned: 160,
    completedAt: new Date('2026-08-17T14:00:00.000Z'),
  },
];

const leaderboard = [
  {
    userEmail: 'mona.patel@example.com',
    displayName: 'Mona P.',
    teamName: 'Trail Blazers',
    points: 1280,
    rank: 1,
  },
  {
    userEmail: 'diego.ramirez@example.com',
    displayName: 'Diego R.',
    teamName: 'Trail Blazers',
    points: 1115,
    rank: 2,
  },
  {
    userEmail: 'avery.chen@example.com',
    displayName: 'Coach Avery',
    teamName: 'Trail Blazers',
    points: 980,
    rank: 3,
  },
];

const workouts = [
  {
    title: 'Tempo Run Builder',
    focusArea: 'Endurance',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    exercises: ['Dynamic warmup', 'Tempo intervals', 'Cooldown jog'],
  },
  {
    title: 'Total Body Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 35,
    exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Plank holds'],
  },
  {
    title: 'Recovery Mobility Flow',
    focusArea: 'Mobility',
    difficulty: 'Beginner',
    durationMinutes: 25,
    exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring flossing'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      LeaderboardEntry.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdTeams.length} teams`);
    console.log(`Created ${createdActivities.length} activities`);
    console.log(`Created ${createdLeaderboard.length} leaderboard entries`);
    console.log(`Created ${createdWorkouts.length} workouts`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

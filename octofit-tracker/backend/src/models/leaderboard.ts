import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    displayName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
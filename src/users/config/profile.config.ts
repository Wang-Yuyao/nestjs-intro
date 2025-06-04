import { registerAs } from "@nestjs/config"

export default registerAs('profile.config', () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));

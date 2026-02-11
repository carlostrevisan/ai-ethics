import { Request, Response, NextFunction } from 'express';

const API_SECRET_KEY = process.env.API_SECRET_KEY || 'ai-ethics-secret-2024';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_SECRET_KEY) {
    return res.status(403).json({
      error: 'Forbidden: Invalid or missing API key'
    });
  }

  next();
};

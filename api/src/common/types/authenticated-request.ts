import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
  profile?: {
    id: string;
  };
}

export interface ProfileRequest extends AuthenticatedRequest {
  profile: {
    id: string;
  };
}

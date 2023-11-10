import { createContext } from 'react';
import { DIContainer } from '@infra/di/api';

export const DIContext = createContext<DIContainer|null>(null)
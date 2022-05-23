import { Apps } from './app.model';

import { REPOSITORIES } from './common/constants';

export const AppProvider = [
  {
    provide: REPOSITORIES.APP_REPOSITORY,
    useFactory: () => {
      return Apps;
    },
  },
];

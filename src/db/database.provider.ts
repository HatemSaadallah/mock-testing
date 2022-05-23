import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';
import { Apps } from '../app.model';

import { PROVIDERS, DATABASE_CONFIG } from '../common/constants';

export const databaseProvider = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
        logging: false,
        dialect: 'mysql',
      });
      sequelize.addModels([Apps]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];

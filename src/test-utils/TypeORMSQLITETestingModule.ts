import { TypeOrmModule } from '@nestjs/typeorm';
import { Apps } from '../app.model';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'mysql',
    database: ':memory:',
    dropSchema: true,
    entities: [Apps],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Apps]),
];

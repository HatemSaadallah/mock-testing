import { getConnection } from 'typeorm';
import { Apps } from '../app.model';

export const testDatasetSeed = async () => {
  const connection = await getConnection();
  const entityManager = connection.createEntityManager();

  entityManager.insert<Apps>(Apps, {
    name: 'moa',
    age: 20,
  });
  entityManager.insert<Apps>(Apps, {
    name: 'caracal',
    age: 22,
  });
  entityManager.insert<Apps>(Apps, {
    name: 'rokh',
    age: 24,
  });
};

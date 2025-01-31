import { Laboratory } from '../entities/laboratory.entity';

export interface LaboratoryRepository {
  save(laboratory: Laboratory): Promise<Laboratory>;
}

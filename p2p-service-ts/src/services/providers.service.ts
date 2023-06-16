import { dbService } from '@/database';
import { Provider } from '@/interfaces/providers.interface';

export class ProviderService {
  public saveProvider(
    telegramId: Provider['telegram_id'],
    polygonAddress: Provider['polygon_address'],
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO providers (telegram_id, polygon_address) VALUES (?, ?)';
      dbService.db.run(query, [telegramId, polygonAddress], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
  public getProvider(
    telegramId: Provider['telegram_id'],
  ): Promise<Provider['polygon_address'] | null> {
    return new Promise((resolve, reject) => {
      console.log('test');
      const query = 'SELECT polygon_address FROM providers WHERE telegram_id = ?';
      dbService.db.get(query, [telegramId], (err, row: Provider) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row.polygon_address : null);
        }
      });
    });
  }

  public getProviders(): Promise<Provider[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM providers';
      dbService.db.all(query, [], (err, rows: Provider[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public updateProvider(
    telegramId: Provider['telegram_id'],
    acceptedOrder: Provider['accepted_order'],
  ) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE providers SET accepted_order = ? WHERE telegram_id = ?';
      dbService.db.run(query, [acceptedOrder, telegramId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

import { Notifications } from 'src/domain/notifications/notification';
import { CreateNotificationInput } from 'src/usecases/notifications/dtos/create-notification.input';

export abstract class INotificationRepository {
  abstract create(data: CreateNotificationInput): Promise<Notifications>;
  abstract findAll(): Promise<Notifications[]>;
  abstract findByID(id: string): Promise<Notifications>;
  abstract remove(notification: string): Promise<void>;
}

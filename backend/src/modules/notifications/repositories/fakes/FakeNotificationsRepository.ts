import { ObjectID } from "mongodb";

import ICreateNotificationDTO from "@modules/notifications/dtos/ICreateNotificationDTO";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";

import Notification from "../../infra/typeorm/schemas/Notification";

export default class NotificationsRepository
  implements INotificationsRepository
{
  private notifications: Notification[] = [];

  public async create({
    content,
    // eslint-disable-next-line camelcase
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

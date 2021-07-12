import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from "typeorm";

@Entity("notifications")
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column("uuid")
  // eslint-disable-next-line camelcase
  recipient_id: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default Notification;

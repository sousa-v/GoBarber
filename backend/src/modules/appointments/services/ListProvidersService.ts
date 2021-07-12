import { injectable, inject } from "tsyringe";

import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  // eslint-disable-next-line camelcase
  user_id: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository, // eslint-disable-next-line no-empty-function

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider // eslint-disable-next-line no-empty-function
  ) {}

  // eslint-disable-next-line camelcase
  public async execute({ user_id }: IRequest): Promise<User[]> {
    // eslint-disable-next-line camelcase
    let users = await this.cacheProvider.recover<User[]>(
      // eslint-disable-next-line camelcase
      `providers-list:${user_id}`
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      // eslint-disable-next-line camelcase
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }
    return users;
  }
}

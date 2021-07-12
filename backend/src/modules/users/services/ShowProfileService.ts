import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";

import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  // eslint-disable-next-line camelcase
  user_id: string;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository // eslint-disable-next-line no-empty-function
  ) {}

  // eslint-disable-next-line camelcase
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }
}

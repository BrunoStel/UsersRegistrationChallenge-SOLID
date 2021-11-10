import { validate } from "uuid";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  execute({ user_id }): User[] {
    if (!validate(user_id)) {
      throw new Error("ID is not valid");
    }
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      throw new Error("ID not found");
    }
    const isUserAdmin = user.admin;
    if (isUserAdmin === false) {
      throw new Error("User isn't an ADMIN");
    }
    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };

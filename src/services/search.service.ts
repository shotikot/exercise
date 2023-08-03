import { IUser } from "types";
import { USERS } from "../constants";

export function searchUsers(query: string): Promise<IUser[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(!query) {
        resolve(USERS);
      }
  
      const filteredOptions = USERS.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredOptions);
    }, 500);
  });
}
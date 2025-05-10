import Signup from "./signUp";

export default interface User extends Signup {
  userId: string;
  role: string;
}

import User from "../user/User";
import VacationTemplate from "./VacationTemplate";

export default interface Vacation extends VacationTemplate {
  endDate: string | number | Date;
  vacationId: string;
  imageUrl: string;
  followers: User[];
}

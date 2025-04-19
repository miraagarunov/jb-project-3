import Vacation from "../../models/vacation/Vacation";
import VacationDraft from "../../models/vacation/VacationDraft";
import AuthAware from "./AuthAware";

export default class VacationsService extends AuthAware {
  async getAllVacations(): Promise<Vacation[]> {
    const response = await this.axiosInstance.get<Vacation[]>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations`
    );
    return response.data;
  }

  async getOneVacation(vacationId: string): Promise<Vacation> {
    const response = await this.axiosInstance.get<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`
    );
    return response.data;
  }

  async remove(vacationId: string): Promise<boolean> {
    const response = await this.axiosInstance.delete<boolean>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`
    );
    return response.data;
  }

  async create(draft: VacationDraft): Promise<Vacation> {
    const response = await this.axiosInstance.post<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/`,
      draft,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  // async update(vacationId: string, draft: VacationDraft): Promise<Vacation> {
  //   const response = await this.axiosInstance.patch<Vacation>(
  //     `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`,
  //     draft,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   return response.data;
  // }
  async update(vacationId: string, draft: FormData): Promise<Vacation> {
    const response = await this.axiosInstance.patch<Vacation>(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${vacationId}`,
      draft,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  async getFollowersCSV(): Promise<Blob> {
    const response = await this.axiosInstance.get(
      `${import.meta.env.VITE_REST_SERVER_URL}/vacations/reports/followers`,
      { responseType: "blob" }
    );
    return response.data;
  }
}

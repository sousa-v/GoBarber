import { injectable, inject } from "tsyringe";
import { getDaysInMonth, getDate } from "date-fns";

import IAppointmentsRepository from "../repositories/IAppointmentRepository";

// import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  // eslint-disable-next-line camelcase
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository // eslint-disable-next-line no-empty-function
  ) {}

  // eslint-disable-next-line camelcase
  public async execute({
    // eslint-disable-next-line camelcase
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        provider_id,
        year,
        month,
      });

    const numberOfdaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfdaysInMonth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

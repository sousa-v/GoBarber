import { injectable, inject } from "tsyringe";
import { getHours, isAfter } from "date-fns";

import IAppointmentsRepository from "../repositories/IAppointmentRepository";

// import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  // eslint-disable-next-line camelcase
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
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
    day,
  }: IRequest): Promise<IResponse> {
    const appointments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

import Appointment from "../../infra/typeorm/entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    // eslint-disable-next-line camelcase
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => {
      return (
        // eslint-disable-next-line camelcase
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    // eslint-disable-next-line camelcase
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter((appointment) => {
      return (
        // eslint-disable-next-line camelcase
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async create({
    // eslint-disable-next-line camelcase
    provider_id,
    // eslint-disable-next-line camelcase
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

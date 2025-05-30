// components/ServiceConfiguration.tsx
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { ContratacionData, ServiceConfigData } from "../../types/ContratacionInterfaces/ContratacionInterfaces"; 

interface ServiceConfigurationProps {
  data: ContratacionData;
  config: ServiceConfigData;
  onConfigChange: (config: ServiceConfigData) => void;
}

const ServiceConfiguration: React.FC<ServiceConfigurationProps> = ({
  data,
  config,
  onConfigChange,
}) => {
  // Parsear días disponibles desde el string de availability
  const parseAvailableDays = (availability: string): string[] => {
    const dayMap: { [key: string]: string } = {
      LUNES: "monday",
      MARTES: "tuesday",
      MIERCOLES: "wednesday",
      MIÉRCOLES: "wednesday",
      JUEVES: "thursday",
      VIERNES: "friday",
      SABADO: "saturday",
      SÁBADO: "saturday",
      DOMINGO: "sunday",
    };

    const availableDays: string[] = [];
    const upperAvailability = availability.toUpperCase();

    Object.keys(dayMap).forEach((spanishDay) => {
      if (upperAvailability.includes(spanishDay)) {
        availableDays.push(dayMap[spanishDay]);
      }
    });

    return availableDays;
  };

  // Generar fechas disponibles
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const availableDays = parseAvailableDays(data.availability);

    if (availableDays.length === 0) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }
      return dates;
    }

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      if (availableDays.includes(dayName)) {
        dates.push(date.toISOString().split("T")[0]);
      }

      if (dates.length >= 20) break;
    }

    return dates;
  };

  // Generar opciones de horas
  const getTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateChange = (selectedDate: string) => {
    onConfigChange({ ...config, selectedDate });
  };

  const handleHoursChange = (selectedHours: number) => {
    // Actualizar hora de fin cuando cambian las horas
    const [hours, minutes] = config.startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + selectedHours);

    const endTimeString = `${endDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;

    onConfigChange({ ...config, selectedHours, endTime: endTimeString });
  };

  const handleStartTimeChange = (startTime: string) => {
    // Actualizar hora de fin cuando cambia la hora de inicio
    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + config.selectedHours);

    const endTimeString = `${endDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;

    onConfigChange({ ...config, startTime, endTime: endTimeString });
  };

  const handleMetersChange = (selectedMeters: number) => {
    onConfigChange({ ...config, selectedMeters });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        Configuración del Servicio
      </h4>

      <div className="space-y-4">
        {/* Fecha */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fecha del servicio
          </label>
          <select
            value={config.selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
          >
            <option value="">Selecciona una fecha disponible</option>
            {getAvailableDates().map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>

        {/* Configuración por hora */}
        {data.tipoPrecio === "Por hora" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duración
              </label>
              <select
                value={config.selectedHours}
                onChange={(e) => handleHoursChange(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? "hora" : "horas"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hora inicio
              </label>
              <select
                value={config.startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                {getTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Info del horario */}
        {data.tipoPrecio === "Por hora" && config.startTime && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <div className="text-sm">
                <span className="font-semibold text-indigo-900">
                  {config.startTime} - {config.endTime}
                </span>
                <span className="text-indigo-700 ml-2">
                  ({config.selectedHours}{" "}
                  {config.selectedHours === 1 ? "hora" : "horas"})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Configuración por metro cuadrado */}
        {data.tipoPrecio === "Por metro cuadrado" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Metros cuadrados
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={config.selectedMeters}
              onChange={(e) =>
                handleMetersChange(Number(e.target.value) || 1)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              placeholder="Ingresa los metros cuadrados"
            />
            <p className="text-xs text-gray-600 mt-1">
              Precio por m²: <strong>${data.price}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceConfiguration;
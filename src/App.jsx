import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale"; // Importar el idioma español
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./citas.css";
import emailjs from "emailjs-com"; // Importar EmailJS
import fondoImage from "../public/images/fondo.jpg";
import { useEffect } from "react";

// Registrar el idioma español
registerLocale("es", es);




const ScheduleAppointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date: null,
    time: null,
    service: "",
  });

  useEffect(() => {
    document.title = "Agendar"; // Cambia el título de la pestaña
  }, []);


  

  const availableTimes = [
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
  ];

  const services = [
    "Atención temprana del lenguaje",
    "Evaluación para mi hijo(a)",
    "Intervención del lenguaje",
    "Intervención del habla",
    "Intervención de la comunicación",
    "Revisión de oídos",
  ];

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Deshabilitar domingos y sábados
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (selectedOption) => {
    setFormData({ ...formData, time: selectedOption });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      date: formData.date?.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: formData.time?.label,
      service: formData.service,
    };

    // Enviar el correo a ambos: el cliente y el administrador
    emailjs
      .send("service_anqes48", "template_vphk1yk", emailData, "ocyVjXMiozjmmWDE-")
      .then(
        (response) => {
          alert("¡Cita agendada exitosamente!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            date: null,
            time: null,
            service: "",
          });
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          alert("Hubo un error al agendar la cita. Por favor, intenta de nuevo.");
        }
      );
  };

  return (
    <div className="schedule-container">
      <div className="schedule-content">
        <div className="schedule-form-wrapper">
          <h2 className="schedule-heading">Agendar Hora</h2>
          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="schedule-input-group">
              <label className="schedule-label">Nombre del paciente</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="schedule-input"
                required
              />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Apellidos del paciente</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="schedule-input"
                required
              />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="schedule-input"
                required
              />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Fecha</label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                filterDate={(date) => !isWeekend(date)}
                locale="es" // Configuración del idioma
                placeholderText="Selecciona una fecha"
                dateFormat="dd 'de' MMMM 'de' yyyy" // Formato en español
                className="schedule-input"
                required
              />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Hora</label>
              <Select
                options={availableTimes}
                onChange={handleTimeChange}
                placeholder="Selecciona una hora"
                value={formData.time}
                required
              />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Servicio</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="schedule-input"
                required
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="schedule-button">
              Agendar
            </button>
          </form>
        </div>
        <div className="schedule-image-wrapper">
        <img src={fondoImage} alt="Imagen decorativa" className="schedule-image" />
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointment;

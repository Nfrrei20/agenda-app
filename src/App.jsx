import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./citas.css";
import emailjs from "emailjs-com";
import fondoImage from "../public/images/fondo.jpg";

registerLocale("es", es);

const ScheduleAppointment = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: null,
    time: null,
    service: "",
  });

  useEffect(() => {
    document.title = "Agendar";
  }, []);

  const availableTimes = [
    { value: "09:00", label: "09:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "02:00 PM" },
    { value: "15:00", label: "03:00 PM" },
    { value: "16:00", label: "04:00 PM" },
    { value: "17:00", label: "05:00 PM" },
    { value: "18:00", label: "06:00 PM" },
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
    return day === 0 || day === 6;
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
      phone: formData.phone,
      date: formData.date?.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: formData.time?.label,
      service: formData.service,
    };

    //admin

    emailjs
      .send("service_anqes48", "template_vphk1yk", emailData, "ocyVjXMiozjmmWDE-")
      .then(
        (response) => {
          alert("¡Cita agendada exitosamente!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
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

      //cliente

      emailjs
      .send("service_anqes48", "template_hi3vjps", emailData, "ocyVjXMiozjmmWDE-")
      .then(
        () => {
          alert("¡Cita agendada exitosamente! Revisa tu correo para la confirmación.");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            date: null,
            time: null,
            service: "",
          });
        },
        (error) => {
          console.error("Error al enviar el correo al cliente:", error);
          alert("Hubo un error al agendar la cita. Por favor, intenta de nuevo.");
        }
      );

      


      
  };

  return (
    <div className="schedule-container">
      <div className="schedule-content">
        <div className="schedule-form-wrapper">
          <h2 className="schedule-heading">Agenda Tu Hora</h2>
          <form onSubmit={handleSubmit} className="schedule-form">
          <div className="schedule-input-group">
              <label className="schedule-label">Nombre del paciente</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="schedule-input" placeholder="Ingrese el nombre" required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Apellidos del paciente</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="schedule-input" placeholder="Ingrese los apellidos" required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Correo</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="schedule-input" placeholder="Ingrese su correo" required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Teléfono</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="schedule-input" placeholder="Ingrese su teléfono" required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Fecha</label>
              <DatePicker selected={formData.date} onChange={handleDateChange} filterDate={(date) => !isWeekend(date) && date >= new Date()} locale="es" placeholderText="Selecciona una fecha" dateFormat="dd 'de' MMMM 'de' yyyy" className="schedule-input" required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Hora</label>
              <Select options={availableTimes} onChange={handleTimeChange} placeholder="Selecciona una hora" value={formData.time} className="schedule-input"  styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#fff",
                    color: "#333",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#333",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#fff",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#74b9ff" : "#fff",
                    color: state.isSelected ? "#fff" : "#333",
                  }),
                }} required />
            </div>
            <div className="schedule-input-group">
              <label className="schedule-label">Servicio</label>
              <select name="service" value={formData.service} onChange={handleInputChange} className="schedule-input" required>
                <option value="" disabled>Selecciona un servicio</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="schedule-button">Agendar</button>
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

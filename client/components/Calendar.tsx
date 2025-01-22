"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./calendar-style.css";
import { useRouter } from "next/navigation";

type Event = {
  title: string;
  start: string;
  end: string;
  id: string;
  color: string;
};

type CalendarProps = {
  events: any[];
};

const Calendar = ({ events }: CalendarProps) => {
  const router = useRouter();

  const HandelClick = (id: string) => {
    router.push("/tasks/" + id);
  };

  const handleDateClick = () => {
    router.push("/tasks/add-task");
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events}
      height={"90vh"}
      eventClick={(event) => HandelClick(event.event.id)}
      dateClick={handleDateClick}
      selectable={true}
      nowIndicator={true}
      eventDisplay="block"
      // eventTimeFormat={{
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   hour12: false,
      // }}
      displayEventTime={false}
    />
  );
};

export default Calendar;

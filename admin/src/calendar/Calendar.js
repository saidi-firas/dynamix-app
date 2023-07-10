import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents, reviveCircularReferences);
      setCurrentEvents(parsedEvents);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "calendarEvents",
      JSON.stringify(currentEvents, getCircularReplacer())
    );
  }, [currentEvents]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };
  const handleEventDrop = (dropInfo) => {
    const { event, oldEvent } = dropInfo;
    const updatedEvent = {
      ...event,
      id: oldEvent.id,
      title: event.title, // Update the title

      start: event.startStr,
      end: event.endStr,
    };

    setCurrentEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((ev) =>
        ev.id === oldEvent.id ? updatedEvent : ev
      );
      return updatedEvents;
    });
  };

  const handleDeleteEvent = (eventId) => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  // Function to revive circular references during deserialization
  function reviveCircularReferences(key, value) {
    if (key === "calendar") return FullCalendar.Calendar;
    return value;
  }

  // Function to handle circular references during serialization
  function getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box flex="1 1 20%" p="15px" borderRadius="4px">
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.slice(0, 4).map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "#4fa607",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            events={currentEvents}
            onEventsSet={(events) => console.log("Events set: ", events)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;

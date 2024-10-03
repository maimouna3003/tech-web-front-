import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import the day grid plugin for month view
import { useCurrentUserReducer } from "../../strore/reducer/CurrentUser.reducer";
import { useSignals } from "@preact/signals-react/runtime";
import { getPlanningSeances } from "../../services/CurrentUser.service";

const PlanningPage: React.FC = () => {
  useSignals();
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  const seances = getPlanningSeances(user?.groupes ?? []);

  // Transformer les données plannings en événements pour FullCalendar

  const events = seances.map((planning, index) => ({
    title: planning.nomGroupe,
    start: planning.createdAt,
    extendedProps: { description: "Seance " + planning.seance?.nom },
  }));

  return (
    <Stack spacing={4} sx={{ maxWidth: "1000px", margin: "0 auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Planning
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          minHeight: "500px",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => (
            <div>
              <strong>{eventInfo.event.title}</strong>
              <br />
              <span>{eventInfo.event.extendedProps.description}</span>
            </div>
          )}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
          }}
          locale="fr" // For French localization
        />
      </Paper>
    </Stack>
  );
};

export default PlanningPage;

import React, { useEffect, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react"; // Import FullCalendar
import dayGridPlugin from "@fullcalendar/daygrid"; // Import the day grid plugin for month view
import { useCurrentUserReducer } from "../../strore/reducer/CurrentUser.reducer";
import { useSignals } from "@preact/signals-react/runtime";
import { getPlanningSeances } from "../../services/CurrentUser.service";

interface Planning {
  id: number;
  date: string;
  activity: string;
  description: string;
}

const PlanningPage: React.FC = () => {
  // const [plannings, setPlannings] = useState<Planning[]>([]);
  // const [loading, setLoading] = useState(true);
  useSignals();
  const currentUserReducer = useCurrentUserReducer();
  const user = currentUserReducer.getCurrentUserSignal().value.user;
  const seances = getPlanningSeances(user?.groupes ?? []);
  // Simuler une API qui renvoie des plannings
  // useEffect(() => {
  //   const fetchPlannings = async () => {
  //     setLoading(true);
  //     // Simulation d'un appel API (2s de délai)
  //     setTimeout(() => {
  //       const data = [
  //         {
  //           id: 1,
  //           date: "2024-09-26",
  //           activity: "Réunion d'équipe",
  //           description: "Discussion sur les projets en cours.",
  //         },
  //         {
  //           id: 2,
  //           date: "2024-09-27",
  //           activity: "Formation",
  //           description: "Session de formation sur la sécurité informatique.",
  //         },
  //         {
  //           id: 3,
  //           date: "2024-09-29",
  //           activity: "Préparation de l'événement",
  //           description: "Planification et logistique.",
  //         },
  //       ];
  //       setPlannings(data);
  //       setLoading(false);
  //     }, 2000); // Simule un délai de 2 secondes
  //   };

  //   fetchPlannings();
  // }, []);

  // Transformer les données plannings en événements pour FullCalendar

  console.log(seances.length);
  const events = seances.map((planning, index) => ({
    title: "Seance " + (index + 1),
    start: planning.createdAt,
    extendedProps: { description: planning.groupe?.nom },
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

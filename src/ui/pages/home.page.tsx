import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  LinearProgress,
  Avatar,
} from "@mui/material";
import { CheckCircleOutline, CancelOutlined, Event } from "@mui/icons-material";
import { useCurrentUserReducer } from "../../strore/reducer/CurrentUser.reducer";
import Moment from "react-moment";
import { useSignals } from "@preact/signals-react/runtime";
import {
  getProgressionTermineForTuteur,
  getTotalSeanceForTuteur,
  getTotalSeanceNonTermineForTuteur,
  getTotalSeanceTermineForTuteur,
} from "../../services/CurrentUser.service";

interface DashboardProps {}

const DashboardPage: React.FC<DashboardProps> = () => {
  useSignals();
  const currentUserSignal = useCurrentUserReducer();
  const user = currentUserSignal.getCurrentUserSignal().value.user;
  const nbrSeances = getTotalSeanceForTuteur(user?.groupes ?? []);
  const nbrSeanceTerminé = getTotalSeanceTermineForTuteur(user?.groupes ?? []);
  const nbrSeanceNonTerminé = getTotalSeanceNonTermineForTuteur(
    user?.groupes ?? []
  );
  return (
    <Box sx={{ p: 4, bgcolor: '#F6F8FB' }}>
      {/* Conteneur principal */}
      <Stack direction="row" spacing={4} justifyContent="space-between">
        {/* Colonne de gauche */}
        <Box flex={2} sx={{ p: 3, borderRadius: 2, bgcolor: "#FFFFFF" }}>
          {/* Informations de l'utilisateur */}
          <Typography variant="h4" fontWeight="bold">
            {user?.nom} {user?.prenom}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Date Affectation :
            <Moment format="YYYY/MM/DD">{user?.createdAt}</Moment>
          </Typography>

          {/* Graphique (Placeholder pour les barres) */}
          <Box
            sx={{ mt: 2, height: 100, bgcolor: "lightblue", borderRadius: 2 }}
          >
            {/* Ici, tu pourrais ajouter un graphique avec une librairie comme Recharts ou Chart.js */}
          </Box>

          {/* Nombre total de cours */}
          <Typography sx={{ mt: 2 }} variant="h6">
            Total Seances: {nbrSeances}
          </Typography>

          {/* Cours terminés */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <CheckCircleOutline sx={{ color: "green" }} />
            <Typography>Seances terminés</Typography>
            <Typography fontWeight="bold" sx={{ ml: "auto" }}>
              {nbrSeanceTerminé}
            </Typography>
          </Stack>
          <Typography color="textSecondary" sx={{ ml: 5 }}>
            Nombre d'heures : {nbrSeanceTerminé * 2} h
          </Typography>

          {/* Cours non effectués */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <CancelOutlined sx={{ color: "orange" }} />
            <Typography>Cours non effectués</Typography>
            <Typography fontWeight="bold" sx={{ ml: "auto" }}>
              {nbrSeanceNonTerminé}
            </Typography>
          </Stack>
          <Typography color="textSecondary" sx={{ ml: 5 }}>
            Nombre d'heures : {nbrSeanceNonTerminé * 2} h
          </Typography>

          {/* Planning des cours */}
          <Typography sx={{ mt: 4 }} variant="h6">
            Lundi, 23 Juin 204
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Event />
            <Typography>Projet Opérationnel</Typography>
            <Typography sx={{ ml: "auto" }}>Master IL</Typography>
          </Stack>
          <Typography color="textSecondary" sx={{ ml: 5 }}>
            15h00 - Correction TD
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Event />
            <Typography>Conception Web</Typography>
            <Typography sx={{ ml: "auto" }}>L2 - IDA</Typography>
          </Stack>
          <Typography color="textSecondary" sx={{ ml: 5 }}>
            17h00 - Séquence 3
          </Typography>
        </Box>

        {/* Colonne de droite : Progression et génération de rapport */}
        <Box flex={1} sx={{ p: 3, borderRadius: 2, bgcolor: "#F6F8FB" }}>
          <Typography variant="h6" fontWeight="bold">
            Progression des tutorats
          </Typography>
          {user?.groupes?.length === 0 && (
            <Typography variant="h6">Aucun groupes pour ce tuteur</Typography>
          )}

          {/* Progression des groupes */}
          {user?.groupes?.map((groupe, index) => {
            const valuePourcentage = getProgressionTermineForTuteur(
              groupe.effectues ?? []
            );

            return (
              <Stack key={index} spacing={1} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">{groupe.nom}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={valuePourcentage}
                />
              </Stack>
            );
          })}

          {/* Générer rapport */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 2,
              bgcolor: "white",
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{ bgcolor: "lightgreen", width: 56, height: 56, mx: "auto" }}
            >
              {/* Icône de rapport */}
              <Event />
            </Avatar>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Générer rapport
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              Génération de rapports sur les séances hebdomadaires effectuées
              par module
            </Typography>
            <Button variant="contained" color="primary">
              GÉNÉRER
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;

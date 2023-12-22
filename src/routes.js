import SignIn from "./layouts/authentication/sign-in";
import ReportIcon from '@mui/icons-material/Report';
import Incidents from "./layouts/incidentes"
import NewIncident from "./layouts/incidentes/add";
import EditIncident from "./layouts/incidentes/edit";


const routes = [
  {
    type: "collapse",
    name: "Incidentes",
    key: "incidentes",
    route: "/incidentes",
    icon: ReportIcon,
    access: ["55"],
    component: Incidents,
    noCollapse: true
  },
  {
    route: "/incidentes/nuevo",
    component: NewIncident,
    access: ["55"],
  },
  {
    route: "/incidentes/incidente",
    component: EditIncident,
    access: ["55"],
  },
  {
    route: "/login",
    component: SignIn,
  },
]

export default routes;
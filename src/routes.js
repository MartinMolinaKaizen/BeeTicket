import SignIn from "./layouts/authentication/sign-in";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import Incidents from "./layouts/incidentes"


const routes = [
  {
    type: "collapse",
    name: "Incidentes",
    key: "incidentes",
    route: "/incidentes",
    // icon: EmojiPeopleOutlinedIcon,
    component: Incidents,
    noCollapse: true
  },
  {
    route: "/login",
    component: SignIn,
  },
]

export default routes;
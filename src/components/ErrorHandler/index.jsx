import { useState, useContext } from "react";
import { ApolloProvider, useMutation, gql } from "@apollo/client";

// @mui material components
import Card from "@mui/material/Card";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "components/ErrorHandler/BasicLayout";

// Images
import curved6 from "assets/images/curved-images/curved0.jpg";
import errorIcon from "assets/images/error.svg";
import { MessageManager } from "context";

function SignUp() {
  const [errorMsg, setErrorMsg] = useState("");
  const { handleSnackbar } = useContext(MessageManager);

  // let error = JSON.parse(localStorage.getItem("error"));

  // let errorObj = {
  //   error: error ? error.error : "Error no especificado",
  //   errorInfo: error ? error.errorInfo : {},
  //   descripcion: errorMsg,
  //   idUser: error ? error.idUser : JSON.parse(localStorage.getItem("user")).user.id,
  //   isAuto: false,
  //   data: JSON.parse(localStorage.getItem("user")),
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Acá vas a insertar el error en la base de datos
    // insertError({ variables: { errorLogInput: errorObj } }).then((res) => {
    //   handleSnackbar("Error reportado correctamente, serás redirigido", "success");
    //   localStorage.removeItem("error");
    //   setTimeout(() => {
    //     window.location.href = "/";
    //   }, 3000);
    // }).catch((err) => {
    //   handleSnackbar("Error al reportar el error", "error");
    // });
  };

  return (
    <BasicLayout
      title="Ha ocurrido un error"
      description="Nuestro equipo de soporte está trabajando para solucionarlo"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <img style={{ height: "200px" }} src={errorIcon}></img>
        </SoftBox>
        {/* <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox px={3} mb={1} textAlign="center">
              <SoftTypography variant="h5" fontWeight="medium">
                Agrega una descripción del error
              </SoftTypography>
            </SoftBox>
            <SoftBox my={2}>
              <SoftInput
                variant="outlined"
                name="observaciones"
                placeholder="Describe el problema..."
                multiline
                rows={4}
                value={errorMsg}
                onChange={(e) => setErrorMsg(e.target.value)}
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                disabled={errorMsg.length === 0 || loading}
                onClick={handleSubmit}
              >
                Enviar
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox> */}
      </Card>
    </BasicLayout>
  );
}

export default SignUp;

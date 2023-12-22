import { InputLabel } from "@mui/material"
import SoftTypography from "../../../../../components/SoftTypography"
import SoftInput from "../../../../../components/SoftInput"

function InputDate({ name, inputTitulo = "Default", value = "", onChange = () => { } }) {
  return (
    <>
      <InputLabel htmlFor={name}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          {inputTitulo}
        </SoftTypography>
      </InputLabel>
      <SoftInput
        label={name}
        name={name}
        value={value}
        onChange={onChange}
        type="date"
      />
    </>
  )
}

export default InputDate
import { LocalizationProvider, TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import TextInputSkeleton from "../../display/skeleton/TextInputSkeleton/TextInputSkeleton";

type Props = {
    id: string;
    label?: string | MessageFormatElement[];
    className?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    isLoading?: boolean;
    required?: boolean;
    register?: any;
    errorInstance?: any;
    defaultValue?: string;
    disabled?: boolean;
  };

  
const CustomTimeField = ({
    id,
    label,
    className,
    variant,
    size,
    isLoading = false,
    required = false,
    register,
    errorInstance,
    defaultValue,
    disabled = false,
  }: Props) => {
    return isLoading ? (
      <TextInputSkeleton />
    ) : (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Basic example"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  };
  
  export default CustomTimeField;
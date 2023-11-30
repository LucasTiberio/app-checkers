import Button from "../ui/Button";
import { UserAuthenticationFormType } from "./types";
import axios from "axios";
import useUser from "../../hooks/useUser";
import { StyledForm } from "./styles";
import Input from "../ui/Input";
import { useFormik } from "formik";
import { API_BASE_URL } from "../../utils/constants";

export default function UserAuthenticationForm(props: Record<string, string>) {
    const { handleSubmit, getFieldProps } = useFormik<UserAuthenticationFormType>({
        initialValues: {
            name: "",
        },
        onSubmit: async data => {
            const { name } = data;
            console.log({ data })
    
            try {
                const { data: { data } } = await axios.post(`${API_BASE_URL}/user/login`, {
                    name,
                })
    
                if (data.error) {
                    throw data.error
                }
    
                login(name)
            } catch (error) {
                alert("This nickaname is already in use")
            }
        },
    });

    const { login } = useUser();

    return (
        <StyledForm {...props} onSubmit={handleSubmit}>
            <Input
                placeholder="Insert your nickname"
                {...getFieldProps("name")}
            />
            <Button type="submit" variant="PRIMARY">
                Join ➡️
            </Button>
        </StyledForm>
    )
}
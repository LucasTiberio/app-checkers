import { useState } from "react";
import type { RoomCreatorFormType } from "./form";
import Input from "../ui/Input";
import { useFormik } from "formik";

type Props = {
    onSubmit: (values: RoomCreatorFormType) => void;
    disabled?: boolean;
}

export default function RoomCreatorForm(props: Props) {
    const [withPassword, setWithPassword] = useState(false);
    
    const { getFieldProps, handleSubmit } = useFormik<RoomCreatorFormType>({
        initialValues: {
            roomName: "",
        },
        onSubmit: async data => {
            if (data.roomName) {
                props.onSubmit(data)
            }
        }
    });

    const handleToggleWithPassword = () => setWithPassword(prev => !prev)

    return (
        <form onSubmit={handleSubmit}>
            <h3>Fill those fields to create your room</h3>
            <div>
                <label htmlFor="roomName">Room name:</label>
                <Input type="text" {...getFieldProps("roomName")} />
            </div>

            <div>
                <div>
                    <label htmlFor="withPassword">Protect with password</label>
                    <input type="checkbox" onChange={handleToggleWithPassword} />
                </div>

                {withPassword && (
                    <div>
                        <label htmlFor="roomPassword">Room password:</label>
                        <Input type="text" {...getFieldProps("roomPassword")} />
                    </div>
                )}
            </div>

            <button type="submit" disabled={props.disabled}>Criar</button>
        </form>
    )
}
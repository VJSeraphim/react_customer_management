import React from 'react'
import { TextField, Grid, InputLabel } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({name, label}) => {
    const { control } = useFormContext()
    const isError = false

    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field }) => <TextField {...field} />}
                name={name}
                control={control}
                defaultValue=""
                label={label}
                fullWidth
                required
                error = {isError}
            />
        </Grid>
    )
}

export default FormInput

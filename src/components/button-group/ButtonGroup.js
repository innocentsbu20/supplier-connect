import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ConnectButtonGroup({ onChange }) {

    const [state, setState] = useState({
        activeToggle: 'All Inventory'
    });

    const handleChange = (event, newAlignment) => {
        onChange(newAlignment)
        console.log("newAlignment ", newAlignment)
        setState({
            ...state,
            activeToggle: newAlignment
        });
    };
    const { activeToggle } = state;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    my: 4,
                },
            }}
        >
            <ToggleButtonGroup
                color="standard"
                value={activeToggle}
                exclusive
                style={{ color: 'red' }}
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="All Inventory">All Inventory</ToggleButton>
                <ToggleButton value="mobile">Mobile</ToggleButton>
                <ToggleButton value="tablets">Tablets</ToggleButton>
                <ToggleButton value="laptops">Laptops</ToggleButton>
                <ToggleButton value="computers">Desktop Computers</ToggleButton>
            </ToggleButtonGroup>
        </Box >
    );
}

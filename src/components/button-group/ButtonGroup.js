import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import useProductStore from '../../store/ProductStore';
import _ from 'lodash';

export default function ConnectButtonGroup({ onChange }) {

    const [activeToggle, setActiveToggle] = useState(0);

    const catetegories = useProductStore(state => state.getCategories())

    const handleChange = (event) => {

        const index = _.parseInt(event.target.value);
        setActiveToggle(index);
        onChange(index);
    };

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
                <ToggleButton key={0} value={0}>All Inventory</ToggleButton>
                {
                    catetegories.map(category => <ToggleButton key={category.categoryId} value={category.categoryId}>{category.name}</ToggleButton>)
                }
            </ToggleButtonGroup>
        </Box >
    );
}

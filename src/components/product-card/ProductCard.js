import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import sumsungDevice from '../../assets/images/Samsung Galaxy Z Fold 5 512GB Smartphone - Phantom Black + Samsung 25W Charger.jpg';
import { useProductStore } from '../../store/Index';
import { Box } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ProductViewCard({ item }) {

    const [state, setState] = useState({
        ...item,
        expanded: false,
    });

    const handleExpandClick = () => {
        setState({
            ...state,
            expanded: !state.expanded
        });
    };

    const { addToPromo, removeFromPromo } = useProductStore((state) => state);
    const handleAddToPromo = () => {
        if (!state.isSpecial) {
            const promoProduct = {
                ...state,
                isSpecial: true
            };
            setState(promoProduct);
            addToPromo(promoProduct);
        }
    }
    const handleRemoveFromPromo = () => {
        if (state.isSpecial) {
            const productToBeRomoved = {
                ...state,
                isSpecial: false
            };
            setState(productToBeRomoved);
            removeFromPromo(productToBeRomoved);
        }
    }
    const {
        index,
        name,
        published,
        price,
        picture,
        description,
        expanded,
        isSpecial

    } = state;
    console.log("state", state)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                sx={{
                    display: 'flex',
                    minHeight: '60px',
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500], fontSize: 12 }} aria-label="badge">
                        {isSpecial ? '15%' : index + 1}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                style={{
                    display: '-webkit-inline-flex',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    minHeight: 60,
                    WebkitLineClamp: 3,
                }}
                title={name}
                subheader={published}
            />
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                width: "100%"
            }}>
                <CardMedia
                    component="img"
                    height="194"
                    style={{
                        objectFit: "contain"
                    }}
                    image={picture}
                    alt="Device"
                />
            </Box>

            <CardContent sx={{ minHeight: 55 }}>
                <Typography

                    sx={{
                        textDecoration: isSpecial ? 'line-through' : 'none',
                        fontSize: 20,
                        color: 'green',
                        fontWeight: 'bold',
                    }} variant="body2" color="text.secondary">
                    {`R${price}`}
                </Typography>
                {
                    isSpecial &&
                    <Typography

                        sx={{
                            fontSize: 20,
                            color: 'red',
                            fontWeight: 'bold',
                        }} variant="body2" color="text.secondary">
                        {`R${(price - (price * 0.15).toFixed(2))}`}
                    </Typography>
                }
            </CardContent>
            <CardActions disableSpacing>
                <IconButton component="button" onClick={handleAddToPromo} aria-label="add to favorites">
                    <FavoriteIcon color={isSpecial ? 'error' : 'inherit'} />
                </IconButton>
                <IconButton component="button" onClick={handleRemoveFromPromo} aria-label="delete from favorites">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>About Product:</Typography>
                    <Typography paragraph>
                        {description}

                    </Typography>
                    <Typography paragraph>
                        Pro-grade camera capabilities with unique FlexCam, Galaxy Z series delivers great foldable experiences
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

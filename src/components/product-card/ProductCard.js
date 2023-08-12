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

    const [state, setState] = useState(item);
    const {
        index = 0,
        name = "Samsung Galaxy Z Fold 5 512GB Smartphoner",
        published = "2014-02-06T04:40:25 -02:00",
        about = "Samsung Galaxy Z Flip5 and Galaxy Z Fold5: Delivering Flexibility and Versatility Without Compromise",
        description = "With an innovative form factor enhanced by new Flex Hinge for a balanced design.",
        expanded = false
    } = state
    const handleExpandClick = () => {
        console.log("expanded ", expanded)
        setState({
            ...state,
            expanded: !state.expanded
        });
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                sx={{
                    display: 'flex',
                    minHeight: '60px',
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {index + 1}
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
            <CardMedia
                component="img"
                height="194"
                image={sumsungDevice}
                alt="Device"
            />
            <CardContent>
                <Typography sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }} variant="body2" color="text.secondary">
                    {about}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="delete">
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

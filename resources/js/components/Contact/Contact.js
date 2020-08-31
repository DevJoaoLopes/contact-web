import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import { Container, Title, IconHeader, TextHeader,Button } from "./styles";
import Logo from "../logo.png";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    }
}));

function Contact() {
    const DATA = [
        {
            id: 1,
            name: "Joao da Silva",
            email: "joao@joao",
            phones: [
                {
                    number: "11111111",
                    type: "residencial"
                },
                {
                    number: "11111111",
                    type: "celular"
                }
            ]
        },
        {
            id: 2,
            name: "Maria Menezes",
            email: "maria@maria",
            phones: [
                {
                    number: "22222222",
                    type: "residencial"
                },
                {
                    number: "23232323",
                    type: "celular"
                }
            ]
        }
    ];

    const classes = useStyles();

    return (
        <Container>
            <Title>
                <TextHeader>Contatos</TextHeader>
            </Title>

            <List className={classes.root}>
                {DATA.map(value => (
                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <IconHeader src={Logo} alt="Logo" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.name}
                                secondary={
                                    <React.Fragment>
                                        {value.email}
                                        <br />
                                        {value.phones.map(phone => (
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {`${phone.type}: ${phone.number}`}
                                                </Typography>
                                                <br />
                                            </>
                                        ))}
                                        <br />
                                        <Button onClick={() => console.log('clicou')}>Editar</Button>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))}
            </List>
        </Container>
    );
}

export default Contact;

if (document.getElementById("contact")) {
    ReactDOM.render(<Contact />, document.getElementById("contact"));
}

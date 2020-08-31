import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import {
    Container,
    Title,
    IconHeader,
    TextHeader,
    Button,
    ButtonAdd,
    Form,
    ViewForm
} from "./styles";
import Logo from "../logo.png";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: "white"
    },
    inline: {
        display: "inline"
    }
});

function Contact() {
    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [face, setFace] = React.useState("");
    const [linkedin, setLinkedin] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [type, setType] = React.useState("Residencial");
    const [name, setName] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
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

    console.log(type);
    return (
        <Container>
            <Title>
                <TextHeader>Contatos</TextHeader>
                <ButtonAdd onClick={() => setShowForm(true)}>Adicionar</ButtonAdd>
            </Title>
            {showForm && (
                <ViewForm>
                    <Form>
                        {error && <p>{error}</p>}
                        <input
                            type="nome"
                            placeholder="Nome"
                            onChange={ev => setName(ev.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Endereço de e-mail"
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        <input
                            type="face"
                            placeholder="Link do facebook"
                            onChange={ev => setFace(ev.target.value)}
                        />
                        <input
                            type="linkedin"
                            placeholder="Link do linkedin"
                            onChange={ev => setLinkedin(ev.target.value)}
                        />
                        <div>
                            <input
                                style={{ height: "16px" }}
                                type="text"
                                placeholder="Numero"
                                onChange={ev => setNumber(ev.target.value)}
                            />
                            <select
                                style={{
                                    color: "#999",
                                    border: "1px solid #ddd",
                                    height: "38px",
                                    marginLeft: "35px"
                                }}
                                onChange={ev => setType(ev.target.value)}
                                value={type}
                            >
                                <option value="Residencial">Residencial</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Celular">Celular</option>
                            </select>
                        </div>
                        <button>Salvar</button>
                        <br />
                        <button onClick={() => setShowForm(true)}>Cancelar</button>
                    </Form>
                </ViewForm>
            )}
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
                                        <Button
                                            onClick={() =>
                                                console.log("clicou")
                                            }
                                        >
                                            Editar
                                        </Button>
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

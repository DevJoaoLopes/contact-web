import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { api } from "../services";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import InputPhone from "./InputPhone";

import {
    Container,
    Title,
    IconHeader,
    TextHeader,
    Button,
    ButtonAdd,
    ButtonCancel,
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
    const classes = useStyles();

    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [face, setFace] = React.useState("");
    const [linkedin, setLinkedin] = React.useState("");
    const [phones, setPhones] = React.useState([{ number: "", type: "" }]);
    const [name, setName] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
    const [transactions, setTransactions] = React.useState([]);

    // get data api
    React.useEffect(() => {
        try {
            api.get("/api/contacts").then(({ data }) => {
                setTransactions([...data.data]);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const changeNumber = (e, ind) => {
        const newPhones = phones.map((phone, i) => {
            if (i === ind) {
                phone.number = e;
                return phone;
            }
            return phone;
        });
        setPhones(newPhones);
    };

    const changeType = (e, ind) => {
        const newPhones = phones.map((phone, i) => {
            if (i === ind) {
                phone.type = e;
                return phone;
            }
            return phone;
        });
        setPhones(newPhones);
    };

    const removePhone = i => {
        const newPhones = phones.filter((_, ind) => i !== ind);
        setPhones(newPhones);
    };

    return (
        <Container>
            <Title>
                <TextHeader>Contatos</TextHeader>
                {showForm ? (
                    <ButtonCancel onClick={() => setShowForm(false)}>
                        Cancelar
                    </ButtonCancel>
                ) : (
                    <ButtonAdd onClick={() => setShowForm(true)}>
                        Adicionar
                    </ButtonAdd>
                )}
            </Title>
            {showForm && (
                <ViewForm>
                    <Form>
                        {error && <p>{error}</p>}
                        <input
                            type="nome"
                            placeholder="Nome"
                            onChange={ev => setName(ev.target.value)}
                            value={name}
                        />
                        <input
                            type="email"
                            placeholder="Endereço de e-mail"
                            onChange={ev => setEmail(ev.target.value)}
                            value={email}
                        />
                        <input
                            type="face"
                            placeholder="Link do facebook"
                            onChange={ev => setFace(ev.target.value)}
                            value={face}
                        />
                        <input
                            type="linkedin"
                            placeholder="Link do linkedin"
                            onChange={ev => setLinkedin(ev.target.value)}
                            value={linkedin}
                        />

                        {phones.map((value, i) => (
                            <InputPhone
                                onNumber={ev =>
                                    changeNumber(ev.target.value, i)
                                }
                                onType={ev => changeType(ev.target.value, i)}
                                valueType={value.type}
                                valueNumber={value.number}
                                onAddIcon={() =>
                                    setPhones([
                                        ...phones,
                                        { number: "", type: "" }
                                    ])
                                }
                                onRemoveIcon={() => removePhone(i)}
                            />
                        ))}

                        <button>Salvar</button>
                    </Form>
                </ViewForm>
            )}
            <List className={classes.root}>
                {transactions.map(value => (
                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <IconHeader src={Logo} alt="Logo" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.contact.name}
                                secondary={
                                    <React.Fragment>
                                        {value.contact.email}
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
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row"
                                            }}
                                        >
                                            {value.contact.face && (
                                                <a href={value.contact.face}>
                                                    <FacebookIcon />
                                                </a>
                                            )}

                                            {value.contact.linkedin && (
                                                <a
                                                    href={
                                                        value.contact.linkedin
                                                    }
                                                >
                                                    <LinkedInIcon />
                                                </a>
                                            )}
                                        </div>
                                        <br />
                                        <Button
                                            onClick={() =>
                                                console.log("clicou")
                                            }
                                            style={{ cursor: "pointer" }}
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

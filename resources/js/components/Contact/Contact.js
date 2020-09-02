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
import DeleteIcon from "@material-ui/icons/Delete";
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

    const styleIcon = {
        color: "#999",
        marginLeft: "10px",
        cursor: "pointer"
    };

    const [error, setError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [id, setId] = React.useState("");
    const [removePhones, setRemovePhones] = React.useState([]);
    const [face, setFace] = React.useState("");
    const [linkedin, setLinkedin] = React.useState("");
    const [phones, setPhones] = React.useState([
        { id: "", number: "", type: "Residencial" }
    ]);
    const [name, setName] = React.useState("");
    const [showForm, setShowForm] = React.useState(false);
    const [showFormEdit, setShowFormEdit] = React.useState(false);
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

    const changeNumber = (e, index) => {
        const newPhones = phones.map((phone, i) => {
            if (i === index) {
                phone.number = e;
                return phone;
            }
            return phone;
        });
        setPhones(newPhones);
    };

    const changeType = (e, index) => {
        const newPhones = phones.map((phone, i) => {
            if (i === index) {
                phone.type = e;
                return phone;
            }
            return phone;
        });
        setPhones(newPhones);
    };

    const removePhone = (i, removes) => {
        const newPhones = phones.filter((_, index) => i !== index);
        setPhones(newPhones);
        if (removes != "") setRemovePhones([...removePhones, removes]);
    };

    const handleAddContact = async event => {
        event.preventDefault();
        if (!email || !name) {
            setError("Preencha nome e e-mail para continuar!");
        } else {
            try {
                const response = await api.post("/api/contacts", {
                    name,
                    email,
                    face,
                    linkedin
                });
                if (response.status == 200) {
                    if (phones[0].number) {
                        phones.forEach(async element => {
                            await api.post("/api/phones", {
                                number: element.number,
                                type: element.type,
                                contact_id: response.data.id
                            });
                        });
                    }
                    api.post("/api/mail", {
                        email,
                        name
                    })
                        .then(res => {
                            if (res.status == 200) {
                                window.location.reload(false);
                            } else {
                                setError(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError("Erro !!");
            }
        }
    };

    const handleDelete = async id => {
        await api
            .post("/api/delete/contact", {
                id
            })
            .then(res => {
                if (res.status == 200) {
                    window.location.reload(false);
                } else {
                    console.log(res.data.error);
                }
            });
    };

    const handleEdit = index => {
        const data = transactions[index];
        setId(data.contact.id);
        setEmail(data.contact.email);
        setName(data.contact.name);
        setFace(data.contact.face);
        setLinkedin(data.contact.linkedin);
        setPhones([...data.phones]);
        setShowFormEdit(true);
    };

    const handleUpdateContact = async event => {
        event.preventDefault();
        if (!email || !name) {
            setError("Preencha nome e e-mail para continuar!");
        } else {
            try {
                const response = await api.put("/api/edit/contact", {
                    id,
                    name,
                    email,
                    face,
                    linkedin
                });
                if (response.status == 200) {
                    if (phones[0].number) {
                        phones.forEach(async element => {
                            if (element.id != "") {
                                await api.put("/api/edit/phone", {
                                    id: element.id,
                                    number: element.number,
                                    type: element.type,
                                    contact_id: id
                                });
                            } else {
                                await api.post("/api/phones", {
                                    number: element.number,
                                    type: element.type,
                                    contact_id: id
                                });
                            }
                        });

                        removePhones.forEach(async element => {
                            await api.post("/api/delete/phone", {
                                id: element
                            });
                        });
                    }
                    window.location.reload(false);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError("Erro !!");
            }
        }
    };

    const onCancel = () => {
        //reset and hide form
        setEmail("");
        setName("");
        setFace("");
        setLinkedin("");
        setPhones([{ id: "", number: "", type: "Residencial" }]);
        setShowForm(false);
        setShowFormEdit(false);
    };

    return (
        <Container>
            <Title>
                <TextHeader>Contatos</TextHeader>
                {showForm || showFormEdit ? (
                    <ButtonCancel onClick={onCancel}>Cancelar</ButtonCancel>
                ) : (
                    <ButtonAdd onClick={() => setShowForm(true)}>
                        Adicionar
                    </ButtonAdd>
                )}
            </Title>
            {showForm && (
                <ViewForm>
                    <Form onSubmit={handleAddContact}>
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
                            placeholder="Ex: https://pt-br.facebook.com"
                            onChange={ev => setFace(ev.target.value)}
                            value={face}
                        />
                        <input
                            type="linkedin"
                            placeholder="Ex: https://www.linkedin.com"
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
                                        {
                                            id: "",
                                            number: "",
                                            type: "Residencial"
                                        }
                                    ])
                                }
                                onRemoveIcon={() => removePhone(i)}
                            />
                        ))}

                        <button type="submit">Salvar</button>
                    </Form>
                </ViewForm>
            )}

            {showFormEdit && (
                <ViewForm>
                    <Form onSubmit={handleUpdateContact}>
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
                            placeholder="Ex: https://pt-br.facebook.com"
                            onChange={ev => setFace(ev.target.value)}
                            value={face}
                        />
                        <input
                            type="linkedin"
                            placeholder="Ex: https://www.linkedin.com"
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
                                        {
                                            id: "",
                                            number: "",
                                            type: "Residencial"
                                        }
                                    ])
                                }
                                onRemoveIcon={() => removePhone(i, value.id)}
                            />
                        ))}

                        <button type="submit">Salvar</button>
                    </Form>
                </ViewForm>
            )}
            <List className={classes.root}>
                {transactions.map((value, i) => (
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
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Button
                                                onClick={() => handleEdit(i)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Editar
                                            </Button>
                                            <DeleteIcon
                                                style={styleIcon}
                                                onClick={() =>
                                                    handleDelete(
                                                        value.contact.id
                                                    )
                                                }
                                            />
                                        </div>
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

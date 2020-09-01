import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function InputPhone({
    onNumber = () => {},
    onType = () => {},
    valueType,
    onAddIcon = () => {},
    onRemoveIcon = () => {}
}) {
    const styleIcon = {
        color: "#999",
        margin: "5px",
        cursor: "pointer"
    };
    return (
        <div>
            <input
                style={{ height: "16px" }}
                type="text"
                placeholder="Numero"
                onChange={onNumber}
            />
            <select
                style={{
                    color: "#999",
                    border: "1px solid #ddd",
                    height: "38px",
                    marginLeft: "35px"
                }}
                onChange={onType}
                value={valueType}
            >
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Celular">Celular</option>
            </select>
            <span onClick={onAddIcon}>
                <AddCircleIcon style={styleIcon} />
            </span>
            <span onClick={onRemoveIcon}>
                <RemoveCircleIcon style={styleIcon} />
            </span>
        </div>
    );
}

export default InputPhone;

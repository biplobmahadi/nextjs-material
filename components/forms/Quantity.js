import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function Quantity({ quantity, setQuantity }) {
    const addHandler = () => {
        setQuantity((prevState) => prevState + 1);
    };
    const removeHandler = () => {
        setQuantity((prevState) => prevState - 1);
    };

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={removeHandler} disabled={quantity < 2}>
                <RemoveIcon />
            </Button>
            <Button>{quantity}</Button>
            <Button onClick={addHandler}>
                <AddIcon />
            </Button>
        </ButtonGroup>
    );
}

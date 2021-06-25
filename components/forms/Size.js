import Chip from "@material-ui/core/Chip";

export default function Size({ size, setSize, productSize }) {
    const gotSize = productSize.size;
    const handleSelect = () => {
        setSize(gotSize);
    };

    return (
        <span style={{ paddingRight: "5px" }}>
            <Chip
                label={gotSize}
                onClick={handleSelect}
                variant={size === gotSize ? "default" : "outlined"}
                color={size === gotSize ? "primary" : "default"}
            />
        </span>
    );
}

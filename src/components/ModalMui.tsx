import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from "../context/LanguageContext";

const style = {
    position: 'absolute',
    top: '50%',
    background: "linear-gradient(180deg, #1A4381 -96.34%, #FFF 99.92%)",
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',
        sm: 800,
    },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.5)',
    p: {
        xs: 2,
        sm: 4,
    },
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { language, componentsTranslations } = useLanguage();

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    color: "#000000",
                    padding: "8px 18px",
                    border: "1px solid #ffff",
                    backgroundColor: "#ffff"
                }}
            >
                {componentsTranslations.modalMui.btnLabel[language]}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(15px)',
                        },
                    },
                }}
            >
                <Box sx={style}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.700',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: "300" }} component="h2">
                        {componentsTranslations.modalMui.description[language][0]}
                        <br /> <br />
                        {componentsTranslations.modalMui.description[language][1]}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}




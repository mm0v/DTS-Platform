import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from "../context/LanguageContext";

// Original style with animation properties added
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: {
        xs: '90%',
        sm: 800,
    },
    bgcolor: 'background.paper',
    background: "linear-gradient(180deg, #1A4381 -96.34%, #FFF 99.92%)",
    borderRadius: 2,
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.5)',
    p: {
        xs: 2,
        sm: 4,
    },
    transition: 'transform .6s cubic-bezier(0.16, 1, 0.3, 1)',
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [animationState, setAnimationState] = React.useState('initial');
    const { language, componentsTranslations } = useLanguage();

    // Function to determine the current transform based on animation state
    const getTransformValue = () => {
        switch (animationState) {
            case 'entering':
            case 'entered':
                return 'translate(-50%, -50%)';
            case 'exiting':
            case 'initial':
            default:
                return 'translate(-50%, 100vh)';
        }
    };

    const handleOpen = () => {
        // First set initial position and open the modal
        setAnimationState('initial');
        setOpen(true);

        // After a small delay, trigger the enter animation
        setTimeout(() => {
            setAnimationState('entering');
        }, 50);
    };

    const handleClose = () => {
        // First trigger the exit animation
        setAnimationState('exiting');

        // After animation completes, actually close the modal
        setTimeout(() => {
            setOpen(false);
            // Reset animation state
            setAnimationState('initial');
        }, 400);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    width: '100%', // match w-full
                    '@media (min-width: 640px)': {
                        width: 'auto', // match sm:w-auto
                    },
                    padding: '8px 24px', // match px-6 py-2
                    border: '1px solid #ffffff',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    borderRadius: '4px', // match Tailwind's `rounded`
                    textAlign: 'center', // match text-center
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#e2e8f0', // optional: hover effect similar to Tailwind's hover:bg-blue-600
                    },
                }}

            >
                {componentsTranslations.modalMui.btnLabel[language]}
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{
                    backdrop: Backdrop
                }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: { backdropFilter: 'blur(15px)' }
                    }
                }}
            >
                <Box
                    sx={{
                        ...modalStyle,
                        transform: getTransformValue()
                    }}
                >
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
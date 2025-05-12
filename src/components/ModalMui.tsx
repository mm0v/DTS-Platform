import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from "../context/LanguageContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Enhanced modal style with better mobile responsiveness
const getModalStyle = (isMobile: boolean) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: isMobile ? '95%' : 1000,
    maxHeight: isMobile ? '80vh' : '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    background: "linear-gradient(180deg, #1A4381 -96.34%, #FFF 99.92%)",
    borderRadius: isMobile ? 8 : 12,
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.5)',
    p: isMobile ? 3 : 6,
    transition: 'transform .6s cubic-bezier(0.16, 1, 0.3, 1)',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '6px',
    },
});

export default function ResponsiveModal() {
    const [open, setOpen] = React.useState(false);
    const [animationState, setAnimationState] = React.useState('initial');
    const { language, componentsTranslations } = useLanguage();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Determine transform value based on animation state and device
    const getTransformValue = () => {
        switch (animationState) {
            case 'entering':
            case 'entered':
                return 'translate(-50%, -50%)';
            case 'exiting':
                return isMobile ? 'translate(-50%, 100vh)' : 'translate(-50%, 100vh)';
            case 'initial':
            default:
                return 'translate(-50%, 100vh)';
        }
    };

    const handleOpen = () => {
        setAnimationState('initial');
        setOpen(true);

        // Small delay to ensure the modal is rendered before animating
        setTimeout(() => {
            setAnimationState('entering');
        }, 50);
    };

    const handleClose = () => {
        setAnimationState('exiting');

        // Adjust animation duration based on device
        setTimeout(() => {
            setOpen(false);
            setAnimationState('initial');
        }, isMobile ? 300 : 400);
    };

    // Handle swipe down to close on mobile
    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchEnd - touchStart;
        const isDownSwipe = distance > minSwipeDistance;
        if (isDownSwipe && isMobile) {
            handleClose();
        }
        setTouchStart(null);
        setTouchEnd(null);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                sx={{
                    width: '100%',
                    '@media (min-width: 640px)': {
                        width: 'auto',
                    },
                    padding: isMobile ? '6px 16px' : '8px 24px',
                    border: '1px solid #ffffff',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    borderRadius: '4px',
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: '#e2e8f0',
                    },
                    fontSize: isMobile ? '0.875rem' : '1rem',
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
                        ...getModalStyle(isMobile),
                        transform: getTransformValue()
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Mobile indicator for swipe down */}
                    {isMobile && (
                        <Box
                            sx={{
                                width: '40px',
                                height: '4px',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderRadius: '2px',
                                margin: '0 auto 16px auto',
                            }}
                        />
                    )}

                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: isMobile ? 8 : 12,
                            right: isMobile ? 8 : 20,
                            color: 'grey.700',
                            padding: isMobile ? '4px' : '8px',
                        }}
                        aria-label="close"
                    >
                        <CloseIcon fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>

                    <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        sx={{
                            fontWeight: "300",
                            mt: isMobile ? 2 : 0,
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            lineHeight: isMobile ? 1.4 : 1.6,
                        }}
                        component="h2"
                    >
                        {componentsTranslations.modalMui.description[language][0]}
                        <br /> <br />
                        {componentsTranslations.modalMui.description[language][1]}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
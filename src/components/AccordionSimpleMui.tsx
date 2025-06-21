import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLanguage } from "../context/LanguageContext";

export default function AccordionExpandDefault() {
    const { language, componentsTranslations } = useLanguage();
    const page = componentsTranslations.accordionSimpleMui;

    return (
        <div >
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    style={{ color: "#1A4381" }}
                    id="panel1-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q1[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a1[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q2[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a2[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q3[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a3[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>
                        {page.questions.q4[language][0]} <br />
                        {page.questions.q4[language][1]}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        <ul>
                            <li>{page.answers.a4[language].item1}</li>
                            <br />
                            <li>{page.answers.a4[language].item2}</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q5[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a5[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q6[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a6[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q7[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a7[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q9[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a9[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q10[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a10[language].intro}
                        <br />
                        <ul>
                            <li>{page.answers.a10[language].items[0]}</li>
                            <br />
                            <li>{page.answers.a10[language].items[1]}</li>
                            <br />
                            <li>{page.answers.a10[language].items[2]}</li>
                            <br />
                            <li>{page.answers.a10[language].items[3]}</li>
                            <br />
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>{page.questions.q11[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px" }}>
                        {page.answers.a11[language]}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionExpandDefault() {
    return (
        <div>
            <Accordion  defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    style={{ color: "#1A4381" }}
                    id="panel1-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>1. Şirkətimin proqrama uyğun olub olmadığını nə zaman öyrənəcəm?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Müraciətinizi təqdim etdikdən sonra bir ay ərzində uyğunluqla bağlı bildiriş alacaqsınız. Uyğunluğun yoxlanılması şirkətinizin ölçüsü, fəaliyyət sahəsi və rəqəmsal hazırlıq səviyyəsi kimi meyarlara əsaslanan qiymətləndirməni əhatə edir.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>2. Şirkətimin prioritet iştirakçı kimi seçildiyini nə zaman öyrənəcəm?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Əgər şirkətiniz proqramda iştirak üçün prioritet sırada müəyyənləşdirilərsə, 4SİM tərəfindən sizinlə əlaqə saxlanılacaqdır. Bu müddət ərzində rəqəmsal transformasiya yol xəritəsinin hazırlanması və proqram üzrə hazırlıq proseslərinin ətraflı şəkildə müzakirə olunması təmin ediləcək.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>3. 4SİM şirkətlərə Sahibkarlığın İnkişaf Fondu (SİF)-dən maliyyələşmə əldə etməkdə necə kömək edir?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Bu proses boyunca 4SİM şirkətlərə hərtərəfli dəstək göstərəcəkdir. Müraciət prosesinin ilk mərhələsində SİF-ə təqdim edilməli olan sənədlərin toplanması və sistemləşdirilməsində sizə metodoloji və texniki dəstək göstərəcəkdir. Eyni zamanda, müraciət prosesinin səmərəli şəkildə həyata keçirilməsi məqsədilə şirkətinizlə SİF rəsmiləri arasında koordinasiyanı təmin edəcək və kommunikasiya prosesini asanlaşdıracaqdır. Həmçinin, maliyyələşmə imkanlarının düzgün müəyyənləşdirilməsi və müraciətinizin SİF-in tələblərinə və qiymətləndirmə meyarlarına uyğunluğunun təmin olunması üçün 4SİM-in mütəxəssisləri tərəfindən məsləhət xidməti təqdim olunacaqdır.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>4. Şirkətim proqramdan hansı növ maliyyə dəstəyi alacaq?
                        <br /> “Sənaye 4.0 Hazırlıq” Proqramı 2 sahədə maliyyə dəstəyi təmin edir:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        <ul>
                            <li>Qiymətləndirmə və yol xəritəsinin hazırlanması: Şirkətlərə rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi və fərdi rəqəmsal transformasiya yol xəritəsinin hazırlanması tərəfindən maliyyələşdiriləcəkdir.</li>
                            <br />
                            <li>İcra mərhələsi üzrə dəstək: Proqramda iştirak edən şirkətlər, transformasiya planlarının icrasını dəstəkləmək məqsədilə SİF-dən aşağı faizli kreditlərə müraciət etmək hüququna malikdirlər. Bu maliyyə vəsaiti, texnologiyaların tətbiqi, infrastrukturun modernləşdirilməsi və əlaqəli təşəbbüslərin xərclərinin qarşılanmasına yönəldilir</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>5.   Maliyyə vəsaitinin ayrılması prosesi nə qədər zaman alır?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Maliyyə vəsaitinin əldə edilməsi müddəti transformasiya planının mürəkkəbliyindən, eləcə də SİF tərəfindən həyata keçirilən təsdiqləmə prosesinin müddətindən asılı olaraq dəyişə bilər. Orta hesabla, ilkin müraciətin təqdim olunmasından yekun təsdiq və vəsaitin ayrılmasına qədər olan mərhələ 1-3 ay müddətində tamamlanır.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>6. Müraciət portalı daim açıq qalacaq?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Bəli, müraciət portalı daimi olaraq açıq qalacaq. Bu, il ərzində şirkətlərin fasiləsiz şəkildə dəstəklənməsi məqsədi daşıyan davamlı bir proqramdır. Siz istənilən vaxt müraciət edə və uyğun olan prioritet dövrlərdən birinə qoşulmaq imkanı əldə edə bilərsiniz
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>7. Şirkət seçilmədiyi təqdirdə, yenidən müraciət etmək mümkündürmü?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Bəli, əgər şirkətiniz cari seçim dövründə seçilməzsə, gələcək dövrlərdə yenidən müraciət edə bilərsiniz. Əslində, biz şirkətləri seçim prosesi zamanı müəyyən edilmiş boşluqları aradan qaldırdıqdan və rəqəmsal hazırlıq səviyyələrinin yüksəldikdən sonra təkrar müraciət etməyə təşviq edirik.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>8. Şirkətimizin rəqəmsal transformasiya prosesinə hazır olub-olmadığını necə bilə bilərik?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Proqram çərçivəsindən biz mövcud rəqəmsal imkanları qiymətləndirmək məqsədilə Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsini həyata keçirəcəyik. Bu qiymətləndirmə prosesi, şirkətinizin güclü və inkişaf etdirilməli sahələrini müəyyən etməyə, eləcə də ehtiyaclarınıza uyğun fərdi transformasiya yol xəritəsi hazırlamağa imkan verəcək
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>9. Proqram çərçivəsində hansı növ təlim və bacarıqların artırılması dəstəyi təklif edilir?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        “Sənaye 4.0 Hazırlıq” Proqramı, komandanızın əsas rəqəmsal bacarıqlarını formalaşdırmaq və gücləndirmək məqsədilə təlim seminarları, praktiki sessiyalar, eləcə də onlayn resursları əhatə edir. Təlim proqramına həm ümumi rəqəmsal savadlılıq, həm də bulud texnologiyaları, süni intellekt, avtomatlaşdırma və kibertəhlükəsizlik kimi ixtisaslaşmış sahələr üzrə bilik və bacarıqları inkişaf etdirməyə yönəlmiş xüsusi mövzular daxil edilmişdir. Bu yanaşma komandanızın rəqəmsal transformasiya prosesində fəal şəkildə iştirakını və davamlı inkişafını təmin etməyə xidmət edir.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>10. Proqram çərçivəsində maliyyə dəstəyi hansı fəaliyyətləri əhatə edir və istifadəyə dair hər hansı məhdudiyyət varmı?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Proqram çərçivəsində təqdim olunan maliyyə dəstəyi, xüsusilə rəqəmsal transformasiya ilə bağlı fəaliyyətlərin maliyyələşdirilməsinə yönəlib. Bu fəaliyyətlərə aşağıdakılar daxildir:
                        <br />
                        <ul>
                            <li>Rəqəmsal qiymətləndirmələrin aparılması</li>
                            <br />
                            <li>Transformasiya yol xəritələrinin hazırlanması</li>
                            <br />
                            <li>Müvafiq texnologiyaların tətbiqi və mənimsənilməsi</li>
                            <br />
                            <li>İcra ilə bağlı xərclər (məsələn, avadanlıq, proqram təminatı və infrastrukturun təkmilləşdirilməsi)</li>
                            <br />
                        </ul>
                        Bu əhatə dairəsindən kənar hər hansı digər məqsəd üçün maliyyə vəsaitindən istifadə etmək istənildikdə, 4SİM-in əvvəlcədən razılığı tələb olunur.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className='mt-4 mb-4'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    style={{ color: "#1A4381" }}
                    id="panel2-header"
                >
                    <Typography component="span" style={{ fontWeight: "500" }}>11. Proqramda iştirak etmək beynəlxalq miqyasda rəqabət qabiliyyətimizi artırmağa kömək edəcəkmi?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontSize: "14px"}}>
                        Bəli, rəqəmsal transformasiyanın mənimsənilməsi şirkətinizə qlobal bazarlarda rəqabət üstünlüyü qazanmaq imkanı yaradır. Proqramın əsas məqsədi əməliyyat səmərəliliyinin artırılması, innovasiyaların təşviqi və biznesin miqyaslanma qabiliyyətinin gücləndirilməsidir. Bu yanaşma, şirkətinizin həm yerli, həm də beynəlxalq səviyyədə daha dayanıqlı və uğurlu fəaliyyət göstərməsinə zəmin yaradacaq.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

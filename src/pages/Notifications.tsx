import CloseIcon from '@mui/icons-material/Close';

const Notification = () => {
    const notifications = [
        { id: 1, img: "img", title: "Yeni şirkət müraciəti", date: "01.03.2023" },
        { id: 2, img: "img", title: "Yeni şirkət müraciəti", date: "01.03.2023" },
    ]
    return (
        <div>
            <h1 className='font-[600] text-[20px]'>Bildirişlər</h1>
            {notifications.map((item) => (
                <div key={item.id} className="flex items-center w-full md:w-[612px] border-b border-[#DDDDDD] py-[20px] px-4 mt-10 justify-between">
                    <div className="flex items-center gap-5">
                        <img
                            src={item.img}
                            alt="profile-pic"
                            className="w-[48px] h-[48px] bg-[#1A4381] rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <span className='text-[#717171] text-[13px]'>{item.date}</span>
                        </div>
                    </div>
                    <button className="text-end cursor-pointer"><CloseIcon /></button>
                </div>

            ))}
        </div>
    )
}

export default Notification
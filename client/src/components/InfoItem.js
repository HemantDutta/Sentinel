export const InfoItem = ({ data }) => {
    return (
        <div className={`info-item ${data.specialClass} relative p-5 rounded-lg flex flex-col h-full w-full overflow-hidden`}>
            <div className="card-glow absolute rounded-full z-10" />
            <img src={data.cardIconSrc} alt={data.title} className="card-icon absolute -top-5 -right-5 z-20" />
            <span className="title text-white bit-font text-4xl relative z-40">{data.title}</span>
            {
                data.error &&
                <span className="details text-gray-400">{data.error}</span>
            }
            {
                !data.error &&
                <>
                    <span className="details text-gray-400 relative z-40">{data.text}</span>
                    <div className="bullet-grid mt-4 relative z-40">
                        {
                            data.title !== "Connected Devices" &&
                            Object.entries(data.bulletData).map((value, index) => {
                                return (
                                    <div key={index} className="bullet-item text-white flex items-center gap-x-2">
                                        <i className={value[1].icon} />
                                        <span className="bullet-text">{value[1].value}</span>
                                    </div>
                                )
                            })
                        }
                        {
                            data.title === "Connected Devices" &&
                            data.bulletData.map((value, index) => {
                                return (
                                    <div key={index} className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-circle-nodes"/>
                                        <span className="bullet-text">{value.kind}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </div>
    )
}
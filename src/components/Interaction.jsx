import './styles/Interaction.css'

const Interaction = () => {
    const interactions = [
        {
            username: "Mark Zuckerberg",
            profileImage: "https://ik.imagekit.io/eoeykxtr4/mark.jpg",
            action: "menyukai foto anda",
            isRead: false, 
        },
        {
            username: "Elon Musk",
            profileImage: "https://ik.imagekit.io/eoeykxtr4/elon.jpg",
            action: "mengomentari postingan anda",
            isRead: true, 
        },
        {
            username: "Sundar Pichai",
            profileImage: "https://ik.imagekit.io/eoeykxtr4/sundar.jpg",
            action: "membagikan postingan anda",
            isRead: false, 
        },
    ];

    return (
        <div className="text-white">
            {interactions.map((interaction, index) => (
                
                <div
                    key={index}
                    className={`notification-row flex items-center justify-between p-2 ${
                        interaction.isRead ?'notification-read' : 'notification-is-not-read' 
                    }`}
                >
                    <div className='flex items-center p-3'>
                        {/* Foto Profil */}
                        <img
                            className="w-10 h-10 rounded-full"
                            src={interaction.profileImage}
                            alt={`${interaction.username} profile`}
                        />

                        {/* Pesan Interaksi */}
                        <p className="ml-4 text-gray-200">
                            <span className="font-semibold">{interaction.username}</span> {interaction.action}
                        </p>
                    </div>


                    <div className='flex justify-end text-right'>
                        {/* Penanda dibaca atau tidak */}
                        {!interaction.isRead && (
                            <div className="w-2 h-2 bg-red-500 rounded-full text-right" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Interaction;

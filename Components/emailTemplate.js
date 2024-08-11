const EmailTemplate = ({ name, url, type }) => {
    return (
        <div className="bg-gray-100 m-0 p-0">
            <div className="max-w-2xl mx-auto bg-white rounded-t-xl overflow-hidden p-5">
                <div className="py-6"></div>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-t-xl overflow-hidden p-5">
                <div className="py-6"></div>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-5">
                <div className="text-left p-6">
                    <div className="mb-6">
                        <img
                            src="https://53ef744a55.imgdist.com/pub/bfra/t0m9adtm/1vb/vxd/64z/Screenshot%202024-05-10%20at%203.20.47%20PM.png"
                            alt="Logo"
                            width={141}
                            height={141}
                            className="mx-auto"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-left text-gray-800">
                        Hi {name}
                    </h1>
                    <div className="mt-6 text-left text-gray-600 text-lg">
                        <p>Please click start registration to be added {type}</p>
                        <p>Regards,</p>
                        <p>Students Scoops Teams</p>
                    </div>
                    <div className="py-6"></div>
                    <div className="text-left mb-4">
                        <a
                            href={url}
                            className="bg-yellow-600 mb-3 text-white font-medium py-3 px-10 rounded-lg inline-block text-lg"
                        >
                            Start Registration
                        </a>
                    </div>
                    <div className="py-10"></div>
                </div>
            </div>

            <div className="max-w-2xl mt-2 mx-auto bg-white overflow-hidden">
                <img
                    src="https://53ef744a55.imgdist.com/pub/bfra/t0m9adtm/csk/lz4/vvs/emailsent.jpg"
                    alt="Email Sent"
                    width={680}
                    height={680}
                    className="w-full"
                />
            </div>

            <div className="max-w-2xl mx-auto mt-2 bg-white justify-center rounded-b-xl overflow-hidden p-5">
                <div className="flex justify-center space-x-4">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/facebook@2x.png" width="32" height="32" alt="Facebook" />
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/twitter@2x.png" width="32" height="32" alt="Twitter" />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/linkedin@2x.png" width="32" height="32" alt="LinkedIn" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/instagram@2x.png" width="32" height="32" alt="Instagram" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplate;

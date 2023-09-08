import { AiFillProfile } from 'react-icons/ai';
const wadaProfile = [
    {
        id: 1,
        title: ' नागरिक वडा पत्र ',
        link: '',
        icon : <AiFillProfile/>,
        item: [
            {
                list: 'सेवा/सुविधा ',
                link: '/wadaProfile/sewa'
            },
        {
            list : "व्यापार/व्यवसाय उद्योग",
            link : "/wadaProfile/business"
        },
        {
            list : "कर/कानून ",
            link : "/wadaProfile/tax"
        },
        {
            list : "घर /जग्गा /बाटो ",
            link : "/wadaProfile/gharJagga"
        },
        {
            list :"पंजीकरण ",
            link : "/wadaProfile/panjikaran"
        },
        {
            list : "बसोबास/बसाई सराई ",
            link : "/wadaProfile/basobas"
        }
           
            
        ],
    },
]
export default wadaProfile;
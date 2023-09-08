import { HiIdentification } from "react-icons/hi";
const identityProof = [
    {
        id: 1,
        title: 'व्यक्तिगत परिचयपत्र',
        link: '',
        icon: <HiIdentification/>,

        item: [
            {
                list: 'अपाङ्गता',
                link: '/identityProof/disabled'
            },
            {
                list: 'जेष्ठ नागरिक',
                link: '/identityProof/seniorCitizen'

            },
        ],
    },
]
export default identityProof;
import { GiThorHammer } from 'react-icons/gi';
const legalCase = [
    {
        id: 1,
        title: 'कानुनी मुद्दा',
        link: '',
        icon : <GiThorHammer/>,
        item: [
            {
                list: 'दर्ता',
                link: '/legalcase/darta'
            },
            {
                list: 'चलानी',
                link: '/legalcase/chalani'
                
            },
            {
                list: 'सबै पत्रहरु',

                link: '/legalcase/allpatra'
            },
            {
                list: 'सबै दर्ता पत्रहरु',
                link: '/legalcase/alldarta'
            },
        ],
    },
]
export default legalCase;
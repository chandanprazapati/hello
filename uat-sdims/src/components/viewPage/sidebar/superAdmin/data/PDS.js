import { SiGooglesheets } from 'react-icons/si';
const  pds = [
    {
        id: 1,
        title:'PDS',
        link: '',
        icon: <SiGooglesheets/>,
        item: [
            {
                list: 'दर्ता',
                link: '/pds/darta'
            },
            {
                list: 'चलानी',
                link: '/pds/chalani'

            },
            {
                list: 'सबै पत्रहरु',
                link: '/pds/allPatra'
            },
            {
                list: 'सबै दर्ता पत्रहरु',
                link: '/pds/allDarta'
            },
            {
                list: 'सबै चलानी पत्रहरु',
                link: '/pds/allChalani'
            },
            // {
            //     list: "किशान सूचीकरण  ",
            //     link: "http://kishan-profile.meropalika.com/login",
            //   },
        ],
    },

    

]
export default pds;
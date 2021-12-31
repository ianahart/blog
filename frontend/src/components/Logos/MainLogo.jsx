import { Box, Icon } from '@chakra-ui/react';

const MainLogo = ({ height, width, color }) => {
  return (
    <Box
      backgroundColor="blue.primary"
      borderRadius="50%"
      height={height}
      width={width}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center">
      <Icon
        fill={color}
        width={width}
        height={height}
        color={color}
        version="1.1"
        viewBox="0 0 700 700"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink">
      <g>
        <path d="m522.38 210.88c23.625-48.125 27.125-89.25 7-109.38s-61.25-16.625-109.38 7c-18.375-45.5-42.875-73.5-70-73.5s-50.75 26.25-68.25 70c-44.625-20.125-82.25-22.75-102.38-3.5s-16.625 59.5 5.25 106.75c-49 17.5-79.625 42.875-79.625 71.75s29.75 53.375 77 70.875c-19.25 43.75-21 80.5-1.75 99.75 10.5 9.625 23.625 14.875 37.625 14 21-0.875 42-6.125 61.25-15.75 17.5 47.25 42.875 77 70.875 77s54.25-30.625 71.75-80.5c21 11.375 44.625 17.5 69.125 19.25 14 0.875 28-4.375 37.625-13.125 19.25-20.125 16.625-56.875-3.5-102.38 42.875-17.5 70-41.125 70-68.25s-28-52.5-72.625-70zm-32.375-105.88c9.625-0.875 19.25 2.625 26.25 8.75 14.875 14.875 10.5 48.125-10.5 91.875-21.875-7-43.75-11.375-65.625-14.875-3.5-22.75-7.875-44.625-14.875-65.625 19.25-12.25 42-18.375 64.75-20.125zm-61.25 175c0 11.375 0 22.75-0.875 33.25-5.25 6.125-11.375 12.25-17.5 18.375-9.625 9.625-18.375 18.375-28 26.25-10.5 0.875-21 0.875-32.375 0.875h-23.625c-9.625-8.75-18.375-17.5-28-26.25s-18.375-19.25-26.25-28c-0.875-8.75-0.875-16.625-0.875-24.5 0-11.375 0-21.875 0.875-32.375 7.875-9.625 16.625-18.375 26.25-28 6.125-6.125 12.25-12.25 18.375-17.5 10.5-0.875 21.875-0.875 33.25-0.875 14.875 0 28.875 0.875 42.875 1.75 6.125 5.25 11.375 11.375 17.5 16.625s11.375 11.375 16.625 17.5c0.875 14 1.75 28 1.75 42.875zm-6.125-72.625c-0.875-0.875-1.75-0.875-1.75-1.75h3.5v3.5c-0.875-0.875-0.875-1.75-1.75-1.75zm-21.875-21.875c-10.5-9.625-21-18.375-31.5-27.125 13.125-9.625 26.25-18.375 41.125-26.25 5.25 18.375 9.625 36.75 12.25 55.125-7.875 0-14.875-0.875-21.875-1.75zm-28.875-1.75h-21.875-13.125c6.125-5.25 11.375-9.625 17.5-14 6.125 4.375 11.375 9.625 17.5 14zm-63 0.875c-10.5 0.875-21 1.75-30.625 2.625 3.5-20.125 7.875-40.25 14-59.5 16.625 8.75 33.25 19.25 48.125 30.625l-31.5 26.25zm-20.125 19.25-3.5 2.625-11.375 12.25c0-4.375 0.875-8.75 1.75-14zm-34.125 36.75c-6.125 7-12.25 14-17.5 21-9.625-14-19.25-28-27.125-42.875 15.75-4.375 31.5-7.875 48.125-10.5-1.75 10.5-2.625 21-3.5 32.375zm-0.875 28v11.375 2.625l-5.25-7c1.75-2.625 3.5-4.375 5.25-7zm0.875 42c0.875 14 1.75 28 3.5 42-17.5-2.625-35-6.125-51.625-11.375 9.625-17.5 20.125-34.125 31.5-50.75 5.25 6.125 10.5 13.125 16.625 20.125zm18.375 20.125 12.25 13.125c4.375 4.375 8.75 8.75 13.125 12.25-7.875-0.875-15.75-1.75-23.625-2.625 0-7-0.875-14-1.75-22.75zm46.375 44.625c7 6.125 13.125 11.375 20.125 16.625-15.75 11.375-33.25 22.75-50.75 31.5-5.25-17.5-8.75-34.125-11.375-51.625 14 1.75 28 2.625 42 3.5zm28 0.875h13.125l-7 5.25zm42-0.875c11.375-0.875 21.875-1.75 32.375-2.625-2.625 15.75-6.125 32.375-10.5 48.125-14.875-7.875-28.875-17.5-42.875-28 7-6.125 14-12.25 21-17.5zm21-19.25 12.25-11.375 2.625-3.5c0 4.375-0.875 8.75-1.75 13.125zm34.125-35c9.625-10.5 18.375-21 26.25-30.625 11.375 15.75 21.875 31.5 30.625 48.125-19.25 6.125-39.375 10.5-59.5 14 1.75-10.5 2.625-21 2.625-31.5zm1.75-28v-13.125-21.875c5.25 6.125 9.625 12.25 14.875 17.5-5.25 6.125-10.5 11.375-14.875 17.5zm-1.75-63c-0.875-7-1.75-14.875-2.625-21.875 18.375 2.625 36.75 7 55.125 12.25-7.875 14-16.625 28-26.25 41.125-7.875-10.5-16.625-21-26.25-31.5zm-94.5-177.62c19.25 0 39.375 22.75 54.25 63-17.5 9.625-34.125 20.125-49.875 32.375-18.375-13.125-36.75-25.375-56.875-35.875 14.875-37.625 34.125-59.5 52.5-59.5zm-157.5 61.25c14-14 44.625-11.375 84 7-7 22.75-13.125 46.375-15.75 70-19.25 2.625-39.375 7-58.625 12.25-20.125-42-23.625-75.25-9.625-89.25zm-70 166.25c0-20.125 26.25-41.125 70.875-56.875 9.625 18.375 21 35.875 33.25 52.5-14 18.375-26.25 38.5-37.625 59.5-42-14.875-66.5-35-66.5-55.125zm70 157.5c-13.125-13.125-11.375-42.875 6.125-81.375 20.125 6.125 41.125 10.5 62.125 14 3.5 21 7.875 42 14 62.125-39.375 16.625-69.125 18.375-82.25 5.25zm157.5 70c-20.125 0-40.25-24.5-55.125-66.5 21-10.5 41.125-23.625 59.5-37.625 16.625 12.25 34.125 23.625 52.5 33.25-15.75 44.625-36.75 70.875-56.875 70.875zm166.25-70c-14 14-47.25 10.5-89.25-9.625 5.25-19.25 9.625-38.5 12.25-58.625 23.625-3.5 47.25-8.75 70-15.75 18.375 39.375 21 70.875 7 84zm1.75-105c-10.5-20.125-22.75-38.5-35.875-56.875 11.375-15.75 22.75-32.375 32.375-49.875 40.25 14.875 63 35 63 54.25s-21.875 37.625-59.5 52.5z"/>
        <use x="70" y="691.25" xlinkHref="#o"/>
        <use x="102.109375" y="691.25" xlinkHref="#c"/>
        <use x="123.683594" y="691.25" xlinkHref="#b"/>
        <use x="153.355469" y="691.25" xlinkHref="#a"/>
        <use x="182.878906" y="691.25" xlinkHref="#i"/>
        <use x="203.792969" y="691.25" xlinkHref="#b"/>
        <use x="233.464844" y="691.25" xlinkHref="#h"/>
        <use x="280.011719" y="691.25" xlinkHref="#g"/>
        <use x="311.328125" y="691.25" xlinkHref="#f"/>
        <use x="355.078125" y="691.25" xlinkHref="#e"/>
        <use x="386.589844" y="691.25" xlinkHref="#a"/>
        <use x="416.113281" y="691.25" xlinkHref="#d"/>
        <use x="447.257812" y="691.25" xlinkHref="#c"/>
        <use x="468.835938" y="691.25" xlinkHref="#d"/>
        <use x="499.980469" y="691.25" xlinkHref="#n"/>
        <use x="541.253906" y="691.25" xlinkHref="#m"/>
        <use x="557.53125" y="691.25" xlinkHref="#l"/>
        <use x="583.464844" y="691.25" xlinkHref="#k"/>
        <use x="613.519531" y="691.25" xlinkHref="#j"/>
      </g>
      </Icon>
    </Box>
  );
}
export default MainLogo;

/* eslint-disable max-len */
import React from 'react';

interface LogoSVGProps {
  className?: string;
};

const LogoSVG = ({ ...props }: LogoSVGProps) => {
  return (
    <svg { ...props } width="119" height="144" viewBox="0 0 119 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 34C10 20.7452 20.7452 10 34 10H85C98.2548 10 109 20.7452 109 34V85C109 98.2548 98.2548 109 85 109H34C20.7452 109 10 98.2548 10 85V34Z" fill="white"/>
      <path d="M97 58.5C97 64.299 80.2107 69 59.5 69C38.7893 69 22 64.299 22 58.5C22 52.701 38.7893 48 59.5 48C80.2107 48 97 52.701 97 58.5Z" fill="black"/>
      <path d="M38.7892 133H34.1485V119.909H38.8275C40.1443 119.909 41.2778 120.171 42.2281 120.695C43.1784 121.215 43.9092 121.963 44.4205 122.939C44.9362 123.915 45.194 125.082 45.194 126.442C45.194 127.805 44.9362 128.977 44.4205 129.957C43.9092 130.938 43.1741 131.69 42.2153 132.214C41.2607 132.738 40.1187 133 38.7892 133ZM36.9163 130.629H38.6741C39.4923 130.629 40.1805 130.484 40.7387 130.194C41.3012 129.9 41.7231 129.446 42.0043 128.832C42.2899 128.214 42.4326 127.418 42.4326 126.442C42.4326 125.474 42.2899 124.684 42.0043 124.07C41.7231 123.457 41.3034 123.005 40.7451 122.715C40.1869 122.425 39.4987 122.281 38.6805 122.281H36.9163V130.629Z" fill="white"/>
      <path d="M63.4401 126.455C63.4401 127.882 63.1695 129.097 62.6283 130.098C62.0914 131.099 61.3584 131.864 60.4294 132.393C59.5047 132.917 58.4649 133.179 57.3101 133.179C56.1468 133.179 55.1027 132.915 54.178 132.386C53.2533 131.858 52.5225 131.093 51.9855 130.092C51.4486 129.09 51.1801 127.878 51.1801 126.455C51.1801 125.027 51.4486 123.813 51.9855 122.811C52.5225 121.81 53.2533 121.047 54.178 120.523C55.1027 119.994 56.1468 119.73 57.3101 119.73C58.4649 119.73 59.5047 119.994 60.4294 120.523C61.3584 121.047 62.0914 121.81 62.6283 122.811C63.1695 123.813 63.4401 125.027 63.4401 126.455ZM60.634 126.455C60.634 125.53 60.4955 124.75 60.2185 124.115C59.9458 123.48 59.5601 122.999 59.0615 122.67C58.5629 122.342 57.9791 122.178 57.3101 122.178C56.6411 122.178 56.0573 122.342 55.5587 122.67C55.0601 122.999 54.6723 123.48 54.3953 124.115C54.1226 124.75 53.9862 125.53 53.9862 126.455C53.9862 127.379 54.1226 128.159 54.3953 128.794C54.6723 129.429 55.0601 129.911 55.5587 130.239C56.0573 130.567 56.6411 130.731 57.3101 130.731C57.9791 130.731 58.5629 130.567 59.0615 130.239C59.5601 129.911 59.9458 129.429 60.2185 128.794C60.4955 128.159 60.634 127.379 60.634 126.455Z" fill="white"/>
      <path d="M69.6563 119.909H73.0697L76.6748 128.705H76.8282L80.4333 119.909H83.8467V133H81.162V124.479H81.0534L77.6656 132.936H75.8374L72.4497 124.447H72.341V133H69.6563V119.909Z" fill="white"/>
    </svg>

  );
};

export default LogoSVG;
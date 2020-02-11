import React from 'react';

function Smoothie(props) {
  return (
    <div className='smoothie-image'>
      <svg className='cup-top' width='178' height='260' viewBox='0 0 178 260'>
        <ellipse cx='89' cy='18' fill='#F9FAF7' fillRule='evenodd' stroke='#EC6356' rx='88.5' ry='17.5'/>
      </svg>
      <svg className='smoothie-base' width='152' height='168' viewBox='0 0 152 168'>
        <title>smoothie</title>
        <path fill={props.color} fillRule='evenodd' d='M76 0c41.974 0 76 8.73 76 19.5 0 .501-.074.998-.219 1.49l-6.784 122.554a9 9 0 0 1-3.382 6.545C126.612 162.03 104.907 168 76.5 168c-28.43 0-50.147-5.98-65.151-17.94a9 9 0 0 1-3.373-6.471L.259 21.12A5.282 5.282 0 0 1 0 19.5C0 8.73 34.026 0 76 0z'/>
      </svg>
      <svg className='smoothie-shading' width='144' height='148' viewBox='0 0 144 148'>
        <path opacity='0.05' fill='#000000' fillRule='evenodd' d='M144 0l-7.018 120.354a11.395 11.395 0 0 1-.153 2.614l-.114 1.919a5 5 0 0 1-.865 2.532c-1.818 2.657-4.52 5.12-8.104 7.388C116.188 142.707 94.813 148 69.438 148 31.088 148 0 135.912 0 121s31.089-27 69.438-27c13.958 0 26.705 1.601 37.274 4.357l4.923-82.923c10.266-2.29 17.972-4.673 23.117-7.148C139.898 5.81 142.98 3.049 144 0z'/>
      </svg>
      <svg width='178' height='260' viewBox='0 0 178 260'>
        <path fill='none' fillRule='evenodd' stroke='#EC6356' d='M177.465 19.5l-14.322 211.392a9.468 9.468 0 0 1-1.116 3.87c-1.93 6.977-10.686 13.016-23.68 17.371-12.976 4.35-30.214 6.992-49.347 6.992-19.133 0-36.37-2.642-49.348-6.991-12.993-4.355-21.75-10.394-23.638-17.265-.669-1.268-1.063-2.579-1.157-3.977L.535 19.5h176.93z'/>
      </svg>
    </div>
   );
}

export default Smoothie;
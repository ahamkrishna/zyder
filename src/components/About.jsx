import React from 'react'


function About() {
  return (
    <div className='w-full h-full'>
      <div className="about-section w-full min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center gap-8 font-sans p-8 text-center">
        <div className="logo w-32 h-5">
            <svg width="150" height="40" viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="zyderNavGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#0EA5E9"/>
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="transparent"/>

                <text
                    x="0"
                    y="55"
                    fill="url(#zyderNavGradient)"
                    fontSize="60"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    fontWeight="600"
                    letterSpacing="1"
                >
                    Zyder
                </text>
            </svg>
        </div>
        <div className="description max-w-3xl text-lg md:text-xl font-sans">
            Leading Last Mile Delivery operations platform that eliminates manual payout errors and ensures 100% transparency in COD collections. From automated agent management to real-time tracking, we make Last Mile Delivery operations seamless across India.
        </div>
        <div className="social icons flex gap-6 justify-center items-center mt-8">
            <div className="icon ">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                </svg>
            </div>

            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path>
                </svg>
            </div>
            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
                    viewBox="0 0 800 800">
                <g id="_x31_3">
                    <g>
                        <g>
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="582.4734" y1="565.3093" x2="209.6897" y2="227.5917">
                                <stop  offset="0" stopColor="#FEC053"/>
                                <stop  offset="0.3273" stopColor="#F2203E"/>
                                <stop  offset="0.6485" stopColor="#B729A8"/>
                                <stop  offset="1" stopColor="#5342D6"/>
                            </linearGradient>
                            <path fillRule="evenodd" clipRule="evenodd" fill="url(#SVGID_1_)" d="M218.459,127.608h363.085
                                c49.938,0,90.848,40.904,90.848,90.848v363.088c0,49.942-40.909,90.848-90.848,90.848H218.459
                                c-49.947,0-90.851-40.906-90.851-90.848V218.456C127.608,168.512,168.512,127.608,218.459,127.608L218.459,127.608z"/>
                        </g>
                        <g>
                            <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M526.769,400.003c0-70.027-56.743-126.77-126.769-126.77
                                c-70.027,0-126.767,56.743-126.767,126.77c0,70.023,56.74,126.767,126.767,126.767
                                C470.026,526.769,526.769,470.026,526.769,400.003L526.769,400.003z M524.369,256.005c-11.316,0-20.399,9.172-20.399,20.399
                                c0,11.316,9.083,20.402,20.399,20.402c11.229,0,20.398-9.086,20.398-20.402C544.768,265.177,535.599,256.005,524.369,256.005
                                L524.369,256.005z M296.376,226.693h207.25c38.401,0,69.684,31.37,69.684,69.681v207.249c0,38.401-31.282,69.69-69.684,69.69
                                h-207.25c-38.314,0-69.686-31.288-69.686-69.69V296.374C226.69,258.063,258.063,226.693,296.376,226.693L296.376,226.693z
                                M503.626,203.463h-207.25c-51.087,0-92.913,41.826-92.913,92.91v207.249c0,51.174,41.826,92.916,92.913,92.916h207.25
                                c51.171,0,92.91-41.742,92.91-92.916V296.374C596.536,245.289,554.797,203.463,503.626,203.463L503.626,203.463z
                                M299.545,400.003c0-55.459,44.999-100.458,100.455-100.458s100.455,44.999,100.455,100.458
                                c0,55.456-44.999,100.449-100.455,100.449S299.545,455.459,299.545,400.003L299.545,400.003z"/>
                        </g>
                    </g>
                </g>
                <g id="Layer_1">
                </g>
                </svg>


            </div>
        </div>
      </div>
    </div>
  )
}

export default About

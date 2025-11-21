import React, { useEffect, useRef, useState } from 'react';

const Card = ({ icon, title, description, contactInfo, responseTime, type }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(contactInfo).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="fade-in-delay w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
                {icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-500 mt-2">{description}</p>
            <div className="mt-4 w-full">
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <span className="text-gray-700 font-mono text-sm">{contactInfo}</span>
                    <button 
                        onClick={handleCopy}
                        className="ml-4 px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{responseTime}</p>
        </div>
    );
};

const Contact = () => {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-gray-50 flex justify-center items-center font-sans p-8">
            <div className="w-full max-w-5xl flex flex-col items-center gap-6 text-center">

                <h2 className="fade-in text-base font-semibold text-blue-600 tracking-wider uppercase">Zyder</h2>
                <h3 className="fade-in text-4xl md:text-5xl font-bold text-gray-900">Contact Support</h3>

                <p className="fade-in text-lg text-gray-600 max-w-2xl">
                    Need help with your Daily operations? Our expert team is here to help you optimize delivery management with dedicated application support.
                </p>

                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
                    <Card
                        icon={
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        title="Email Support"
                        description="Get detailed responses within 4 hours"
                        contactInfo="support@zyder.in"
                        responseTime="Response: 4 hours"
                        type="email"
                    />
                    <Card
                        icon={
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        }
                        title="Phone Support"
                        description="Speak with our experts directly"
                        contactInfo="+91 8639862034"
                        responseTime="Response: Immediate"
                        type="phone"
                    />
                </div>
            </div>
        </div>
    );
}

export default Contact;
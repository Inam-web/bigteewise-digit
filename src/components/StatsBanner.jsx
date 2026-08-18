import React from 'react';

export const StatsBanner = () => {
  const stats = [
    { value: '150+', label: 'Book & Brand Launches' },
    { value: '2000+', label: 'Happy Clients & Readers' },
    { value: '99%', label: 'Customer Satisfaction' },
    { value: '8+', label: 'Years Experience in UK' },
  ];

  return (
    <div className="bg-[#0F172A] py-12 text-white border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-500 tracking-tight">
                {item.value}
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
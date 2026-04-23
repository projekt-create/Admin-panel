import React from 'react';

const About = () => {
  const team = [
    { name: 'John Doe', role: 'CEO & Founder', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Alice Johnson', role: 'Head of Products', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Bob Williams', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Carol White', role: 'Customer Success', avatar: 'https://i.pravatar.cc/150?img=4' },
  ];

  const values = [
    { icon: '🌟', title: 'Quality First', desc: 'We source only the best products from trusted suppliers worldwide.' },
    { icon: '🚀', title: 'Fast Delivery', desc: 'Lightning-fast shipping so you get your products when you need them.' },
    { icon: '💚', title: 'Sustainability', desc: 'Eco-friendly packaging and carbon-neutral shipping options.' },
    { icon: '🤝', title: 'Customer Care', desc: '24/7 support team ready to help you with any questions.' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            About <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">ShopMaster</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2020, ShopMaster has grown from a small local shop to a nationwide e-commerce platform, serving over 10,000 happy customers every day.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-3">Our Values</h2>
          <p className="text-gray-400 text-center mb-10">What makes us different</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500/50 transition-colors text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">{v.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-16 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['2020', 'Founded'], ['10K+', 'Customers'], ['500+', 'Products'], ['50+', 'Brands']].map(([val, label]) => (
              <div key={label}>
                <p className="text-4xl font-extrabold">{val}</p>
                <p className="text-indigo-100 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-3">Meet the Team</h2>
          <p className="text-gray-400 text-center mb-10">The people behind ShopMaster</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 text-center hover:border-orange-500/50 transition-colors">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-orange-400" />
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-orange-400 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

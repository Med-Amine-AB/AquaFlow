import React from 'react';

const Test = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Smart Water Leak Detection and Prevention System</h1>
          <p className="text-xl mb-8">
            An affordable, intelligent solution to monitor water usage, detect leaks, and prevent wastage in real-time.
          </p>
          <button className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Real-Time Monitoring</h3>
              <p className="text-gray-700">
                A single sensor at the main water inlet collects data on water flow and consumption patterns.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Anomaly Detection</h3>
              <p className="text-gray-700">
                Machine learning algorithms analyze real-time data to detect leaks or accidental overuse.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Automatic Shutoff</h3>
              <p className="text-gray-700">
                Automatically shuts off the water supply if a leak is detected and no action is taken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose Our Solution?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Cost-Effective</h3>
              <p className="text-gray-700">
                Our system uses a single sensor, making it 90% cheaper than traditional multi-sensor systems.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Easy Installation</h3>
              <p className="text-gray-700">
                Plug-and-play compatibility with existing plumbing—no need to replace pipes or faucets.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">AI-Powered Accuracy</h3>
              <p className="text-gray-700">
                AI-driven anomaly detection ensures accurate leak identification without expensive infrastructure changes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Scalable</h3>
              <p className="text-gray-700">
                Suitable for homes, farms, factories, and industrial plants—scales efficiently across sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Impact & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Water Conservation</h3>
              <p className="text-gray-700">
                Reduces water wastage by detecting and preventing leaks early.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Cost Savings</h3>
              <p className="text-gray-700">
                Saves on water bills by avoiding excessive and undetected usage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Property Protection</h3>
              <p className="text-gray-700">
                Prevents water damage in homes, factories, and farms.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Sustainability</h3>
              <p className="text-gray-700">
                Promotes responsible water usage and supports global conservation efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Save Water?</h2>
          <p className="text-xl mb-8">
            Join thousands of users who are already benefiting from our smart water leak detection system.
          </p>
          <button className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Test;
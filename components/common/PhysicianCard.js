import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PhysicianCard({ physician, userLocation, showDistance }) {
  const physicianName = `${physician.firstName} ${physician.lastName}`;
  const physicianNameWithDegree = `${physicianName} ${physician.degree || ''}`.trim();

  // Helper function to get primary location or first location
  const getPrimaryLocation = (physician) => {
    if (!physician.locations || physician.locations.length === 0) {
      return null;
    }
    return physician.locations.find(loc => loc.isPrimary) || physician.locations[0];
  };

  const primaryLocation = getPrimaryLocation(physician);

  // Calculate distance if both user location and physician location are available
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in miles
  };

  const distance = showDistance && userLocation && primaryLocation && primaryLocation.latitude && primaryLocation.longitude ? 
    (() => {
      const lat1 = userLocation.latitude;
      const lng1 = userLocation.longitude;
      const lat2 = parseFloat(primaryLocation.latitude);
      const lng2 = parseFloat(primaryLocation.longitude);
      
      // Validate all coordinates are numbers
      if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
        console.warn('Invalid coordinates for distance calculation:', {
          userLocation: { lat: lat1, lng: lng1 },
          physician: { lat: lat2, lng: lng2, name: `${physician.firstName} ${physician.lastName}` }
        });
        return null;
      }
      
      const dist = calculateDistance(lat1, lng1, lat2, lng2);
      console.log(`Distance calculated for ${physician.firstName} ${physician.lastName}:`, dist);
      return dist;
    })() : null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Physician Image */}
      <div className="relative h-48 bg-gray-100">
        {physician.profileImageUrl ? (
          <Image
            src={physician.profileImageUrl}
            alt={physicianName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              {physician.firstName?.[0]}{physician.lastName?.[0]}
            </div>
          </div>
        )}
      </div>

      {/* Physician Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">
          <Link 
            href={`/physicians/${physician.slug}/`}
            className="hover:text-secondary transition-colors duration-200"
          >
            {physicianNameWithDegree}
          </Link>
        </h3>

        {/* Specialties */}
        {physician.specialties && physician.specialties.length > 0 && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {physician.specialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {specialty}
                </span>
              ))}
              {physician.specialties.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{physician.specialties.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Practice */}
        {primaryLocation && primaryLocation.organization && (
          <p className="text-sm text-blue-600 font-medium mb-2">
            {primaryLocation.organization}
          </p>
        )}

        {/* Location */}
        {primaryLocation && (primaryLocation.locality || primaryLocation.administrativeArea) && (
          <p className="text-sm text-gray-600 mb-3">
            📍 {primaryLocation.locality}{primaryLocation.administrativeArea ? `, ${primaryLocation.administrativeArea}` : ''}
          </p>
        )}

        {/* Distance */}
        {distance !== null && (
          <p className="text-sm text-green-600 font-medium mb-3">
            🚗 {distance.toFixed(1)} miles away
          </p>
        )}

        {/* Phone */}
        {primaryLocation && primaryLocation.phoneNumber && (
          <p className="text-sm text-gray-600 mb-3">
            📞 <a 
              href={`tel:${primaryLocation.phoneNumber}`}
              className="hover:text-primary transition-colors duration-200"
            >
              {primaryLocation.phoneNumber}
            </a>
          </p>
        )}

        {/* Languages */}
        {physician.languages && physician.languages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Languages:</p>
            <p className="text-sm text-gray-600">
              {physician.languages.slice(0, 3).join(', ')}
              {physician.languages.length > 3 && ` +${physician.languages.length - 3} more`}
            </p>
          </div>
        )}

        {/* Primary Care Badge */}
        {physician.primaryCare && (
          <div className="inline-block">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Primary Care
            </span>
          </div>
        )}

        {/* View Profile Button */}
        <div className="mt-4">
          <Link 
            href={`/physicians/${physician.slug}/`}
            className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200 text-center block text-sm font-medium"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}